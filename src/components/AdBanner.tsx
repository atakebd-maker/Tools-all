import React, { useId } from 'react';

export type AdSlotType =
  | 'websiteTop'
  | 'toolTop'
  | 'toolMiddle'
  | 'multiPlacement';

interface AdBannerProps {
  adKey?: string;
  width?: number;
  height?: number;
  slotType?: AdSlotType;
  label?: boolean;
  className?: string;
  wrapperClassName?: string;
}

export const TARGET_AD_KEY = '44887e01e1d95e8418f17cdcc5bf61aa';

export const AdBanner: React.FC<AdBannerProps> = ({
  adKey = TARGET_AD_KEY,
  width = 320,
  height = 50,
  label = false,
  className = '',
  wrapperClassName = ''
}) => {
  const uniqueId = useId();
  // Strictly enforce user-specified ad key and 320x50 dimensions across all placements
  const activeKey = TARGET_AD_KEY;
  const activeWidth = width || 320;
  const activeHeight = height || 50;

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
  <script type="text/javascript">
    // Anti-Popunder Shield: Completely block any popunders or popup windows
    window.open = function() { return null; };
    window.focus = function() { return null; };
    window.blur = function() { return null; };
  </script>
</head>
<body>
  <div id="ad-wrapper">
    <script type="text/javascript">
      atOptions = {
        'key' : '${activeKey}',
        'format' : 'iframe',
        'height' : ${activeHeight},
        'width' : ${activeWidth},
        'params' : {}
      };
    </script>
    <script type="text/javascript" src="https://bauval.org/22/${activeKey}"></script>
  </div>
</body>
</html>`;

  return (
    <div
      className={`ad-container flex flex-col items-center justify-center my-2 select-none ${wrapperClassName}`}
    >
      {label && (
        <span className="text-[9px] tracking-wider text-slate-400 font-semibold uppercase mb-1">
          Advertisement
        </span>
      )}
      <div
        className={`relative flex items-center justify-center bg-transparent border-0 overflow-hidden ${className}`}
        style={{
          width: `${activeWidth}px`,
          maxWidth: '100%',
          minHeight: `${activeHeight}px`
        }}
      >
        <iframe
          key={`${activeKey}-${uniqueId}`}
          title={`Ad ${activeKey}`}
          srcDoc={adHtml}
          width={activeWidth}
          height={activeHeight}
          sandbox="allow-scripts allow-same-origin"
          style={{
            border: 0,
            overflow: 'hidden',
            width: `${activeWidth}px`,
            height: `${activeHeight}px`
          }}
          scrolling="no"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export const AD_KEYS = {
  // All placement slots point strictly to the user-specified 320x50 ad unit
  WEBSITE_TOP_LEADERBOARD: TARGET_AD_KEY,
  TOOL_HEADER_AND_MID: TARGET_AD_KEY,
  MULTI_PLACEMENT_BANNER: TARGET_AD_KEY,
};

