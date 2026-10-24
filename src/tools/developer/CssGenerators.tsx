import React, { useState } from 'react';
import { Copy, Check, Palette, Sparkles } from 'lucide-react';
import { copyToClipboard } from '../../utils/formatting';

export const CssGenerators: React.FC = () => {
  const [tab, setTab] = useState<'shadow' | 'gradient' | 'radius'>('shadow');
  const [copied, setCopied] = useState<boolean>(false);

  // Box Shadow
  const [offsetX, setOffsetX] = useState<number>(0);
  const [offsetY, setOffsetY] = useState<number>(10);
  const [blurRadius, setBlurRadius] = useState<number>(25);
  const [spreadRadius, setSpreadRadius] = useState<number>(-5);
  const [shadowColor, setShadowColor] = useState<string>('#000000');
  const [shadowOpacity, setShadowOpacity] = useState<number>(15);
  const [inset, setInset] = useState<boolean>(false);

  // Gradient
  const [gradType, setGradType] = useState<'linear' | 'radial'>('linear');
  const [gradAngle, setGradAngle] = useState<number>(90);
  const [color1, setColor1] = useState<string>('#2563EB');
  const [color2, setColor2] = useState<string>('#9333EA');

  // Border Radius
  const [rTopLeft, setRTopLeft] = useState<number>(16);
  const [rTopRight, setRTopRight] = useState<number>(16);
  const [rBottomRight, setRBottomRight] = useState<number>(16);
  const [rBottomLeft, setRBottomLeft] = useState<number>(16);

  const getShadowCss = () => {
    const r = parseInt(shadowColor.slice(1, 3), 16) || 0;
    const g = parseInt(shadowColor.slice(3, 5), 16) || 0;
    const b = parseInt(shadowColor.slice(5, 7), 16) || 0;
    const alpha = (shadowOpacity / 100).toFixed(2);
    return `box-shadow: ${inset ? 'inset ' : ''}${offsetX}px ${offsetY}px ${blurRadius}px ${spreadRadius}px rgba(${r}, ${g}, ${b}, ${alpha});`;
  };

  const getGradientCss = () => {
    if (gradType === 'linear') {
      return `background: linear-gradient(${gradAngle}deg, ${color1}, ${color2});`;
    }
    return `background: radial-gradient(circle, ${color1}, ${color2});`;
  };

  const getRadiusCss = () => {
    return `border-radius: ${rTopLeft}px ${rTopRight}px ${rBottomRight}px ${rBottomLeft}px;`;
  };

  const currentCss = tab === 'shadow' ? getShadowCss() : tab === 'gradient' ? getGradientCss() : getRadiusCss();

  const handleCopy = async () => {
    await copyToClipboard(currentCss);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => setTab('shadow')}
          className={`px-4 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
            tab === 'shadow' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          Box Shadow Generator
        </button>
        <button
          onClick={() => setTab('gradient')}
          className={`px-4 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
            tab === 'gradient' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          Gradient Generator
        </button>
        <button
          onClick={() => setTab('radius')}
          className={`px-4 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
            tab === 'radius' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          Border Radius Generator
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sliders / Controls */}
        <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-4">
          {tab === 'shadow' && (
            <>
              <div>
                <div className="flex justify-between text-xs text-slate-600 mb-1">
                  <span>Horizontal Offset</span>
                  <span>{offsetX}px</span>
                </div>
                <input
                  type="range"
                  min="-50"
                  max="50"
                  value={offsetX}
                  onChange={(e) => setOffsetX(parseInt(e.target.value))}
                  className="w-full accent-blue-600"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-600 mb-1">
                  <span>Vertical Offset</span>
                  <span>{offsetY}px</span>
                </div>
                <input
                  type="range"
                  min="-50"
                  max="50"
                  value={offsetY}
                  onChange={(e) => setOffsetY(parseInt(e.target.value))}
                  className="w-full accent-blue-600"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-600 mb-1">
                  <span>Blur Radius</span>
                  <span>{blurRadius}px</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={blurRadius}
                  onChange={(e) => setBlurRadius(parseInt(e.target.value))}
                  className="w-full accent-blue-600"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-600 mb-1">
                  <span>Spread Radius</span>
                  <span>{spreadRadius}px</span>
                </div>
                <input
                  type="range"
                  min="-30"
                  max="50"
                  value={spreadRadius}
                  onChange={(e) => setSpreadRadius(parseInt(e.target.value))}
                  className="w-full accent-blue-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="text-xs text-slate-600 font-semibold block mb-1">Color</label>
                  <input
                    type="color"
                    value={shadowColor}
                    onChange={(e) => setShadowColor(e.target.value)}
                    className="w-full h-9 p-0.5 border border-slate-200 rounded cursor-pointer"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-600 font-semibold block mb-1">Opacity: {shadowOpacity}%</label>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={shadowOpacity}
                    onChange={(e) => setShadowOpacity(parseInt(e.target.value))}
                    className="w-full mt-2 accent-blue-600"
                  />
                </div>
              </div>
            </>
          )}

          {tab === 'gradient' && (
            <>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setGradType('linear')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                    gradType === 'linear' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  Linear
                </button>
                <button
                  onClick={() => setGradType('radial')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                    gradType === 'radial' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  Radial
                </button>
              </div>

              {gradType === 'linear' && (
                <div>
                  <div className="flex justify-between text-xs text-slate-600 mb-1">
                    <span>Angle</span>
                    <span>{gradAngle}°</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="360"
                    value={gradAngle}
                    onChange={(e) => setGradAngle(parseInt(e.target.value))}
                    className="w-full accent-blue-600"
                  />
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-600 font-semibold block mb-1">Color 1</label>
                  <input
                    type="color"
                    value={color1}
                    onChange={(e) => setColor1(e.target.value)}
                    className="w-full h-9 p-0.5 border border-slate-200 rounded cursor-pointer"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-600 font-semibold block mb-1">Color 2</label>
                  <input
                    type="color"
                    value={color2}
                    onChange={(e) => setColor2(e.target.value)}
                    className="w-full h-9 p-0.5 border border-slate-200 rounded cursor-pointer"
                  />
                </div>
              </div>
            </>
          )}

          {tab === 'radius' && (
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs text-slate-600 mb-1">
                  <span>Top Left</span>
                  <span>{rTopLeft}px</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={rTopLeft}
                  onChange={(e) => setRTopLeft(parseInt(e.target.value))}
                  className="w-full accent-blue-600"
                />
              </div>
              <div>
                <div className="flex justify-between text-xs text-slate-600 mb-1">
                  <span>Top Right</span>
                  <span>{rTopRight}px</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={rTopRight}
                  onChange={(e) => setRTopRight(parseInt(e.target.value))}
                  className="w-full accent-blue-600"
                />
              </div>
              <div>
                <div className="flex justify-between text-xs text-slate-600 mb-1">
                  <span>Bottom Right</span>
                  <span>{rBottomRight}px</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={rBottomRight}
                  onChange={(e) => setRBottomRight(parseInt(e.target.value))}
                  className="w-full accent-blue-600"
                />
              </div>
              <div>
                <div className="flex justify-between text-xs text-slate-600 mb-1">
                  <span>Bottom Left</span>
                  <span>{rBottomLeft}px</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={rBottomLeft}
                  onChange={(e) => setRBottomLeft(parseInt(e.target.value))}
                  className="w-full accent-blue-600"
                />
              </div>
            </div>
          )}
        </div>

        {/* Visual Preview Box */}
        <div className="space-y-4">
          <div className="h-64 bg-slate-100 rounded-2xl border border-slate-200 flex items-center justify-center p-8">
            <div
              style={{
                width: '180px',
                height: '180px',
                backgroundColor: tab === 'gradient' ? undefined : '#FFFFFF',
                ...(tab === 'shadow'
                  ? {
                      boxShadow: `${inset ? 'inset ' : ''}${offsetX}px ${offsetY}px ${blurRadius}px ${spreadRadius}px ${shadowColor}${Math.round(
                        (shadowOpacity / 100) * 255
                      )
                        .toString(16)
                        .padStart(2, '0')}`
                    }
                  : {}),
                ...(tab === 'gradient'
                  ? {
                      backgroundImage:
                        gradType === 'linear'
                          ? `linear-gradient(${gradAngle}deg, ${color1}, ${color2})`
                          : `radial-gradient(circle, ${color1}, ${color2})`
                    }
                  : {}),
                ...(tab === 'radius'
                  ? {
                      borderRadius: `${rTopLeft}px ${rTopRight}px ${rBottomRight}px ${rBottomLeft}px`,
                      backgroundColor: '#2563EB'
                    }
                  : { borderRadius: '16px' })
              }}
              className="flex items-center justify-center text-xs font-semibold text-slate-400 select-none"
            >
              Preview
            </div>
          </div>

          <div className="p-3 bg-slate-900 rounded-xl flex items-center justify-between gap-3 text-xs font-mono text-emerald-400">
            <span className="truncate">{currentCss}</span>
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-sans font-semibold shrink-0 flex items-center gap-1 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied' : 'Copy CSS'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
