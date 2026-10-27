import React, { useState, useEffect } from 'react';
import {
  Lock,
  Key,
  Shield,
  ShieldCheck,
  RefreshCw,
  Copy,
  Check,
  AlertTriangle,
  FileText,
  Clock,
  Sparkles,
  Hash
} from 'lucide-react';

// ==========================================
// 61. Secure Password Generator (Web Crypto API)
// ==========================================
export const SecurePasswordGenerator: React.FC = () => {
  const [length, setLength] = useState<number>(16);
  const [useUpper, setUseUpper] = useState<boolean>(true);
  const [useLower, setUseLower] = useState<boolean>(true);
  const [useDigits, setUseDigits] = useState<boolean>(true);
  const [useSymbols, setUseSymbols] = useState<boolean>(true);
  const [noAmbiguous, setNoAmbiguous] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  const generate = () => {
    let lower = 'abcdefghijklmnopqrstuvwxyz';
    let upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let digits = '0123456789';
    let symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (noAmbiguous) {
      lower = lower.replace(/[ilo]/g, '');
      upper = upper.replace(/[IO]/g, '');
      digits = digits.replace(/[01]/g, '');
      symbols = symbols.replace(/[|:;]/g, '');
    }

    let charset = '';
    const guaranteed: string[] = [];

    if (useLower) {
      charset += lower;
      guaranteed.push(getRandomChar(lower));
    }
    if (useUpper) {
      charset += upper;
      guaranteed.push(getRandomChar(upper));
    }
    if (useDigits) {
      charset += digits;
      guaranteed.push(getRandomChar(digits));
    }
    if (useSymbols) {
      charset += symbols;
      guaranteed.push(getRandomChar(symbols));
    }

    if (!charset) {
      setPassword('');
      return;
    }

    const remainingCount = Math.max(0, length - guaranteed.length);
    const randomArray = new Uint32Array(remainingCount);
    window.crypto.getRandomValues(randomArray);

    const chars = [...guaranteed];
    for (let i = 0; i < remainingCount; i++) {
      chars.push(charset[randomArray[i] % charset.length]);
    }

    // Shuffle characters using Fisher-Yates with crypto random
    for (let i = chars.length - 1; i > 0; i--) {
      const randBuf = new Uint32Array(1);
      window.crypto.getRandomValues(randBuf);
      const j = randBuf[0] % (i + 1);
      [chars[i], chars[j]] = [chars[j], chars[i]];
    }

    setPassword(chars.join(''));
  };

  const getRandomChar = (str: string) => {
    const buf = new Uint32Array(1);
    window.crypto.getRandomValues(buf);
    return str[buf[0] % str.length];
  };

  useEffect(() => {
    generate();
  }, [length, useUpper, useLower, useDigits, useSymbols, noAmbiguous]);

  // Calculate approximate entropy
  const poolSize = (useLower ? 26 : 0) + (useUpper ? 26 : 0) + (useDigits ? 10 : 0) + (useSymbols ? 30 : 0);
  const entropy = Math.round(length * Math.log2(poolSize || 1));

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-5">
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs font-bold text-slate-700 uppercase">Password Length: {length}</label>
            <span className="text-xs font-mono font-bold text-blue-600">{entropy} bits entropy</span>
          </div>
          <input
            type="range"
            min={8}
            max={64}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full accent-blue-600 cursor-pointer"
          />
        </div>

        <div className="grid grid-cols-2 gap-3 text-xs font-medium text-slate-800">
          <label className="flex items-center gap-2 cursor-pointer bg-white p-2.5 rounded-xl border border-slate-200">
            <input
              type="checkbox"
              checked={useUpper}
              onChange={(e) => setUseUpper(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded"
            />
            <span>Uppercase (A-Z)</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer bg-white p-2.5 rounded-xl border border-slate-200">
            <input
              type="checkbox"
              checked={useLower}
              onChange={(e) => setUseLower(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded"
            />
            <span>Lowercase (a-z)</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer bg-white p-2.5 rounded-xl border border-slate-200">
            <input
              type="checkbox"
              checked={useDigits}
              onChange={(e) => setUseDigits(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded"
            />
            <span>Numbers (0-9)</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer bg-white p-2.5 rounded-xl border border-slate-200">
            <input
              type="checkbox"
              checked={useSymbols}
              onChange={(e) => setUseSymbols(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded"
            />
            <span>Symbols (!@#$...)</span>
          </label>
        </div>

        <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer pt-1">
          <input
            type="checkbox"
            checked={noAmbiguous}
            onChange={(e) => setNoAmbiguous(e.target.checked)}
            className="w-4 h-4 text-blue-600 rounded"
          />
          <span>Exclude ambiguous characters (i, l, 1, L, o, 0, O)</span>
        </label>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm text-center space-y-4">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          Cryptographically Generated Password
        </span>
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl font-mono text-lg sm:text-xl text-slate-900 select-all break-all font-semibold">
          {password || 'Select at least one character type.'}
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={generate}
            className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Re-generate
          </button>
          <button
            type="button"
            onClick={async () => {
              await navigator.clipboard.writeText(password);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
            disabled={!password}
            className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-xs disabled:opacity-50"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied Password!' : 'Copy Password'}
          </button>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 62. Random Number Generator
// ==========================================
export const RandomNumberGenerator: React.FC = () => {
  const [min, setMin] = useState<number>(1);
  const [max, setMax] = useState<number>(100);
  const [count, setCount] = useState<number>(5);
  const [unique, setUnique] = useState<boolean>(false);
  const [results, setResults] = useState<number[]>([]);
  const [copied, setCopied] = useState<boolean>(false);

  const generate = () => {
    if (min >= max) return;
    const range = max - min + 1;
    const nums: number[] = [];
    const used = new Set<number>();

    while (nums.length < count) {
      if (unique && nums.length >= range) break;
      const buf = new Uint32Array(1);
      window.crypto.getRandomValues(buf);
      const num = min + (buf[0] % range);
      if (unique) {
        if (!used.has(num)) {
          used.add(num);
          nums.push(num);
        }
      } else {
        nums.push(num);
      }
    }
    setResults(nums);
  };

  useEffect(() => {
    generate();
  }, []);

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 grid grid-cols-3 gap-3">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Min Value</label>
          <input
            type="number"
            value={min}
            onChange={(e) => setMin(Number(e.target.value))}
            className="w-full p-2.5 rounded-xl border border-slate-300 text-sm font-mono"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Max Value</label>
          <input
            type="number"
            value={max}
            onChange={(e) => setMax(Number(e.target.value))}
            className="w-full p-2.5 rounded-xl border border-slate-300 text-sm font-mono"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Quantity</label>
          <input
            type="number"
            min={1}
            max={50}
            value={count}
            onChange={(e) => setCount(Math.max(1, Math.min(50, Number(e.target.value))))}
            className="w-full p-2.5 rounded-xl border border-slate-300 text-sm font-mono"
          />
        </div>

        <div className="col-span-3 flex items-center justify-between pt-1">
          <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={unique}
              onChange={(e) => setUnique(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded"
            />
            <span>No Duplicates (Unique values only)</span>
          </label>
          <button
            type="button"
            onClick={generate}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold cursor-pointer"
          >
            Generate Numbers
          </button>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm font-bold text-slate-900">Generated Numbers ({results.length})</span>
          <button
            type="button"
            onClick={async () => {
              await navigator.clipboard.writeText(results.join(', '));
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
            className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            Copy
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {results.map((n, idx) => (
            <div key={idx} className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-lg font-bold text-blue-700">
              {n}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 63. Random String Generator
// ==========================================
export const RandomStringGenerator: React.FC = () => {
  const [length, setLength] = useState<number>(12);
  const [count, setCount] = useState<number>(5);
  const [charset, setCharset] = useState<string>('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789');
  const [results, setResults] = useState<string[]>([]);
  const [copied, setCopied] = useState<boolean>(false);

  const generate = () => {
    if (!charset) return;
    const list: string[] = [];
    for (let i = 0; i < count; i++) {
      const buf = new Uint32Array(length);
      window.crypto.getRandomValues(buf);
      let s = '';
      for (let j = 0; j < length; j++) {
        s += charset[buf[j] % charset.length];
      }
      list.push(s);
    }
    setResults(list);
  };

  useEffect(() => {
    generate();
  }, []);

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Custom Character Set</label>
          <input
            type="text"
            value={charset}
            onChange={(e) => setCharset(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-mono"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">String Length ({length})</label>
            <input
              type="number"
              min={4}
              max={100}
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-full p-2 rounded-xl border border-slate-300 text-sm font-mono"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Quantity ({count})</label>
            <input
              type="number"
              min={1}
              max={50}
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              className="w-full p-2 rounded-xl border border-slate-300 text-sm font-mono"
            />
          </div>
        </div>

        <button
          type="button"
          onClick={generate}
          className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold cursor-pointer"
        >
          Generate Strings
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm font-bold text-slate-900">Generated Strings</span>
          <button
            type="button"
            onClick={async () => {
              await navigator.clipboard.writeText(results.join('\n'));
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
            className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            Copy All
          </button>
        </div>
        <div className="space-y-1.5 font-mono text-xs bg-slate-50 p-3 rounded-xl border border-slate-200 select-all">
          {results.map((r, i) => (
            <div key={i} className="text-slate-800 font-medium py-0.5">{r}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 64. UUID Version 4 Generator
// ==========================================
export const UuidV4Generator: React.FC = () => {
  const [count, setCount] = useState<number>(5);
  const [uppercase, setUppercase] = useState<boolean>(false);
  const [noHyphens, setNoHyphens] = useState<boolean>(false);
  const [uuids, setUuids] = useState<string[]>([]);
  const [copied, setCopied] = useState<boolean>(false);

  const generateUuid = () => {
    if (typeof crypto.randomUUID === 'function') {
      return crypto.randomUUID();
    }
    // RFC 4122 compliance fallback
    const buf = new Uint8Array(16);
    crypto.getRandomValues(buf);
    buf[6] = (buf[6] & 0x0f) | 0x40; // Version 4
    buf[8] = (buf[8] & 0x3f) | 0x80; // Variant 10xx
    const hex = Array.from(buf).map((b) => b.toString(16).padStart(2, '0')).join('');
    return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
  };

  const generate = () => {
    const list: string[] = [];
    for (let i = 0; i < count; i++) {
      let u = generateUuid();
      if (noHyphens) u = u.replace(/-/g, '');
      if (uppercase) u = u.toUpperCase();
      list.push(u);
    }
    setUuids(list);
  };

  useEffect(() => {
    generate();
  }, [count, uppercase, noHyphens]);

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Batch Count</label>
          <select
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            className="p-2 bg-white rounded-lg border border-slate-300 text-xs font-medium"
          >
            <option value={1}>1 UUID</option>
            <option value={5}>5 UUIDs</option>
            <option value={10}>10 UUIDs</option>
            <option value={20}>20 UUIDs</option>
          </select>
        </div>

        <div className="flex gap-4 text-xs font-medium text-slate-700">
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={uppercase}
              onChange={(e) => setUppercase(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded"
            />
            <span>UPPERCASE</span>
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={noHyphens}
              onChange={(e) => setNoHyphens(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded"
            />
            <span>No Hyphens</span>
          </label>
        </div>

        <button
          type="button"
          onClick={generate}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold cursor-pointer"
        >
          Generate
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm font-bold text-slate-900">RFC 4122 Compliant UUIDs</span>
          <button
            type="button"
            onClick={async () => {
              await navigator.clipboard.writeText(uuids.join('\n'));
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
            className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            Copy All
          </button>
        </div>
        <div className="space-y-1.5 font-mono text-xs bg-slate-50 p-4 rounded-xl border border-slate-200 select-all">
          {uuids.map((u, i) => (
            <div key={i} className="py-0.5 text-blue-700 font-semibold">{u}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ==========================================
// Base WebCrypto Hash Component
// ==========================================
const HashCalculatorView: React.FC<{
  algorithm: 'SHA-1' | 'SHA-256' | 'SHA-384' | 'SHA-512';
  warning?: string;
}> = ({ algorithm, warning }) => {
  const [text, setText] = useState<string>('Zynovexa');
  const [hash, setHash] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    let cancelled = false;
    const compute = async () => {
      if (!text) {
        setHash('');
        return;
      }
      try {
        const msgBuffer = new TextEncoder().encode(text);
        const hashBuffer = await crypto.subtle.digest(algorithm, msgBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
        if (!cancelled) setHash(hashHex);
      } catch (e) {
        if (!cancelled) setHash('Error computing hash.');
      }
    };
    compute();
    return () => { cancelled = true; };
  }, [text, algorithm]);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {warning && (
        <div className="flex items-start gap-2.5 p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-xs">
          <AlertTriangle className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
          <span>{warning}</span>
        </div>
      )}

      <div>
        <label className="block text-sm font-bold text-slate-900 mb-1">
          Input Text / Data to Hash
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
          placeholder="Type or paste any text..."
          className="w-full p-3 rounded-xl border border-slate-300 font-sans text-sm"
        />
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm font-bold text-slate-900">{algorithm} Digest ({hash.length * 4} bits)</span>
          <button
            type="button"
            onClick={async () => {
              await navigator.clipboard.writeText(hash);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
            disabled={!hash}
            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer disabled:opacity-50"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            Copy Hash
          </button>
        </div>
        <div className="p-3 bg-white rounded-xl border border-slate-200 font-mono text-xs text-blue-700 select-all break-all font-semibold">
          {hash || 'Enter text to calculate cryptographic digest...'}
        </div>
      </div>
    </div>
  );
};

// 65. SHA-1 Hash Generator
export const Sha1HashGenerator: React.FC = () => (
  <HashCalculatorView
    algorithm="SHA-1"
    warning="Security Notice: SHA-1 is cryptographically broken and prone to collision attacks. For security-sensitive applications (passwords, SSL certificates, signing), please use SHA-256 or SHA-512 instead."
  />
);

// 66. SHA-256 Hash Generator
export const Sha256HashGenerator: React.FC = () => (
  <HashCalculatorView algorithm="SHA-256" />
);

// 67. SHA-384 Hash Generator
export const Sha384HashGenerator: React.FC = () => (
  <HashCalculatorView algorithm="SHA-384" />
);

// 68. SHA-512 Hash Generator
export const Sha512HashGenerator: React.FC = () => (
  <HashCalculatorView algorithm="SHA-512" />
);

// ==========================================
// 69. Demo OTP Generator (Demonstration only)
// ==========================================
export const DemoOtpGenerator: React.FC = () => {
  const [digits, setDigits] = useState<number>(6);
  const [code, setCode] = useState<string>('');
  const [timeLeft, setTimeLeft] = useState<number>(30);
  const [copied, setCopied] = useState<boolean>(false);

  const generateOtp = () => {
    const buf = new Uint32Array(digits);
    window.crypto.getRandomValues(buf);
    let s = '';
    for (let i = 0; i < digits; i++) {
      s += (buf[i] % 10).toString();
    }
    setCode(s);
    setTimeLeft(30);
  };

  useEffect(() => {
    generateOtp();
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          generateOtp();
          return 30;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [digits]);

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="flex items-start gap-2.5 p-3.5 bg-blue-50 border border-blue-200 rounded-xl text-blue-900 text-xs">
        <AlertTriangle className="w-4 h-4 shrink-0 text-blue-600 mt-0.5" />
        <span>
          <strong>Educational Demonstration Mode:</strong> This tool simulates an algorithmic Time-based One-Time Password (TOTP) preview in your browser. It does not send SMS, email, or authenticate with real accounts or banking services.
        </span>
      </div>

      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-center space-y-4">
        <div className="flex justify-center gap-2">
          {[4, 6, 8].map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => setDigits(d)}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                digits === d ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-slate-300 text-slate-700'
              }`}
            >
              {d} Digits
            </button>
          ))}
        </div>

        <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            Simulated Demo OTP
          </span>
          <div className="font-mono text-4xl sm:text-5xl font-black text-slate-900 tracking-widest select-all">
            {code}
          </div>
          <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 font-semibold pt-2">
            <Clock className="w-3.5 h-3.5 text-blue-600 animate-spin" />
            <span>Refreshes in {timeLeft} seconds</span>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={generateOtp}
            className="flex-1 py-2 bg-slate-200 hover:bg-slate-300 rounded-xl text-xs font-bold text-slate-800 cursor-pointer"
          >
            Regenerate Now
          </button>
          <button
            type="button"
            onClick={async () => {
              await navigator.clipboard.writeText(code);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
            className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 rounded-xl text-xs font-bold text-white cursor-pointer"
          >
            {copied ? 'Copied!' : 'Copy Code'}
          </button>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 70. Random Username Generator
// ==========================================
export const RandomUsernameGenerator: React.FC = () => {
  const [category, setCategory] = useState<'tech' | 'gaming' | 'cool' | 'minimal'>('tech');
  const [usernames, setUsernames] = useState<string[]>([]);
  const [copied, setCopied] = useState<string | null>(null);

  const adjectives = ['Quantum', 'Apex', 'Cyber', 'Hyper', 'Swift', 'Silent', 'Nova', 'Vivid', 'Pixel', 'Aero', 'Stellar', 'Iron', 'Echo', 'Neon', 'Cosmic'];
  const nouns = ['Coder', 'Dev', 'Ninja', 'Rider', 'Phantom', 'Knight', 'Falcon', 'Pioneer', 'Spark', 'Pilot', 'Wizard', 'Vector', 'Orbit', 'Vanguard', 'Wolf'];

  const generate = () => {
    const list: string[] = [];
    for (let i = 0; i < 8; i++) {
      const buf = new Uint32Array(3);
      crypto.getRandomValues(buf);
      const adj = adjectives[buf[0] % adjectives.length];
      const noun = nouns[buf[1] % nouns.length];
      const num = 10 + (buf[2] % 90);
      list.push(`${adj}${noun}_${num}`);
    }
    setUsernames(list);
  };

  useEffect(() => {
    generate();
  }, []);

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <span className="text-sm font-bold text-slate-900">Click Any Username to Copy</span>
        <button
          type="button"
          onClick={generate}
          className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Re-roll
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {usernames.map((u, i) => (
          <div
            key={i}
            onClick={async () => {
              await navigator.clipboard.writeText(u);
              setCopied(u);
              setTimeout(() => setCopied(null), 2000);
            }}
            className="p-3.5 bg-white border border-slate-200 hover:border-blue-400 rounded-xl font-mono text-sm font-bold text-slate-800 flex justify-between items-center cursor-pointer transition-all shadow-2xs"
          >
            <span>{u}</span>
            <span className="text-xs text-blue-600">
              {copied === u ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ==========================================
// 71. Random Hex Color Generator
// ==========================================
export const RandomHexColorGenerator: React.FC = () => {
  const [colors, setColors] = useState<string[]>([]);
  const [copied, setCopied] = useState<string | null>(null);

  const generate = () => {
    const list: string[] = [];
    for (let i = 0; i < 8; i++) {
      const buf = new Uint8Array(3);
      crypto.getRandomValues(buf);
      const hex = '#' + Array.from(buf).map((b) => b.toString(16).padStart(2, '0')).join('').toUpperCase();
      list.push(hex);
    }
    setColors(list);
  };

  useEffect(() => {
    generate();
  }, []);

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <span className="text-sm font-bold text-slate-900">Cryptographically Random Palette</span>
        <button
          type="button"
          onClick={generate}
          className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Shuffle Colors
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {colors.map((c, i) => (
          <div
            key={i}
            onClick={async () => {
              await navigator.clipboard.writeText(c);
              setCopied(c);
              setTimeout(() => setCopied(null), 2000);
            }}
            className="p-3 bg-white border border-slate-200 rounded-2xl space-y-2 cursor-pointer hover:shadow-md transition-all text-center"
          >
            <div
              className="w-full h-20 rounded-xl shadow-inner border border-slate-200/40"
              style={{ backgroundColor: c }}
            />
            <div className="font-mono text-xs font-bold text-slate-900">{c}</div>
            <div className="text-[10px] text-slate-400 font-semibold">
              {copied === c ? 'Copied!' : 'Click to copy'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
