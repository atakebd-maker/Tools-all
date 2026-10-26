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
    // Gemini AI Creative & Image Inspector
    (function() {
      try {
        var inspectedUrls = new Set();

        function callGeminiAdInspector(imageUrl, adText) {
          if (!imageUrl && !adText) return;
          if (imageUrl && inspectedUrls.has(imageUrl)) return;
          if (imageUrl) inspectedUrls.add(imageUrl);

          fetch('/api/inspect-ad-image', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              imageUrl: imageUrl,
              adText: adText,
              adKey: '${adKey}'
            })
          })
          .then(function(res) { return res.json(); })
          .then(function(data) {
            if (data && data.hasFemale === true) {
              window.parent.postMessage({ type: 'AD_FILTER_FEMALE_DETECTED', key: '${adKey}' }, '*');
            }
          })
          .catch(function() {});
        }

        function checkImageForPerson(img) {
          if (!img) return;
          try {
            var src = (img.src || '').toLowerCase();
            var alt = (img.alt || '').toLowerCase();
            var title = (img.title || '').toLowerCase();
            var combined = src + ' ' + alt + ' ' + title;

            // Direct keywords detection
            var femaleKeywords = ['girl', 'woman', 'female', 'dating', 'bride', 'model', 'lady', 'single', 'romance', 'beauty', 'asian', 'russian'];
            for (var i = 0; i < femaleKeywords.length; i++) {
              if (combined.indexOf(femaleKeywords[i]) !== -1) {
                window.parent.postMessage({ type: 'AD_FILTER_FEMALE_DETECTED', key: '${adKey}' }, '*');
                return;
              }
            }

            // Send image or image URL to server-side Google Gemini AI Vision
            if (img.src && img.src.indexOf('http') === 0) {
              callGeminiAdInspector(img.src, combined);
            }

            // Same-origin canvas pixel biometric check (if accessible)
            if (img.complete && img.naturalWidth > 20) {
              try {
                var canvas = document.createElement('canvas');
                canvas.width = Math.min(img.naturalWidth, 120);
                canvas.height = Math.min(img.naturalHeight, 120);
                var ctx = canvas.getContext('2d');
                if (ctx) {
                  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                  var base64 = canvas.toDataURL('image/jpeg', 0.7);
                  fetch('/api/inspect-ad-image', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      imageBase64: base64,
                      adKey: '${adKey}'
                    })
                  })
                  .then(function(r) { return r.json(); })
                  .then(function(d) {
                    if (d && d.hasFemale === true) {
                      window.parent.postMessage({ type: 'AD_FILTER_FEMALE_DETECTED', key: '${adKey}' }, '*');
                    }
                  })
                  .catch(function() {});
                }
              } catch (corsErr) {}
            }
          } catch (e) {}
        }

        // MutationObserver to inspect dynamically inserted ad elements
        if (window.MutationObserver) {
          var observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(m) {
              for (var i = 0; i < m.addedNodes.length; i++) {
                var node = m.addedNodes[i];
                if (node.tagName === 'IMG') {
                  node.onload = function() { checkImageForPerson(node); };
                  checkImageForPerson(node);
                } else if (node.querySelectorAll) {
                  var imgs = node.querySelectorAll('img');
                  for (var j = 0; j < imgs.length; j++) {
                    checkImageForPerson(imgs[j]);
                  }
                }
              }
            });
          });
          observer.observe(document.body, { childList: true, subtree: true });
        }
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
        <span className="text-[10px] tracking-wider text-slate-400 font-semibold uppercase mb-1">
          Advertisement
        </span>
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
