import React, { useState } from 'react';
import {
  CreditCard,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Copy,
  Check,
  RefreshCw,
  QrCode,
  FileText,
  ShieldCheck
} from 'lucide-react';
import QRCode from 'qrcode';

// ==========================================
// 72. Bank Card Number Format Validator (Luhn Algorithm)
// ==========================================
export const CardFormatValidator: React.FC = () => {
  const [cardNumber, setCardNumber] = useState<string>('4532 0150 0000 0000');
  const [copied, setCopied] = useState<boolean>(false);

  const cleanDigits = cardNumber.replace(/\D/g, '');

  // Luhn Algorithm Implementation
  const checkLuhn = (digits: string): boolean => {
    if (digits.length < 13 || digits.length > 19) return false;
    let sum = 0;
    let shouldDouble = false;

    for (let i = digits.length - 1; i >= 0; i--) {
      let digit = parseInt(digits.charAt(i), 10);
      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
      shouldDouble = !shouldDouble;
    }
    return sum % 10 === 0;
  };

  // Card Brand Detection based on standard IIN prefixes
  const detectBrand = (digits: string): string => {
    if (/^4/.test(digits)) return 'Visa';
    if (/^(5[1-5]|2[2-7])/.test(digits)) return 'Mastercard';
    if (/^3[47]/.test(digits)) return 'American Express';
    if (/^6(?:011|5)/.test(digits)) return 'Discover';
    if (/^35(?:2[89]|[3-8][0-9])/.test(digits)) return 'JCB';
    if (/^(508[5-9]|6521[5-9]|652[2-9]|6530|6531[0-4]|60)/.test(digits)) return 'RuPay';
    if (digits.length >= 2) return 'Unknown / Generic Card';
    return 'Pending Input';
  };

  const isValid = checkLuhn(cleanDigits);
  const brand = detectBrand(cleanDigits);

  const handleFormatInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 19);
    const formatted = raw.replace(/(\d{4})/g, '$1 ').trim();
    setCardNumber(formatted);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Strict Privacy & Educational Disclaimer */}
      <div className="flex items-start gap-2.5 p-4 bg-amber-50 border border-amber-200 rounded-2xl text-amber-900 text-xs leading-relaxed">
        <AlertTriangle className="w-5 h-5 shrink-0 text-amber-600 mt-0.5" />
        <div>
          <strong>Strict Privacy & Verification Notice:</strong>
          <ul className="list-disc list-inside mt-1 space-y-0.5 text-amber-800">
            <li>Passing a mathematical Luhn check does <strong>not</strong> prove a card is genuine, active, funded, or authorized.</li>
            <li>This tool processes numbers <strong>100% locally in your browser</strong>. No numbers are ever collected, stored, transmitted, or logged.</li>
            <li><strong>Do not enter real, active payment credentials.</strong> Use provided sample test numbers only.</li>
          </ul>
        </div>
      </div>

      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
        <div>
          <label className="block text-sm font-bold text-slate-900 mb-1">
            Card Number to Test
          </label>
          <div className="relative">
            <input
              type="text"
              value={cardNumber}
              onChange={handleFormatInput}
              placeholder="0000 0000 0000 0000"
              className="w-full p-3.5 pl-11 rounded-xl border border-slate-300 font-mono text-lg text-slate-900 tracking-wider bg-white"
            />
            <CreditCard className="w-5 h-5 text-slate-400 absolute left-3.5 top-4" />
          </div>
        </div>

        {/* Demo Test Values */}
        <div className="flex items-center gap-2 flex-wrap text-xs">
          <span className="font-semibold text-slate-500">Demo Test Values:</span>
          {[
            { label: 'Visa Test', num: '4532 0150 0000 0000' },
            { label: 'Mastercard Test', num: '5555 5555 5555 4444' },
            { label: 'Amex Test', num: '3782 8224 6310 005' }
          ].map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => setCardNumber(item.num)}
              className="px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-100 cursor-pointer font-medium"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Verification Card Results */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <span className="text-sm font-bold text-slate-900">Format Verification Results</span>
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
            cleanDigits.length < 13
              ? 'bg-slate-100 text-slate-600'
              : isValid
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}>
            {cleanDigits.length < 13 ? (
              'Incomplete Number'
            ) : isValid ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Luhn Formula Passed
              </>
            ) : (
              <>
                <XCircle className="w-4 h-4 text-red-600" />
                Luhn Checksum Failed
              </>
            )}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-3 bg-slate-50 rounded-xl">
            <span className="text-slate-400 block mb-0.5">Identified Network</span>
            <span className="text-slate-900 font-bold text-sm">{brand}</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl">
            <span className="text-slate-400 block mb-0.5">Total Digits</span>
            <span className="text-slate-900 font-bold text-sm">{cleanDigits.length} digits</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl">
            <span className="text-slate-400 block mb-0.5">Luhn Algorithm Valid</span>
            <span className={`font-bold text-sm ${isValid ? 'text-emerald-700' : 'text-red-700'}`}>
              {cleanDigits.length >= 13 ? (isValid ? 'Yes (Valid Mod 10)' : 'No (Invalid Checksum)') : 'N/A'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 73. Luhn Checksum Calculator
// ==========================================
export const LuhnChecksumCalculator: React.FC = () => {
  const [numberSequence, setNumberSequence] = useState<string>('7992739871');
  const [copied, setCopied] = useState<boolean>(false);

  const clean = numberSequence.replace(/\D/g, '');

  // Calculate the Luhn check digit needed to make the sequence valid
  const calculateCheckDigit = (num: string): number => {
    let sum = 0;
    let shouldDouble = true; // when calculating check digit, first digit from right is doubled

    for (let i = num.length - 1; i >= 0; i--) {
      let digit = parseInt(num.charAt(i), 10);
      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
      shouldDouble = !shouldDouble;
    }

    const mod = sum % 10;
    return mod === 0 ? 0 : 10 - mod;
  };

  const checkDigit = clean.length > 0 ? calculateCheckDigit(clean) : 0;
  const fullValidSequence = clean + String(checkDigit);

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-3">
        <label className="block text-sm font-bold text-slate-900">
          Base Number Sequence (without check digit)
        </label>
        <input
          type="text"
          value={numberSequence}
          onChange={(e) => setNumberSequence(e.target.value)}
          placeholder="e.g. 7992739871"
          className="w-full p-3 rounded-xl border border-slate-300 font-mono text-base tracking-wider bg-white"
        />
        <p className="text-xs text-slate-500">
          Computes the Modulo 10 check digit defined in ISO/IEC 7812-1.
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
            <span className="text-xs font-bold text-slate-500 uppercase">Calculated Check Digit</span>
            <div className="text-3xl font-black text-blue-600 font-mono">{checkDigit}</div>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
            <span className="text-xs font-bold text-slate-500 uppercase">Complete Valid Sequence</span>
            <div className="text-lg font-bold text-slate-900 font-mono break-all">{fullValidSequence}</div>
          </div>
        </div>

        <button
          type="button"
          onClick={async () => {
            await navigator.clipboard.writeText(fullValidSequence);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          }}
          className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied ? 'Copied Full Sequence!' : 'Copy Complete Number Sequence'}
        </button>
      </div>
    </div>
  );
};

