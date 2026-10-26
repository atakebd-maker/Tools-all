import React, { useId, useState, useEffect } from 'react';
import { AD_FILTER_CONFIG } from '../config/adFilterConfig';

export type AdSlotType =
  | 'websiteTop'
  | 'toolTop'
  | 'toolMiddle'
  | 'multiPlacement';

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
  label = false,
  className = '',
  wrapperClassName = ''
}) => {
  const uniqueId = useId();
  const [isRevealed, setIsRevealed] = useState<boolean>(false);
  const [isFiltered, setIsFiltered] = useState<boolean>(() => {
    if (!AD_FILTER_CONFIG.filteringEnabled) return false;
    if (AD_FILTER_CONFIG.masterWhiteout) return true;
    try {
      if (localStorage.getItem('zynovexa_master_whiteout') === 'true') {
        return true;
      }
      const stored = localStorage.getItem('zynovexa_flagged_ads');
      if (stored) {
        const flaggedList = JSON.parse(stored);
        if (Array.isArray(flaggedList) && flaggedList.includes(adKey)) {
          return true;
        }
      }
    } catch (e) {}
    return false;
  });

  // Zero-flash pre-inspection buffer: hold white until scanner inspects content
  useEffect(() => {
    if (isFiltered) return;
    const timer = setTimeout(() => {
      setIsRevealed(true);
    }, 1100);
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
        } catch (e) {}
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [adKey]);

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
    (function() {
      try {
        var inspectedUrls = new Set();
        var forbiddenKeywords = [
          'girl', 'woman', 'female', 'dating', 'bride', 'model', 'lady', 'single', 'romance',
          'beauty', 'asian', 'russian', 'bikini', 'underwear', 'hot', 'sexy', 'cleavage',
          '1win', 'melbet', '1xbet', 'casino', 'betting', 'poker', 'roulette', 'jackpot',
          'parimatch', 'mostbet', 'pin-up', 'gambl', 'super bonus', 'odds', 'payout',
          'bonus', 'deposit', 'sportsbook', 'free spin', 'slot'
        ];

        function flagAd() {
          window.parent.postMessage({ type: 'AD_FILTER_FEMALE_DETECTED', key: '${adKey}' }, '*');
        }

        function checkText(text) {
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
            var all = (node.innerText || '') + ' ' + (node.src || '') + ' ' + (node.href || '') + ' ' + (node.alt || '') + ' ' + (node.title || '');
            if (checkText(all)) return;

            if (node.tagName === 'IMG' && node.src && node.src.indexOf('http') === 0 && !inspectedUrls.has(node.src)) {
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
          } catch(e) {}
        }

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

        setInterval(function() {
          try {
            checkText(document.body.innerHTML || '');
          } catch(e) {}
        }, 600);
      } catch(err) {}
    })();
  </script>
</body>
</html>`;

  // If filtered by AI or user tap, replace with pure white #FFFFFF with NO text/icon/placeholder
  if (isFiltered) {
    return (
      <div
        className={`ad-container flex flex-col items-center justify-center my-2 select-none ${wrapperClassName}`}
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

  const handleDiscreetWhiteout = () => {
    setIsFiltered(true);
    setIsRevealed(false);
    try {
      const stored = localStorage.getItem('zynovexa_flagged_ads');
      const list = stored ? JSON.parse(stored) : [];
      if (!list.includes(adKey)) {
        list.push(adKey);
        localStorage.setItem('zynovexa_flagged_ads', JSON.stringify(list));
      }
    } catch (e) {}
  };

  return (
    <div
      className={`ad-container flex flex-col items-center justify-center my-2 select-none ${wrapperClassName}`}
      onDoubleClick={handleDiscreetWhiteout}
    >
      {label && (
        <div
          className="flex items-center justify-between px-1 mb-1"
          style={{ width: `${Math.min(width, 728)}px`, maxWidth: '100%' }}
        >
          <span
            onClick={handleDiscreetWhiteout}
            className="text-[9px] tracking-wider text-slate-400 font-semibold uppercase cursor-pointer select-none"
            title="Tap to whiteout"
          >
            Advertisement
          </span>
          <button
            type="button"
            onClick={handleDiscreetWhiteout}
            className="text-[10px] text-slate-400 hover:text-slate-600 active:text-red-600 px-1 py-0.5 rounded cursor-pointer"
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
  // 728x90 - At the very top of the website
  WEBSITE_TOP_LEADERBOARD: 'c5a47f434eaf064a55016f46337c9a59',

  // 468x60 - Top of tools and inside tools
  TOOL_HEADER_AND_MID: 'd4a0dd5823f5121e667cf9a7db60373c',

  // 320x50 - Placed in various places across the website
  MULTI_PLACEMENT_BANNER: '44887e01e1d95e8418f17cdcc5bf61aa',
};
