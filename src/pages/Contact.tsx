import React, { useState } from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Send, CheckCircle2, MessageSquare, HelpCircle } from 'lucide-react';

interface ContactProps {
  onNavigateHome: () => void;
}

export const Contact: React.FC<ContactProps> = ({ onNavigateHome }) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [toolName, setToolName] = useState<string>('General Inquiry');
  const [message, setMessage] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs
        items={[
          { label: 'Home', onClick: onNavigateHome },
          { label: 'Contact Us' }
        ]}
      />

      <div className="space-y-3">
        <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
          Get in Touch
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Contact Zynovexa
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Have a suggestion for a new browser-based tool, noticed a calculation discrepancy, or want to share feedback? We would love to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Support Notes */}
        <div className="md:col-span-1 space-y-4">
          <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-2xs space-y-2">
            <div className="flex items-center gap-2 text-blue-600 font-bold text-sm">
              <MessageSquare className="w-4 h-4" />
              <span>Feedback & Ideas</span>
            </div>
            <p className="text-slate-600 text-xs leading-relaxed">
              We continually enhance our browser tool collection. Let us know which utilities you use most frequently.
            </p>
          </div>

          <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2 text-xs text-slate-600">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
              <HelpCircle className="w-4 h-4 text-emerald-600" />
              <span>No Cloud Accounts</span>
            </div>
            <p className="leading-relaxed">
              Because Zynovexa does not manage user accounts or store private data, we cannot access or recover previous files processed on your device.
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="md:col-span-2">
          {submitted ? (
            <div className="p-8 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h2 className="text-xl font-bold text-emerald-900">Message Received!</h2>
              <p className="text-emerald-700 text-sm max-w-sm mx-auto">
                Thank you for your feedback. Our development team reviews suggestions to prioritize future browser-native tools.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setName('');
                  setEmail('');
                  setMessage('');
                }}
                className="mt-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold cursor-pointer"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6 bg-white border border-slate-200 rounded-2xl shadow-2xs space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Alex Johnson"
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Your Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@example.com"
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Topic or Related Tool
                </label>
                <select
                  value={toolName}
                  onChange={(e) => setToolName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-900 bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
                >
                  <option value="General Inquiry">General Feedback or Suggestion</option>
                  <option value="Image Tools">Image Tools</option>
                  <option value="PDF Tools">PDF Tools</option>
                  <option value="Calculator Tools">Calculator Tools</option>
                  <option value="Developer Tools">Developer Tools</option>
                  <option value="Bug Report">Technical Bug Report</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Message
                </label>
                <textarea
                  rows={5}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your suggestion or question in detail..."
                  className="w-full p-3 border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm flex items-center justify-center gap-2 cursor-pointer shadow-sm transition-colors"
              >
                <Send className="w-4 h-4" />
                Submit Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
