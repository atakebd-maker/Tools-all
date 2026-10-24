import React, { useState, useEffect } from 'react';
import { Copy, Check, RefreshCw, Shield, Key } from 'lucide-react';
import { copyToClipboard } from '../../utils/formatting';

export const PasswordGenerator: React.FC = () => {
  const [length, setLength] = useState<number>(16);
  const [includeUpper, setIncludeUpper] = useState<boolean>(true);
  const [includeLower, setIncludeLower] = useState<boolean>(true);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(true);
  const [excludeSimilar, setExcludeSimilar] = useState<boolean>(false); // 1, l, I, 0, O
  const [password, setPassword] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  const generatePassword = () => {
    let uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    let numberChars = '0123456789';
    let symbolChars = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    if (excludeSimilar) {
      uppercaseChars = uppercaseChars.replace(/[IO]/g, '');
      lowercaseChars = lowercaseChars.replace(/[l]/g, '');
      numberChars = numberChars.replace(/[01]/g, '');
    }

    let charPool = '';
    if (includeUpper) charPool += uppercaseChars;
    if (includeLower) charPool += lowercaseChars;
    if (includeNumbers) charPool += numberChars;
    if (includeSymbols) charPool += symbolChars;

    if (!charPool) {
      setPassword('');
      return;
    }

    // Cryptographically secure generation using crypto.getRandomValues
    const array = new Uint32Array(length);
    window.crypto.getRandomValues(array);

    let result = '';
    for (let i = 0; i < length; i++) {
      result += charPool[array[i] % charPool.length];
    }
    setPassword(result);
  };

  useEffect(() => {
    generatePassword();
  }, [length, includeUpper, includeLower, includeNumbers, includeSymbols, excludeSimilar]);

  const getStrength = () => {
    if (!password) return { label: 'None', score: 0, color: 'bg-slate-200' };
    let score = 0;
    if (password.length >= 12) score += 1;
    if (password.length >= 16) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    if (score <= 2) return { label: 'Weak', score, color: 'bg-red-500' };
    if (score <= 4) return { label: 'Moderate', score, color: 'bg-amber-500' };
    return { label: 'Very Strong', score, color: 'bg-emerald-500' };
  };

  const strength = getStrength();

  const handleCopy = async () => {
    await copyToClipboard(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Generated Password Box */}
      <div className="p-6 bg-slate-900 text-white rounded-3xl border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div className="text-xl sm:text-2xl font-mono font-bold tracking-wider break-all text-blue-400 select-all">
            {password || 'Select at least one character type'}
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={generatePassword}
              className="p-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-colors cursor-pointer"
              title="Generate new password"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
            <button
              onClick={handleCopy}
              className="px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-lg shadow-blue-600/30"
            >
              {copied ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
        </div>

        {/* Strength Meter */}
        <div className="space-y-1.5 pt-2 border-t border-slate-800">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-400">Password Security Strength:</span>
            <span className="font-bold text-slate-200">{strength.label}</span>
          </div>
          <div className="grid grid-cols-5 gap-1.5 h-1.5">
            {[1, 2, 3, 4, 5].map((lvl) => (
              <div
                key={lvl}
                className={`rounded-full h-full transition-colors ${
                  strength.score >= lvl ? strength.color : 'bg-slate-800'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Settings Grid */}
      <div className="p-6 bg-white border border-slate-200 rounded-2xl space-y-5">
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
              Password Length: {length} characters
            </label>
            <span className="text-xs text-slate-400">Recommended: 16+</span>
          </div>
          <input
            type="range"
            min="6"
            max="64"
            value={length}
            onChange={(e) => setLength(parseInt(e.target.value))}
            className="w-full accent-blue-600 cursor-pointer"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
          <label className="flex items-center gap-2.5 text-xs font-semibold text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={includeUpper}
              onChange={(e) => setIncludeUpper(e.target.checked)}
              className="rounded text-blue-600"
            />
            <span>Uppercase Letters (A-Z)</span>
          </label>

          <label className="flex items-center gap-2.5 text-xs font-semibold text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={includeLower}
              onChange={(e) => setIncludeLower(e.target.checked)}
              className="rounded text-blue-600"
            />
            <span>Lowercase Letters (a-z)</span>
          </label>

          <label className="flex items-center gap-2.5 text-xs font-semibold text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
              className="rounded text-blue-600"
            />
            <span>Numbers (0-9)</span>
          </label>

          <label className="flex items-center gap-2.5 text-xs font-semibold text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={includeSymbols}
              onChange={(e) => setIncludeSymbols(e.target.checked)}
              className="rounded text-blue-600"
            />
            <span>Special Symbols (!@#$%)</span>
          </label>

          <label className="flex items-center gap-2.5 text-xs font-semibold text-slate-700 cursor-pointer sm:col-span-2">
            <input
              type="checkbox"
              checked={excludeSimilar}
              onChange={(e) => setExcludeSimilar(e.target.checked)}
              className="rounded text-blue-600"
            />
            <span>Exclude easily confused characters (1, l, I, 0, O)</span>
          </label>
        </div>
      </div>

      <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-500">
        <strong>Browser Security Guarantee:</strong> Passwords are generated using the browser's cryptographically secure pseudo-random number generator (<code>window.crypto.getRandomValues</code>) and are never sent or stored anywhere.
      </div>
    </div>
  );
};
