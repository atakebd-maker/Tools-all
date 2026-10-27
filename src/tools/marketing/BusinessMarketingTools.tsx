import React, { useState } from 'react';
import {
  Tag,
  Gift,
  Link,
  MessageCircle,
  Mail,
  UserCheck,
  QrCode,
  FileText,
  Copy,
  Check,
  Download,
  RefreshCw,
  FileSpreadsheet
} from 'lucide-react';

// ==========================================
// 109. Coupon Code Generator
// ==========================================
export const CouponCodeGenerator: React.FC = () => {
  const [prefix, setPrefix] = useState<string>('SAVE');
  const [length, setLength] = useState<number>(6);
  const [count, setCount] = useState<number>(10);
  const [coupons, setCoupons] = useState<string[]>([]);
  const [copied, setCopied] = useState<boolean>(false);

  const generate = () => {
    const list: string[] = [];
    const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
    for (let i = 0; i < count; i++) {
      const buf = new Uint8Array(length);
      window.crypto.getRandomValues(buf);
      let s = '';
      for (let j = 0; j < length; j++) {
        s += chars[buf[j] % chars.length];
      }
      list.push(`${prefix.trim().toUpperCase()}-${s}`);
    }
    setCoupons(list);
  };

  React.useEffect(() => {
    generate();
  }, []);

  const handleDownloadCsv = () => {
    const csv = 'CouponCode\n' + coupons.map((c) => `"${c}"`).join('\n');
    const a = document.createElement('a');
    a.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
    a.download = `coupons-${Date.now()}.csv`;
    a.click();
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 grid grid-cols-3 gap-3">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Prefix</label>
          <input
            type="text"
            value={prefix}
            onChange={(e) => setPrefix(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-slate-300 text-sm font-mono bg-white"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Code Length</label>
          <input
            type="number"
            min={4}
            max={16}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full p-2.5 rounded-xl border border-slate-300 text-sm font-mono bg-white"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Batch Count</label>
          <select
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            className="w-full p-2.5 rounded-xl border border-slate-300 text-sm bg-white"
          >
            <option value={5}>5 Coupons</option>
            <option value={10}>10 Coupons</option>
            <option value={25}>25 Coupons</option>
            <option value={50}>50 Coupons</option>
            <option value={100}>100 Coupons</option>
          </select>
        </div>

        <div className="col-span-3 pt-2">
          <button
            type="button"
            onClick={generate}
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold cursor-pointer"
          >
            Generate Coupon Codes
          </button>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm font-bold text-slate-900">Generated Coupons ({coupons.length})</span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={async () => {
                await navigator.clipboard.writeText(coupons.join('\n'));
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              Copy
            </button>
            <button
              type="button"
              onClick={handleDownloadCsv}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" /> Download CSV
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-64 overflow-y-auto bg-slate-50 p-3 rounded-xl border border-slate-200 font-mono text-xs">
          {coupons.map((c, i) => (
            <div key={i} className="bg-white p-2 rounded border border-slate-200 text-blue-700 font-bold text-center select-all">
              {c}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 110. Promotional Code Generator
// ==========================================
export const PromoCodeGenerator: React.FC = () => {
  const [theme, setTheme] = useState<string>('SUMMER');
  const [discount, setDiscount] = useState<number>(20);
  const [suffix, setSuffix] = useState<string>('OFF');
  const [promos, setPromos] = useState<string[]>([]);
  const [copied, setCopied] = useState<string | null>(null);

  const generate = () => {
    const list = [
      `${theme.toUpperCase()}${discount}${suffix.toUpperCase()}`,
      `${theme.toUpperCase()}_${discount}`,
      `GET${discount}${theme.toUpperCase()}`,
      `${theme.toUpperCase()}DEAL${discount}`,
      `FLASH${discount}_${theme.toUpperCase()}`
    ];
    setPromos(list);
  };

  React.useEffect(() => {
    generate();
  }, [theme, discount, suffix]);

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 grid grid-cols-3 gap-3">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Theme / Season</label>
          <input
            type="text"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-slate-300 text-sm font-mono bg-white"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Discount (% or $)</label>
          <input
            type="number"
            value={discount}
            onChange={(e) => setDiscount(Number(e.target.value))}
            className="w-full p-2.5 rounded-xl border border-slate-300 text-sm font-mono bg-white"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Suffix</label>
          <input
            type="text"
            value={suffix}
            onChange={(e) => setSuffix(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-slate-300 text-sm font-mono bg-white"
          />
        </div>
      </div>

      <div className="space-y-3">
        <span className="text-sm font-bold text-slate-900">Click to Copy Promo Code</span>
        {promos.map((p, i) => (
          <div
            key={i}
            onClick={async () => {
              await navigator.clipboard.writeText(p);
              setCopied(p);
              setTimeout(() => setCopied(null), 2000);
            }}
            className="p-4 bg-white border border-slate-200 hover:border-blue-400 rounded-xl flex items-center justify-between cursor-pointer transition-all shadow-2xs font-mono font-bold text-slate-900"
          >
            <span>{p}</span>
            <span className="text-xs font-semibold text-blue-600 flex items-center gap-1">
              {copied === p ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              {copied === p ? 'Copied' : 'Copy'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ==========================================
// 116. Invoice Number Generator
// ==========================================
export const InvoiceNumberGenerator: React.FC = () => {
  const [prefix, setPrefix] = useState<string>('INV');
  const [useDate, setUseDate] = useState<boolean>(true);
  const [startNum, setStartNum] = useState<number>(1);
  const [count, setCount] = useState<number>(10);
  const [invoices, setInvoices] = useState<string[]>([]);
  const [copied, setCopied] = useState<boolean>(false);

  const generate = () => {
    const list: string[] = [];
    const dateStr = useDate ? new Date().toISOString().slice(0, 10).replace(/-/g, '') + '-' : '';
    for (let i = 0; i < count; i++) {
      const numStr = String(startNum + i).padStart(4, '0');
      list.push(`${prefix}-${dateStr}${numStr}`);
    }
    setInvoices(list);
  };

  React.useEffect(() => {
    generate();
  }, [prefix, useDate, startNum, count]);

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 grid grid-cols-3 gap-3 items-end">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Prefix</label>
          <input
            type="text"
            value={prefix}
            onChange={(e) => setPrefix(e.target.value)}
            className="w-full p-2 rounded-xl border border-slate-300 text-sm font-mono bg-white"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Start Number</label>
          <input
            type="number"
            value={startNum}
            onChange={(e) => setStartNum(Number(e.target.value))}
            className="w-full p-2 rounded-xl border border-slate-300 text-sm font-mono bg-white"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Batch Count</label>
          <input
            type="number"
            min={1}
            max={50}
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            className="w-full p-2 rounded-xl border border-slate-300 text-sm font-mono bg-white"
          />
        </div>

        <div className="col-span-3 pt-2">
          <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={useDate}
              onChange={(e) => setUseDate(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded"
            />
            <span>Include YYYYMMDD Date Stamp in Invoice ID</span>
          </label>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm font-bold text-slate-900">Sequential Invoice Numbers</span>
          <button
            type="button"
            onClick={async () => {
              await navigator.clipboard.writeText(invoices.join('\n'));
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
            className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            Copy All
          </button>
        </div>
        <div className="space-y-1 font-mono text-xs bg-slate-50 p-4 rounded-xl border border-slate-200 select-all">
          {invoices.map((inv, idx) => (
            <div key={idx} className="text-slate-800 font-bold py-0.5">{inv}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 118. Affiliate Link Parameter Builder
// ==========================================
export const AffiliateLinkBuilder: React.FC = () => {
  const [baseUrl, setBaseUrl] = useState<string>('https://example.com/product/laptop');
  const [affiliateParam, setAffiliateParam] = useState<string>('ref');
  const [affiliateId, setAffiliateId] = useState<string>('partner123');
  const [subId, setSubId] = useState<string>('campaign_autumn');
  const [copied, setCopied] = useState<boolean>(false);

  const buildUrl = () => {
    try {
      const u = new URL(baseUrl.match(/^https?:\/\//i) ? baseUrl : `https://${baseUrl}`);
      if (affiliateParam && affiliateId) {
        u.searchParams.set(affiliateParam, affiliateId);
      }
      if (subId) {
        u.searchParams.set('subid', subId);
      }
      return u.toString();
    } catch {
      return '';
    }
  };

  const finalUrl = buildUrl();

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Destination Product URL</label>
          <input
            type="url"
            value={baseUrl}
            onChange={(e) => setBaseUrl(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-slate-300 text-sm font-mono bg-white"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Affiliate Parameter Key</label>
            <input
              type="text"
              value={affiliateParam}
              onChange={(e) => setAffiliateParam(e.target.value)}
              placeholder="e.g. ref, tag, aff"
              className="w-full p-2 rounded-xl border border-slate-300 text-sm font-mono bg-white"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Your Partner ID</label>
            <input
              type="text"
              value={affiliateId}
              onChange={(e) => setAffiliateId(e.target.value)}
              placeholder="partner123"
              className="w-full p-2 rounded-xl border border-slate-300 text-sm font-mono bg-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">SubID / Channel Tag (Optional)</label>
          <input
            type="text"
            value={subId}
            onChange={(e) => setSubId(e.target.value)}
            className="w-full p-2 rounded-xl border border-slate-300 text-sm font-mono bg-white"
          />
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-3">
        <span className="text-sm font-bold text-slate-900">Final Tagged Affiliate URL</span>
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs text-blue-700 break-all select-all font-semibold">
          {finalUrl || 'Please enter a valid base URL.'}
        </div>
        <button
          type="button"
          onClick={async () => {
            await navigator.clipboard.writeText(finalUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          }}
          disabled={!finalUrl}
          className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied ? 'Copied Affiliate Link!' : 'Copy Tagged URL'}
        </button>
      </div>
    </div>
  );
};
