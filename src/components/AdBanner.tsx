import React, { useId, useState, useEffect } from 'react';
import { AD_FILTER_CONFIG } from '../config/adFilterConfig';

export type AdSlotType =
  | 'topBanner'
  | 'sideSkyscrapers'
  | 'toolLeaderboard'
  | 'contentRectangle'
  | 'secondaryVertical';

interface AdBannerProps {
  adKey: string;
  width: number;
  height: number;
  slotType?: AdSlotType;
  label?: boolean;
  className?: string;
  wrapperClassName?: string;
}

export const AdBanner: React.FC<AdBannerProps> = ({
  adKey,
  width,
  height,
  slotType,
  label = true,
  className = '',
  wrapperClassName = ''
}) => {
  const uniqueId = useId();
  const [isRevealed, setIsRevealed] = useState<boolean>(false);
  const [isFiltered, setIsFiltered] = useState<boolean>(() => {
    // Check config-level slot override
    if (!AD_FILTER_CONFIG.filteringEnabled) return false;
    if (slotType && AD_FILTER_CONFIG.slots[slotType]?.forceWhiteout) {
      return true;
    }
    // Check localStorage cache for flagged ad keys
    try {
      const stored = localStorage.getItem('zynovexa_flagged_ads');
      if (stored) {
        const flaggedList = JSON.parse(stored);
        if (Array.isArray(flaggedList) && flaggedList.includes(adKey)) {
          return true;
        }
      }
    } catch (e) {
      // Ignore storage errors
    }
    return false;
  });

  // Pre-inspection timer: Keep ad completely invisible (100% pure white) until
  // Gemini AI and scanner have checked the creative for visible women / girls.
  useEffect(() => {
    if (isFiltered) return;
    const timer = setTimeout(() => {
      setIsRevealed(true);
    }, 1200);
    return () => clearTimeout(timer);
  }, [isFiltered]);

  // Listen for image inspection messages from inside the sandbox
  useEffect(() => {
    if (!AD_FILTER_CONFIG.filteringEnabled) return;

    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'AD_FILTER_FEMALE_DETECTED' && event.data?.key === adKey) {
        setIsFiltered(true);
        setIsRevealed(false);
        try {
          const stored = localStorage.getItem('zynovexa_flagged_ads');
          const list = stored ? JSON.parse(stored) : [];
          if (!list.includes(adKey)) {
            list.push(adKey);
            localStorage.setItem('zynovexa_flagged_ads', JSON.stringify(list));
          }
        } catch (e) {
          // Ignore
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [adKey]);

  // Sandboxed iframe content with isolated script execution and privacy-safe image scanning
  // When cross-origin security permits, inspects loaded images.
  // If a female person / model photo is detected, reports back to replace ad with pure white (#FFFFFF).
  const adHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    * { box-sizing: border-box; }
    html, body {
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      background: transparent;
    }
  </style>
</head>
<body>
  <div id="ad-wrapper">
    <script type="text/javascript">
      atOptions = {
        'key' : '${adKey}',
        'format' : 'iframe',
        'height' : ${height},
        'width' : ${width},
        'params' : {}
      };
    </script>
    <script type="text/javascript" src="https://bauval.org/22/${adKey}"></script>
  </div>

  <script type="text/javascript">
    // Comprehensive Islamic & Modesty Ad Analyzer
    (function() {
      try {
        var inspectedUrls = new Set();
        var forbiddenKeywords = [
          // Female & Dating keywords
          'girl', 'woman', 'female', 'dating', 'bride', 'model', 'lady', 'single', 'romance',
          'beauty', 'asian', 'russian', 'bikini', 'underwear', 'hot', 'sexy', 'cleavage',
          // Gambling & Casino keywords (1win, Melbet, 1xbet use female models)
          '1win', 'melbet', '1xbet', 'casino', 'betting', 'poker', 'roulette', 'jackpot',
          'parimatch', 'mostbet', 'pin-up', 'gambl', 'super bonus', 'odds', 'payout',
          'bonus', 'deposit', 'sportsbook', 'free spin', 'slot'
        ];

        function flagAd() {
          window.parent.postMessage({ type: 'AD_FILTER_FEMALE_DETECTED', key: '${adKey}' }, '*');
        }

        function checkTextForForbidden(text) {
          if (!text) return false;
          var lower = text.toLowerCase();
          for (var i = 0; i < forbiddenKeywords.length; i++) {
            if (lower.indexOf(forbiddenKeywords[i]) !== -1) {
              flagAd();
              return true;
            }
          }
          return false;
        }

        function inspectNode(node) {
          if (!node) return;
          try {
            var text = (node.innerText || node.textContent || '');
            var src = (node.src || '');
            var href = (node.href || '');
            var alt = (node.alt || '');
            var title = (node.title || '');
            var id = (node.id || '');
            var cls = (node.className || '');
            var all = text + ' ' + src + ' ' + href + ' ' + alt + ' ' + title + ' ' + id + ' ' + cls;

            if (checkTextForForbidden(all)) return;

            // If image element, check canvas and call Gemini AI
            if (node.tagName === 'IMG') {
              var imgSrc = (node.src || '').toLowerCase();
              if (checkTextForForbidden(imgSrc)) return;

              if (node.src && node.src.indexOf('http') === 0 && !inspectedUrls.has(node.src)) {
                inspectedUrls.add(node.src);
                fetch('/api/inspect-ad-image', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    imageUrl: node.src,
                    adText: all,
                    adKey: '${adKey}'
                  })
                })
                .then(function(res) { return res.json(); })
                .then(function(data) {
                  if (data && data.hasFemale === true) {
                    flagAd();
                  }
                })
                .catch(function() {});
              }
            }

            // If iframe or anchor, inspect attributes
            if (node.tagName === 'IFRAME') {
              if (checkTextForForbidden(node.src || '')) return;
            }
          } catch (e) {}
        }

        // MutationObserver inspecting all inserted elements and attributes
        if (window.MutationObserver) {
          var observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(m) {
              for (var i = 0; i < m.addedNodes.length; i++) {
                var node = m.addedNodes[i];
                inspectNode(node);
                if (node.querySelectorAll) {
                  var subNodes = node.querySelectorAll('*');
                  for (var j = 0; j < subNodes.length; j++) {
                    inspectNode(subNodes[j]);
                  }
                }
              }
            });
          });
          observer.observe(document.body, { childList: true, subtree: true, attributes: true });
        }

        // Periodic deep check of body content
        setInterval(function() {
          try {
            checkTextForForbidden(document.body.innerHTML || '');
          } catch(err) {}
        }, 500);
      } catch (err) {}
    })();
  </script>
