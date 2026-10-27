import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import {
  QrCode,
  Download,
  Copy,
  Check,
  RefreshCw,
  Trash2,
  Wifi,
  Globe,
  FileText,
  Mail,
  Phone,
  MessageSquare,
  User,
  MapPin,
  Calendar,
  CreditCard,
  Share2,
  AlertCircle
} from 'lucide-react';

// ==========================================
// Base QR Studio Core Component
// ==========================================
interface QrStudioProps {
  value: string;
  title?: string;
  note?: string;
  children?: React.ReactNode;
}

export const QrStudio: React.FC<QrStudioProps> = ({ value, title, note, children }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [fgColor, setFgColor] = useState<string>('#0f172a');
  const [bgColor, setBgColor] = useState<string>('#ffffff');
  const [size, setSize] = useState<number>(280);
  const [errorCorrectionLevel, setErrorCorrectionLevel] = useState<'L' | 'M' | 'Q' | 'H'>('M');
  const [margin, setMargin] = useState<number>(2);
  const [copied, setCopied] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (!canvasRef.current) return;
    if (!value || value.trim() === '') {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, size, size);
      }
      return;
    }

    setError('');
    QRCode.toCanvas(
      canvasRef.current,
      value,
      {
        width: size,
        margin,
        color: {
          dark: fgColor,
          light: bgColor
        },
        errorCorrectionLevel
      },
      (err) => {
        if (err) {
          setError(err.message || 'Failed to render QR Code. Input may be too large.');
        }
      }
    );
  }, [value, fgColor, bgColor, size, errorCorrectionLevel, margin]);

  const handleDownloadPng = () => {
    if (!canvasRef.current || !value.trim()) return;
    const url = canvasRef.current.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = `zynovexa-qrcode-${Date.now()}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleDownloadSvg = async () => {
    if (!value.trim()) return;
    try {
      const svgString = await QRCode.toString(value, {
        type: 'svg',
        margin,
        color: { dark: fgColor, light: bgColor },
        errorCorrectionLevel
      });
      const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `zynovexa-qrcode-${Date.now()}.svg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (e: any) {
      setError(e.message || 'Could not export SVG.');
    }
  };

  const handleCopyImage = async () => {
    if (!canvasRef.current || !value.trim()) return;
    try {
      canvasRef.current.toBlob(async (blob) => {
        if (!blob) return;
        if (navigator.clipboard && window.ClipboardItem) {
          await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } else {
          await navigator.clipboard.writeText(value);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }
      });
    } catch {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Input & Configuration Column */}
      <div className="lg:col-span-7 space-y-6">
        {children}

        {/* QR Customization Controls */}
        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 space-y-4">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
            QR Style & Output Options
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div>
              <label className="block font-medium text-slate-700 mb-1">Foreground</label>
              <div className="flex items-center gap-2 bg-white border border-slate-300 rounded-lg p-1.5">
                <input
                  type="color"
                  value={fgColor}
                  onChange={(e) => setFgColor(e.target.value)}
                  className="w-6 h-6 rounded cursor-pointer border-0 p-0"
                />
                <span className="font-mono text-slate-600 text-[11px]">{fgColor}</span>
              </div>
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">Background</label>
              <div className="flex items-center gap-2 bg-white border border-slate-300 rounded-lg p-1.5">
                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="w-6 h-6 rounded cursor-pointer border-0 p-0"
                />
                <span className="font-mono text-slate-600 text-[11px]">{bgColor}</span>
              </div>
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">Resolution</label>
              <select
                value={size}
                onChange={(e) => setSize(Number(e.target.value))}
                className="w-full bg-white border border-slate-300 rounded-lg p-2 font-medium text-slate-800"
              >
                <option value={200}>200 x 200 px</option>
                <option value={280}>280 x 280 px</option>
                <option value={400}>400 x 400 px</option>
                <option value={600}>600 x 600 px</option>
                <option value={1000}>1000 x 1000 px</option>
              </select>
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">Error Correction</label>
              <select
                value={errorCorrectionLevel}
                onChange={(e) => setErrorCorrectionLevel(e.target.value as any)}
                className="w-full bg-white border border-slate-300 rounded-lg p-2 font-medium text-slate-800"
              >
                <option value="L">Low (~7%)</option>
                <option value="M">Medium (~15%)</option>
                <option value="Q">Quartile (~25%)</option>
                <option value="H">High (~30%)</option>
              </select>
            </div>
          </div>
        </div>

        {note && (
          <div className="flex items-start gap-2.5 p-3.5 bg-blue-50 border border-blue-200 rounded-xl text-blue-900 text-xs">
            <AlertCircle className="w-4 h-4 shrink-0 text-blue-600 mt-0.5" />
            <span className="leading-relaxed">{note}</span>
          </div>
        )}
      </div>

      {/* QR Code Preview Column */}
      <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col items-center text-center space-y-4">
        <div className="flex items-center justify-between w-full border-b border-slate-100 pb-3">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <QrCode className="w-4 h-4 text-blue-600" />
            Live Scannable QR
          </span>
          <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            Real-Time
          </span>
        </div>

        {/* Canvas Render Area */}
        <div className="p-4 bg-slate-50/70 border border-slate-200 rounded-2xl flex items-center justify-center max-w-full overflow-hidden min-h-[280px]">
          {error ? (
            <div className="p-4 text-red-600 text-xs font-medium max-w-xs">{error}</div>
          ) : (
            <canvas
              ref={canvasRef}
              width={size}
              height={size}
              className="max-w-full h-auto rounded-lg shadow-2xs border border-slate-200/50"
            />
          )}
        </div>

        <p className="text-xs text-slate-500">
          Scan this preview directly using any smartphone camera or QR reader.
        </p>

        {/* Action Buttons */}
        <div className="w-full grid grid-cols-2 gap-2 pt-2">
          <button
            type="button"
            onClick={handleDownloadPng}
            disabled={!value.trim()}
            className="flex items-center justify-center gap-1.5 px-3 py-2.5 bg-blue-600 hover:bg-blue-700 active:scale-98 text-white rounded-xl font-semibold text-xs transition-all shadow-xs disabled:opacity-50 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            Download PNG
          </button>

          <button
            type="button"
            onClick={handleDownloadSvg}
            disabled={!value.trim()}
            className="flex items-center justify-center gap-1.5 px-3 py-2.5 bg-slate-800 hover:bg-slate-900 active:scale-98 text-white rounded-xl font-semibold text-xs transition-all shadow-xs disabled:opacity-50 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            Download SVG
          </button>

          <button
            type="button"
            onClick={handleCopyImage}
            disabled={!value.trim()}
            className="col-span-2 flex items-center justify-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-medium text-xs transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                Copied to Clipboard!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copy to Clipboard
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 1. Universal QR Code Generator
// ==========================================
export const UniversalQrGenerator: React.FC = () => {
  const [content, setContent] = useState<string>('https://zynovexa.com');

  return (
    <QrStudio value={content} note="Encodes any web address, raw message, phone number, or text payload.">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-bold text-slate-900">QR Code Content / Text / URL</label>
          <button
            type="button"
            onClick={() => setContent('')}
            className="text-xs text-slate-400 hover:text-red-600 flex items-center gap-1 cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" /> Clear
          </button>
        </div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
          placeholder="Enter any text, website URL, contact details, or data..."
          className="w-full p-3.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:outline-none text-slate-900 text-sm font-mono leading-relaxed"
        />
        <div className="flex flex-wrap gap-2 text-xs">
          <button
            type="button"
            onClick={() => setContent('https://zynovexa.com')}
            className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 cursor-pointer"
          >
            Example URL
          </button>
          <button
            type="button"
            onClick={() => setContent('Hello! Thank you for scanning this QR code.')}
            className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 cursor-pointer"
          >
            Example Note
          </button>
        </div>
      </div>
    </QrStudio>
  );
};

// ==========================================
// 2. Wi-Fi QR Code Generator
// ==========================================
export const WifiQrGenerator: React.FC = () => {
  const [ssid, setSsid] = useState<string>('Home-Office-5G');
  const [password, setPassword] = useState<string>('SecretPassword123');
  const [encryption, setEncryption] = useState<'WPA' | 'WEP' | 'nopass'>('WPA');
  const [hidden, setHidden] = useState<boolean>(false);

  // WIFI:S:SSID;T:WPA;P:password;H:false;;
  const escapeWifi = (str: string) => str.replace(/([\\;,:"])/g, '\\$1');
  const wifiString = `WIFI:S:${escapeWifi(ssid)};T:${encryption};P:${escapeWifi(password)};H:${hidden};;`;

  return (
    <QrStudio
      value={wifiString}
      note="Guests can scan this QR code with their phone's camera to connect directly to your Wi-Fi without manually typing the password."
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-bold text-slate-900 mb-1">Network Name (SSID)</label>
          <input
            type="text"
            value={ssid}
            onChange={(e) => setSsid(e.target.value)}
            placeholder="e.g. MyHomeNetwork"
            className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 text-slate-900 text-sm"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-slate-900 mb-1">Security / Encryption</label>
            <select
              value={encryption}
              onChange={(e) => setEncryption(e.target.value as any)}
              className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 text-slate-900 text-sm bg-white"
            >
              <option value="WPA">WPA / WPA2 / WPA3 (Standard)</option>
              <option value="WEP">WEP (Legacy)</option>
              <option value="nopass">None (Open Network)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-900 mb-1">Network Password</label>
            <input
              type="text"
              value={password}
              disabled={encryption === 'nopass'}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Wi-Fi Password"
              className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 text-slate-900 text-sm disabled:bg-slate-100"
            />
          </div>
        </div>

        <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer pt-1">
          <input
            type="checkbox"
            checked={hidden}
            onChange={(e) => setHidden(e.target.checked)}
            className="w-4 h-4 text-blue-600 rounded"
          />
          <span>Hidden Network (SSID broadcast is turned off)</span>
        </label>
      </div>
    </QrStudio>
  );
};

// ==========================================
// 3. Website URL QR Code Generator
// ==========================================
export const UrlQrGenerator: React.FC = () => {
  const [url, setUrl] = useState<string>('https://zynovexa.com');

  const formattedUrl = url.trim().match(/^https?:\/\//i) ? url.trim() : `https://${url.trim()}`;

  return (
    <QrStudio value={formattedUrl} note="Encodes a clickable website URL that opens directly in mobile web browsers.">
      <div className="space-y-3">
        <label className="block text-sm font-bold text-slate-900">Website URL</label>
        <div className="relative">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            className="w-full p-3 pl-10 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 text-slate-900 text-sm"
          />
          <Globe className="w-5 h-5 text-slate-400 absolute left-3 top-3.5" />
        </div>
        <p className="text-xs text-slate-500">
          Tip: Always include <code className="text-blue-600 font-mono">https://</code> so devices open the site automatically.
        </p>
      </div>
    </QrStudio>
  );
};

// ==========================================
// 4. Plain Text QR Code Generator
// ==========================================
export const PlainTextQrGenerator: React.FC = () => {
  const [text, setText] = useState<string>('Zynovexa: All-in-one free browser utilities.');

  return (
    <QrStudio value={text} note="Encodes raw text notes, instructions, quotes, or Unicode Bengali sentences.">
      <div className="space-y-3">
        <label className="block text-sm font-bold text-slate-900">Plain Text Message</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={5}
          placeholder="Type any message, note, address, or Bengali text..."
          className="w-full p-3.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 text-slate-900 text-sm"
        />
        <div className="text-right text-xs text-slate-400">
          {text.length} characters • {new Blob([text]).size} bytes
        </div>
      </div>
    </QrStudio>
  );
};

// ==========================================
// 5. Email QR Code Generator
// ==========================================
export const EmailQrGenerator: React.FC = () => {
  const [email, setEmail] = useState<string>('contact@example.com');
  const [subject, setSubject] = useState<string>('Inquiry from Zynovexa');
  const [body, setBody] = useState<string>('Hello,\n\nI scanned your QR code and would like more information.');

  const mailto = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  return (
    <QrStudio value={mailto} note="Scanning this opens the user's default email app with recipient, subject, and body pre-filled.">
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-bold text-slate-900 mb-1">Recipient Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="recipient@domain.com"
            className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 text-slate-900 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-900 mb-1">Email Subject Line</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Subject..."
            className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 text-slate-900 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-900 mb-1">Pre-filled Message Body</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={3}
            placeholder="Optional default email body..."
            className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 text-slate-900 text-sm"
          />
        </div>
      </div>
    </QrStudio>
  );
};

// ==========================================
// 6. Phone Number QR Code Generator
// ==========================================
export const PhoneQrGenerator: React.FC = () => {
  const [phone, setPhone] = useState<string>('+1 (555) 234-5678');

  const cleanPhone = phone.replace(/[^\d+]/g, '');
  const telString = `tel:${cleanPhone}`;

  return (
    <QrStudio value={telString} note="When scanned on mobile phones, prompts the user to dial this telephone number directly.">
      <div className="space-y-3">
        <label className="block text-sm font-bold text-slate-900">Phone Number (with Country Code)</label>
        <div className="relative">
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+1 555 123 4567"
            className="w-full p-3 pl-10 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 text-slate-900 text-sm font-mono"
          />
          <Phone className="w-5 h-5 text-slate-400 absolute left-3 top-3.5" />
        </div>
        <p className="text-xs text-slate-500">
          Cleaned dialing string: <span className="font-mono text-blue-600">{telString}</span>
        </p>
      </div>
    </QrStudio>
  );
};

// ==========================================
// 7. SMS QR Code Generator
// ==========================================
export const SmsQrGenerator: React.FC = () => {
  const [phone, setPhone] = useState<string>('+15551234567');
  const [message, setMessage] = useState<string>('Hello! Please reserve my appointment.');

  const cleanPhone = phone.replace(/[^\d+]/g, '');
  const smsString = `sms:${cleanPhone}?body=${encodeURIComponent(message)}`;

  return (
    <QrStudio value={smsString} note="Opens the mobile Messages/SMS app with your number and pre-written message.">
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-bold text-slate-900 mb-1">Recipient Mobile Number</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+15551234567"
            className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 text-slate-900 text-sm font-mono"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-900 mb-1">Pre-filled SMS Text</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
            placeholder="Message text..."
            className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 text-slate-900 text-sm"
          />
        </div>
      </div>
    </QrStudio>
  );
};

// ==========================================
// 8. Contact Card (vCard) QR Code Generator
// ==========================================
export const ContactCardQrGenerator: React.FC = () => {
  const [firstName, setFirstName] = useState<string>('John');
  const [lastName, setLastName] = useState<string>('Doe');
  const [phone, setPhone] = useState<string>('+15551234567');
  const [email, setEmail] = useState<string>('john.doe@company.com');
  const [org, setOrg] = useState<string>('Tech Solutions Inc.');
  const [title, setTitle] = useState<string>('Senior Software Engineer');
  const [url, setUrl] = useState<string>('https://zynovexa.com');

  const vCardString = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${lastName};${firstName};;;`,
    `FN:${firstName} ${lastName}`,
    `ORG:${org}`,
    `TITLE:${title}`,
    `TEL;TYPE=CELL:${phone}`,
    `EMAIL:${email}`,
    `URL:${url}`,
    'END:VCARD'
  ].join('\n');

  return (
    <QrStudio
      value={vCardString}
      note="Scanning this QR code prompts smartphones to save the contact directly into their address book."
    >
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-300 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-300 text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-300 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-300 text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Company / Organization</label>
            <input
              type="text"
              value={org}
              onChange={(e) => setOrg(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-300 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Job Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-300 text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Website URL</label>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-slate-300 text-sm"
          />
        </div>
      </div>
    </QrStudio>
  );
};

// ==========================================
// 9. WhatsApp QR Code Generator
// ==========================================
export const WhatsAppQrGenerator: React.FC = () => {
  const [phone, setPhone] = useState<string>('8801712345678');
  const [message, setMessage] = useState<string>('Hello! I would like to get in touch.');

  const cleanPhone = phone.replace(/[^\d]/g, '');
  const waString = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;

  return (
    <QrStudio
      value={waString}
      note="Scanning opens a direct WhatsApp chat window with your number and pre-filled message without saving the contact first."
    >
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-bold text-slate-900 mb-1">
            WhatsApp Number (with country code, no + or spaces)
          </label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="e.g. 15551234567 or 8801712345678"
            className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 text-slate-900 text-sm font-mono"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-900 mb-1">Default Pre-filled Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
            placeholder="Type greeting or inquiry..."
            className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 text-slate-900 text-sm"
          />
        </div>
      </div>
    </QrStudio>
  );
};

// ==========================================
// 10. Location QR Code Generator
// ==========================================
export const LocationQrGenerator: React.FC = () => {
  const [latitude, setLatitude] = useState<string>('23.8103');
  const [longitude, setLongitude] = useState<string>('90.4125');
  const [name, setName] = useState<string>('Dhaka, Bangladesh');

  // Universal Google Maps pin URL: works on iOS, Android, and desktop
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${latitude},${longitude}`)}`;

  return (
    <QrStudio value={mapUrl} note="Scanning opens Google Maps or Apple Maps pinned precisely at your coordinates.">
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-bold text-slate-900 mb-1">Location Name / Landmark</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Central Park or Office HQ"
            className="w-full p-3 rounded-xl border border-slate-300 text-sm"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Latitude</label>
            <input
              type="text"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              placeholder="e.g. 40.7128"
              className="w-full p-2.5 rounded-xl border border-slate-300 text-sm font-mono"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Longitude</label>
            <input
              type="text"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              placeholder="e.g. -74.0060"
              className="w-full p-2.5 rounded-xl border border-slate-300 text-sm font-mono"
            />
          </div>
        </div>
        <p className="text-xs text-slate-500 font-mono">
          Encoded URL: {mapUrl}
        </p>
      </div>
    </QrStudio>
  );
};

// ==========================================
// 11. Calendar Event QR Code Generator
// ==========================================
export const CalendarEventQrGenerator: React.FC = () => {
  const [title, setTitle] = useState<string>('Annual Product Launch');
  const [location, setLocation] = useState<string>('Online / Main Hall');
  const [startDate, setStartDate] = useState<string>('2026-11-15T10:00');
  const [endDate, setEndDate] = useState<string>('2026-11-15T12:00');
  const [description, setDescription] = useState<string>('Join us for the live unveiling of new features.');

  const formatIcalDate = (dtStr: string) => {
    try {
      const d = new Date(dtStr);
      return d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    } catch {
      return '';
    }
  };

  const icalString = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'BEGIN:VEVENT',
    `SUMMARY:${title}`,
    `LOCATION:${location}`,
    `DESCRIPTION:${description}`,
    `DTSTART:${formatIcalDate(startDate)}`,
    `DTEND:${formatIcalDate(endDate)}`,
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\n');

  return (
    <QrStudio
      value={icalString}
      note="Scanning this QR code prompts smartphones to add this event directly to Apple Calendar, Google Calendar, or Outlook."
    >
      <div className="space-y-3">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Event Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-slate-300 text-sm"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-slate-300 text-sm"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Start Date & Time</label>
            <input
              type="datetime-local"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-300 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">End Date & Time</label>
            <input
              type="datetime-local"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-300 text-sm"
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
            className="w-full p-2.5 rounded-xl border border-slate-300 text-sm"
          />
        </div>
      </div>
    </QrStudio>
  );
};

// ==========================================
// 12. Payment Information QR Code Generator
// ==========================================
export const PaymentQrGenerator: React.FC = () => {
  const [method, setMethod] = useState<'upi' | 'iban' | 'crypto' | 'custom'>('upi');
  const [recipient, setRecipient] = useState<string>('merchant@upi');
  const [name, setName] = useState<string>('Zynovexa Store');
  const [amount, setAmount] = useState<string>('25.00');
  const [currency, setCurrency] = useState<string>('USD');
  const [customNote, setCustomNote] = useState<string>('Invoice-1002');

  let paymentString = '';
  if (method === 'upi') {
    paymentString = `upi://pay?pa=${encodeURIComponent(recipient)}&pn=${encodeURIComponent(name)}&am=${encodeURIComponent(amount)}&tn=${encodeURIComponent(customNote)}`;
  } else if (method === 'iban') {
    paymentString = `BCD\n001\n1\nSCT\n\n${name}\n${recipient}\nEUR${amount}\n\n${customNote}`;
  } else if (method === 'crypto') {
    paymentString = `bitcoin:${recipient}?amount=${amount}&label=${encodeURIComponent(name)}`;
  } else {
    paymentString = `PAYMENT:${recipient};AMOUNT:${amount};CURRENCY:${currency};REF:${customNote}`;
  }

  return (
    <QrStudio
      value={paymentString}
      note="Legal Notice: This QR code encodes informational payment parameters for scanning in compatible banking or digital wallet apps. Zynovexa does not process, verify, collect, or transmit any monetary transactions."
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-bold text-slate-900 mb-1">Payment Protocol / Standard</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { id: 'upi', label: 'UPI (India)' },
              { id: 'iban', label: 'SEPA / IBAN (EU)' },
              { id: 'crypto', label: 'Crypto (BTC)' },
              { id: 'custom', label: 'Custom Protocol' }
            ].map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setMethod(p.id as any)}
                className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                  method === p.id
                    ? 'bg-blue-50 border-blue-600 text-blue-700 shadow-xs'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              {method === 'upi' ? 'UPI ID (VPA)' : method === 'iban' ? 'IBAN Number' : method === 'crypto' ? 'Wallet Address' : 'Account Identifier'}
            </label>
            <input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-300 text-sm font-mono"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Payee Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-300 text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Amount</label>
            <input
              type="number"
              step="any"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-300 text-sm font-mono"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Reference / Note</label>
            <input
              type="text"
              value={customNote}
              onChange={(e) => setCustomNote(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-300 text-sm"
            />
          </div>
        </div>
      </div>
    </QrStudio>
  );
};

// ==========================================
// 13. Social Media Profile QR Code Generator
// ==========================================
export const SocialProfileQrGenerator: React.FC = () => {
  const [platform, setPlatform] = useState<string>('instagram');
  const [username, setUsername] = useState<string>('zynovexa');

  const platforms: Record<string, { label: string; url: (u: string) => string }> = {
    instagram: { label: 'Instagram', url: (u) => `https://instagram.com/${u}` },
    youtube: { label: 'YouTube', url: (u) => `https://youtube.com/@${u}` },
    twitter: { label: 'X (Twitter)', url: (u) => `https://x.com/${u}` },
    linkedin: { label: 'LinkedIn', url: (u) => `https://linkedin.com/in/${u}` },
    tiktok: { label: 'TikTok', url: (u) => `https://tiktok.com/@${u}` },
    facebook: { label: 'Facebook', url: (u) => `https://facebook.com/${u}` },
    github: { label: 'GitHub', url: (u) => `https://github.com/${u}` }
  };

  const profileUrl = platforms[platform]?.url(username.trim().replace(/^@/, '')) || `https://${username}`;

  return (
    <QrStudio
      value={profileUrl}
      note="Print this QR code on business cards, stickers, or store banners for instant follower acquisition."
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-bold text-slate-900 mb-2">Select Social Platform</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {Object.entries(platforms).map(([key, data]) => (
              <button
                key={key}
                type="button"
                onClick={() => setPlatform(key)}
                className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                  platform === key
                    ? 'bg-blue-50 border-blue-600 text-blue-700 shadow-xs'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                {data.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-900 mb-1">Account Handle / Username</label>
          <div className="relative">
            <span className="absolute left-3.5 top-3 text-slate-400 font-bold text-sm">@</span>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="username"
              className="w-full p-2.5 pl-8 rounded-xl border border-slate-300 text-sm font-mono"
            />
          </div>
          <p className="text-xs text-slate-500 mt-1 font-mono">
            Destination: <span className="text-blue-600">{profileUrl}</span>
          </p>
        </div>
      </div>
    </QrStudio>
  );
};
