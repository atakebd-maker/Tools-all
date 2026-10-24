import React, { useId } from 'react';

interface AdBannerProps {
  adKey: string;
  width: number;
  height: number;
  label?: boolean;
  className?: string;
  wrapperClassName?: string;
}

export const AdBanner: React.FC<AdBannerProps> = ({
  adKey,
  width,
  height,
  label = true,
  className = '',
  wrapperClassName = ''
}) => {
  const uniqueId = useId();

  // Sandboxed iframe content with isolated script execution
  // This prevents collision between multiple ads overriding window.atOptions
  // and prevents document.write from clearing the React SPA DOM.
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
</body>
</html>`;

  return (
    <div className={`ad-container flex flex-col items-center justify-center my-3 select-none ${wrapperClassName}`}>
      {label && (
        <span className="text-[10px] tracking-wider text-slate-400 font-semibold uppercase mb-1">
          Advertisement
        </span>
      )}
      <div
        className={`relative flex items-center justify-center bg-slate-50/70 border border-slate-200/80 rounded-lg overflow-hidden transition-all duration-200 ${className}`}
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
  TOP_HEADER_BANNER: 'd4a0dd5823f5121e667cf9a7db60373c', // 468x60
  SIDE_SKYSCRAPER: 'b6516069053294f5e45552338ccc87b2',   // 160x600 (Desktop only, Left & Right)
  TOOL_TOP_LEADERBOARD: 'c5a47f434eaf064a55016f46337c9a59', // 728x90
  CONTENT_RECTANGLE: '1dcfc2496638e93a3483ea714433088f',   // 300x250
  SECONDARY_VERTICAL: 'a2a3eb7a2532179d99d419ed143743fa',  // 160x300
};