// ==========================================
// 74. Payment Information QR Generator
// ==========================================
export const PaymentInfoQrGenerator: React.FC = () => {
  const [payee, setPayee] = useState<string>('store@upi');
  const [name, setName] = useState<string>('Retail Store');
  const [amount, setAmount] = useState<string>('50.00');
  const [ref, setRef] = useState<string>('INV-2026-004');
  const [qrUrl, setQrUrl] = useState<string>('');

  const payload = `upi://pay?pa=${encodeURIComponent(payee)}&pn=${encodeURIComponent(name)}&am=${encodeURIComponent(amount)}&tn=${encodeURIComponent(ref)}`;

  React.useEffect(() => {
    QRCode.toDataURL(payload, { width: 260, margin: 2 }).then(setQrUrl).catch(() => {});
  }, [payload]);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-start gap-2.5 p-4 bg-blue-50 border border-blue-200 rounded-2xl text-blue-900 text-xs leading-relaxed">
        <ShieldCheck className="w-5 h-5 shrink-0 text-blue-600 mt-0.5" />
        <span>
          <strong>Informational Standard Notice:</strong> This tool encodes standard UPI or banking URI strings into a standard QR code for scanning with authorized consumer banking apps. Zynovexa does not process transactions, handle funds, or verify account balances.
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
        <div className="space-y-3 bg-slate-50 p-5 rounded-2xl border border-slate-200">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Payee VPA / Identifier</label>
            <input
              type="text"
              value={payee}
              onChange={(e) => setPayee(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-300 text-sm font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Business / Payee Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-300 text-sm"
            />
          </div>

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
            <label className="block text-xs font-bold text-slate-700 mb-1">Invoice / Reference Note</label>
            <input
              type="text"
              value={ref}
              onChange={(e) => setRef(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-300 text-sm"
            />
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col items-center text-center space-y-3">
          <span className="text-xs font-bold text-slate-700 uppercase">Live Payment Information QR</span>
          {qrUrl ? (
            <img src={qrUrl} alt="Payment QR" className="w-56 h-56 rounded-xl border border-slate-200 shadow-2xs" />
          ) : (
            <div className="w-56 h-56 bg-slate-100 rounded-xl" />
          )}
          <a
            href={qrUrl}
            download={`payment-qr-${ref}.png`}
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold text-center block cursor-pointer"
          >
            Download QR Code
          </a>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 75. Demo Payment Reference Generator
// ==========================================
export const DemoPaymentRefGenerator: React.FC = () => {
  const [prefix, setPrefix] = useState<string>('TXN');
  const [count, setCount] = useState<number>(5);
  const [references, setReferences] = useState<string[]>([]);
  const [copied, setCopied] = useState<boolean>(false);

  const generate = () => {
    const list: string[] = [];
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    for (let i = 0; i < count; i++) {
      const buf = new Uint8Array(4);
      window.crypto.getRandomValues(buf);
      const hex = Array.from(buf).map((b) => b.toString(16).padStart(2, '0')).join('').toUpperCase();
      list.push(`${prefix}-${dateStr}-${hex}`);
    }
    setReferences(list);
  };

  React.useEffect(() => {
    generate();
  }, []);

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="flex items-start gap-2.5 p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 text-xs">
        <FileText className="w-4 h-4 shrink-0 text-slate-500 mt-0.5" />
        <span>
          <strong>Internal Reference Notice:</strong> These reference identifiers are locally generated sequential tags for sandbox, QA testing, internal bookkeeping, and demo billing modules. They do not represent processed banking ledger records.
        </span>
      </div>

      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex gap-4 items-end">
        <div className="flex-1">
          <label className="block text-xs font-bold text-slate-700 mb-1">Prefix</label>
          <input
            type="text"
            value={prefix}
            onChange={(e) => setPrefix(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-slate-300 text-sm font-mono"
          />
        </div>

        <div className="w-32">
          <label className="block text-xs font-bold text-slate-700 mb-1">Quantity</label>
          <select
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            className="w-full p-2.5 rounded-xl border border-slate-300 text-sm bg-white"
          >
            <option value={5}>5 IDs</option>
            <option value={10}>10 IDs</option>
            <option value={25}>25 IDs</option>
          </select>
        </div>

        <button
          type="button"
          onClick={generate}
          className="py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold cursor-pointer"
        >
          Generate
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm font-bold text-slate-900">Generated Demo References</span>
          <button
            type="button"
            onClick={async () => {
              await navigator.clipboard.writeText(references.join('\n'));
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
            className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            Copy
          </button>
        </div>
        <div className="space-y-1.5 font-mono text-xs bg-slate-50 p-4 rounded-xl border border-slate-200 select-all">
          {references.map((ref, idx) => (
            <div key={idx} className="text-blue-700 font-bold py-0.5">{ref}</div>
          ))}
        </div>
      </div>
    </div>
  );
};