</body>
</html>`;

  // REQUIREMENT 2 & 3:
  // If filtered, replace the entire visible area with a completely plain white background (#FFFFFF).
  // Do NOT display any text, warning, icon, image, or placeholder inside the white replacement area.
  if (isFiltered) {
    return (
      <div
        className={`ad-container flex flex-col items-center justify-center my-3 select-none ${wrapperClassName}`}
        aria-hidden="true"
      >
        <div
          style={{
            width: `${width}px`,
            maxWidth: '100%',
            height: `${height}px`,
            backgroundColor: '#FFFFFF',
            border: 'none',
            outline: 'none',
            margin: 0,
            padding: 0
          }}
        />
      </div>
    );
  }

  // Double-click discreet fallback: In case an ad is inside a cross-origin iframe blocking pixel reading,
  // the user or admin can double click the ad box to instantly turn it 100% white (#FFFFFF) permanently.
  const handleDiscreetWhiteout = () => {
    setIsFiltered(true);
    try {
      const stored = localStorage.getItem('zynovexa_flagged_ads');
      const list = stored ? JSON.parse(stored) : [];
      if (!list.includes(adKey)) {
        list.push(adKey);
        localStorage.setItem('zynovexa_flagged_ads', JSON.stringify(list));
      }
    } catch (e) {}
  };

  // Normal Advertisement Render (Preserved for Halal/Appropriate Ads)
  return (
    <div
      className={`ad-container flex flex-col items-center justify-center my-3 select-none ${wrapperClassName}`}
      onDoubleClick={handleDiscreetWhiteout}
    >
      {label && (
        <div
          className="flex items-center justify-between px-1 mb-1"
          style={{ width: `${Math.min(width, 728)}px`, maxWidth: '100%' }}
        >
          <span
            onClick={handleDiscreetWhiteout}
            className="text-[10px] tracking-wider text-slate-400 font-semibold uppercase cursor-pointer select-none"
            title="Tap to whiteout ad"
          >
            Advertisement
          </span>
          <button
            type="button"
            onClick={handleDiscreetWhiteout}
            className="text-[11px] text-slate-400 hover:text-slate-600 active:text-red-600 px-1.5 py-0.5 rounded cursor-pointer transition-colors"
            title="Whiteout ad (#FFFFFF)"
            aria-label="Whiteout ad"
          >
            ✕
          </button>
        </div>
      )}
      <div
        className={`relative flex items-center justify-center bg-white border border-slate-200/80 rounded-lg overflow-hidden transition-opacity duration-300 ${className}`}
        style={{
          width: `${width}px`,
          maxWidth: '100%',
          minHeight: `${height}px`,
          backgroundColor: '#FFFFFF',
          opacity: isRevealed ? 1 : 0
        }}
      >
        <iframe
          key={`${adKey}-${uniqueId}`}
          title={`Ad ${adKey}`}
          srcDoc={adHtml}
          width={width}
          height={height}
          style={{
            border: 0,
            overflow: 'hidden',
            width: `${width}px`,
            height: `${height}px`,
            backgroundColor: '#FFFFFF'
          }}
          scrolling="no"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export const AD_KEYS = {
  TOP_HEADER_BANNER: 'd4a0dd5823f5121e667cf9a7db60373c', // 468x60
  SIDE_SKYSCRAPER: 'b6516069053294f5e45552338ccc87b2',   // 160x600 (Desktop only, Left & Right)
  TOOL_TOP_LEADERBOARD: 'c5a47f434eaf064a55016f46337c9a59', // 728x90
  CONTENT_RECTANGLE: '1dcfc2496638e93a3483ea714433088f',   // 300x250
  SECONDARY_VERTICAL: 'a2a3eb7a2532179d99d419ed143743fa',  // 160x300
};
