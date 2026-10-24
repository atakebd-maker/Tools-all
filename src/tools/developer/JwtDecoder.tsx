import React, { useState } from 'react';
import { Copy, Check, ShieldAlert, Key, Clock, AlertTriangle } from 'lucide-react';
import { copyToClipboard } from '../../utils/formatting';

export const JwtDecoder: React.FC = () => {
  const [jwt, setJwt] = useState<string>(
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFsZXggSm9obnNvbiIsImlhdCI6MTUxNjIzOTAyMiwiZXhwIjoxOTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
  );
  const [copiedPart, setCopiedPart] = useState<string>('');

  const decodeJwt = () => {
    const parts = jwt.trim().split('.');
    if (parts.length !== 3) {
      return { error: 'Invalid JWT structure: A valid JWT consists of three base64url segments separated by dots.' };
    }

    try {
      const b64Decode = (str: string) => {
        let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
        while (base64.length % 4) {
          base64 += '=';
        }
        return decodeURIComponent(
          atob(base64)
            .split('')
            .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join('')
        );
      };

      const headerObj = JSON.parse(b64Decode(parts[0]));
      const payloadObj = JSON.parse(b64Decode(parts[1]));

      let isExpired = false;
      let expDate = null;
      if (payloadObj.exp) {
        expDate = new Date(payloadObj.exp * 1000);
        isExpired = expDate.getTime() < Date.now();
      }

      return {
        header: JSON.stringify(headerObj, null, 2),
        payload: JSON.stringify(payloadObj, null, 2),
        signature: parts[2],
        isExpired,
        expDate: expDate ? expDate.toUTCString() : null,
        error: null
      };
    } catch {
      return { error: 'Failed to decode base64url payload or parse JSON content.' };
    }
  };

  const decoded = decodeJwt();

  const handleCopy = async (text: string, part: string) => {
    await copyToClipboard(text);
    setCopiedPart(part);
    setTimeout(() => setCopiedPart(''), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
          Encoded JWT Token
        </label>
        <textarea
          rows={3}
          value={jwt}
          onChange={(e) => setJwt(e.target.value)}
          placeholder="Paste eyJhbGciOi..."
          className="w-full p-3 font-mono text-xs bg-white border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-none"
        />
      </div>

      {/* Security Notice Required by Section 7 */}
      <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-2.5">
        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <p>
          <strong>Security Notice:</strong> Client-side decoding extracts and displays token claims, but does <strong>NOT</strong> verify the token's cryptographic signature or authenticity. Do not trust decoded claims on sensitive systems without server-side verification with the secret key or public certificate.
        </p>
      </div>

      {decoded.error ? (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
          {decoded.error}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Header */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-red-600 uppercase tracking-wider">
                Header: Algorithm & Token Type
              </span>
              <button
                onClick={() => handleCopy(decoded.header || '', 'header')}
                className="text-xs font-medium text-slate-500 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
              >
                {copiedPart === 'header' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                Copy Header
              </button>
            </div>
            <pre className="p-4 rounded-xl bg-slate-900 text-red-400 font-mono text-xs overflow-x-auto border border-slate-800">
              {decoded.header}
            </pre>
          </div>

          {/* Payload */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-purple-600 uppercase tracking-wider">
                  Payload: Claims
                </span>
                {decoded.expDate && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      decoded.isExpired ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'
                    }`}
                  >
                    {decoded.isExpired ? 'Expired' : 'Valid Expiration'}
                  </span>
                )}
              </div>
              <button
                onClick={() => handleCopy(decoded.payload || '', 'payload')}
                className="text-xs font-medium text-slate-500 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
              >
                {copiedPart === 'payload' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                Copy Payload
              </button>
            </div>
            <pre className="p-4 rounded-xl bg-slate-900 text-purple-300 font-mono text-xs overflow-x-auto border border-slate-800">
              {decoded.payload}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};
