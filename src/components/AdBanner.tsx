import React, { useId } from 'react';

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
  label = false,
  className = '',
  wrapperClassName = ''
}) => {
  const uniqueId = useId();

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
          width: `${width}px`,
          maxWidth: '100%',
          minHeight: `${height}px`
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
            height: `${height}px`
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
