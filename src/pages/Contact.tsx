import React, { useState } from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import {
  Send,
  Mail,
  CheckCircle2,
  MessageSquare,
  HelpCircle,
  Copy,
  Check,
  ExternalLink,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  AtSign
} from 'lucide-react';
import { AdBanner, AD_KEYS } from '../components/AdBanner';

interface ContactProps {
  onNavigateHome: () => void;
}

export const Contact: React.FC<ContactProps> = ({ onNavigateHome }) => {
  const TARGET_EMAIL = 'mdpiyas2737@gmail.com';

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [topic, setTopic] = useState<string>('General Feedback or Suggestion');
  const [customSubject, setCustomSubject] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const [submitted, setSubmitted] = useState<boolean>(false);
  const [preparedGmailUrl, setPreparedGmailUrl] = useState<string>('');
  const [preparedMailtoUrl, setPreparedMailtoUrl] = useState<string>('');
  const [formattedMessagePreview, setFormattedMessagePreview] = useState<string>('');
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);
  const [copiedBody, setCopiedBody] = useState<boolean>(false);

  // Formats the message cleanly and generates both Gmail web URL & mailto URL
  const generateMailUrls = () => {
    const trimmedName = name.trim() || 'Website Visitor';
    const trimmedEmail = email.trim() || 'No email provided';
    const effectiveSubject = customSubject.trim()
      ? `[Zynovexa] ${customSubject.trim()} (${topic})`
      : `[Zynovexa Contact] ${topic} - from ${trimmedName}`;

    const formattedBody = [
      `Hello Zynovexa Support Team,`,
      ``,
      `You have received a new message submitted via the Zynovexa website contact form.`,
      ``,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `SENDER INFORMATION`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `• Sender Name: ${trimmedName}`,
      `• Sender Email: ${trimmedEmail}`,
      `• Category / Topic: ${topic}`,
      customSubject.trim() ? `• Subject: ${customSubject.trim()}` : null,
      `• Date & Time: ${new Date().toLocaleString()}`,
      ``,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `MESSAGE CONTENT:`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      message.trim(),
      ``,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `Sent via Zynovexa Tools Platform (https://zynovexa.vercel.app)`,
      `Client-Side Privacy • 100% Free Browser Utilities`
    ]
      .filter((line) => line !== null)
      .join('\n');

    // Gmail Web Compose URL (automatically fills "to", "su", and "body")
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
      TARGET_EMAIL
    )}&su=${encodeURIComponent(effectiveSubject)}&body=${encodeURIComponent(
      formattedBody
    )}`;

    // Standard RFC mailto URL for default desktop/mobile mail apps
    const mailtoUrl = `mailto:${encodeURIComponent(
      TARGET_EMAIL
    )}?subject=${encodeURIComponent(effectiveSubject)}&body=${encodeURIComponent(
      formattedBody
    )}`;

    return { gmailUrl, mailtoUrl, formattedBody, effectiveSubject };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    const { gmailUrl, mailtoUrl, formattedBody } = generateMailUrls();

    setPreparedGmailUrl(gmailUrl);
    setPreparedMailtoUrl(mailtoUrl);
    setFormattedMessagePreview(formattedBody);
    setSubmitted(true);

    // Open Gmail Compose automatically in a new tab/window
    try {
      const newWindow = window.open(gmailUrl, '_blank', 'noopener,noreferrer');
      // If popup blocker intervened, the user still has prominent action buttons on the confirmation screen
      if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
        // Fallback: the page shows the direct "Open in Gmail" button
      }
    } catch {
      // Fallback handled via UI
    }
  };

  const copyEmailToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(TARGET_EMAIL);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      // ignore
    }
  };

  const copyBodyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(formattedMessagePreview);
      setCopiedBody(true);
      setTimeout(() => setCopiedBody(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs
        items={[
          { label: 'Home', onClick: onNavigateHome },
          { label: 'Contact Us' }
        ]}
      />

      {/* Header Banner */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
          <Mail className="w-3.5 h-3.5" />
          <span>Direct Contact & Support</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Contact Zynovexa
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl">
          Have feedback, a new tool suggestion, or a question? Send a message directly to our official support email. When you click <strong>Send via Gmail</strong>, your message details will open automatically in Gmail ready to send!
        </p>
      </div>

      {/* Official Email Highlight Card */}
      <div className="p-5 sm:p-6 bg-gradient-to-r from-blue-50 via-indigo-50/50 to-white border border-blue-200 rounded-2xl shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
            <AtSign className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-blue-700">
              Official Contact Email Address
            </div>
            <a
              href={`mailto:${TARGET_EMAIL}`}
              className="text-base sm:text-lg font-bold text-slate-900 hover:text-blue-600 transition-colors break-all"
            >
              {TARGET_EMAIL}
            </a>
            <p className="text-xs text-slate-500 mt-0.5">
              Available for tool requests, feedback, bug reports, and inquiries.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
          <button
            type="button"
            onClick={copyEmailToClipboard}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 transition-colors shadow-2xs cursor-pointer"
            title="Copy email address"
          >
            {copiedEmail ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700 font-semibold">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-500" />
                <span>Copy Email</span>
              </>
            )}
          </button>

          <a
            href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(TARGET_EMAIL)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-colors shadow-xs"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Open in Gmail</span>
            <ExternalLink className="w-3 h-3 ml-0.5" />
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Support Sidebar Information */}
        <div className="md:col-span-1 space-y-4">
          <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-2xs space-y-2">
            <div className="flex items-center gap-2 text-blue-600 font-bold text-sm">
              <MessageSquare className="w-4 h-4" />
              <span>How It Works</span>
            </div>
            <p className="text-slate-600 text-xs leading-relaxed">
              When you fill out this form and click <strong>Send via Gmail</strong>, your Gmail compose window opens automatically with the recipient (<code className="bg-slate-100 text-blue-700 px-1 py-0.5 rounded text-[11px] font-semibold">{TARGET_EMAIL}</code>), subject, and your formatted message already filled in!
            </p>
          </div>

          <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2 text-xs text-slate-600">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>100% Privacy Guarantee</span>
            </div>
            <p className="leading-relaxed">
              We never store your contact inquiries on remote tracking servers. Messages go directly from your personal email client to our support inbox.
            </p>
          </div>

          <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-2 text-xs text-slate-600 shadow-2xs">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Popular Topics</span>
            </div>
            <ul className="space-y-1.5 list-disc list-inside text-slate-600">
              <li>Requesting a new calculator or converter</li>
              <li>Reporting unexpected formula results</li>
              <li>PDF and image tool enhancement ideas</li>
              <li>General website feedback & praise</li>
            </ul>
          </div>
        </div>

        {/* Contact Form / Confirmation Window */}
        <div className="md:col-span-2">
          {submitted ? (
            <div className="p-6 sm:p-8 bg-emerald-50/70 border border-emerald-200 rounded-2xl space-y-6 animate-in fade-in duration-200">
              <div className="text-center space-y-2">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-2xs">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold text-emerald-950">
                  Ready in Gmail!
                </h2>
                <p className="text-slate-700 text-sm max-w-md mx-auto leading-relaxed">
                  We prepared your message for{' '}
                  <strong className="text-blue-700 font-mono bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200">
                    {TARGET_EMAIL}
                  </strong>
                  . Click the button below to open your Gmail compose tab and send it:
                </p>
              </div>

              {/* Action Buttons to Open Gmail or Mail app */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={preparedGmailUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm transition-all shadow-md hover:shadow-blue-600/20 cursor-pointer"
                >
                  <Mail className="w-4 h-4" />
                  <span>Open in Gmail (Web)</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
                </a>

                <a
                  href={preparedMailtoUrl}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-white hover:bg-slate-50 text-slate-800 font-semibold rounded-xl text-sm border border-slate-300 transition-colors shadow-2xs cursor-pointer"
                >
                  <span>Open Default Email App</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Formatted Message Preview Box */}
              <div className="bg-white border border-emerald-200/90 rounded-xl p-4 sm:p-5 shadow-2xs space-y-3">
                <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Preview of your message in Gmail:
                  </span>
                  <button
                    type="button"
                    onClick={copyBodyToClipboard}
                    className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-semibold cursor-pointer"
                  >
                    {copiedBody ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Text</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="text-xs text-slate-800 bg-slate-50/80 p-3 rounded-lg overflow-x-auto whitespace-pre-wrap font-mono leading-relaxed border border-slate-100 max-h-56">
                  {formattedMessagePreview}
                </pre>
              </div>

              {/* Reset / Send Another Button */}
              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setMessage('');
                  }}
                  className="text-xs font-semibold text-slate-600 hover:text-blue-600 transition-colors cursor-pointer underline"
                >
                  Need to change anything? Edit message & send again
                </button>
              </div>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="p-6 sm:p-8 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-5"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h2 className="text-lg font-bold text-slate-900">Send Us a Message</h2>
                <span className="text-xs text-slate-500">
                  Recipient: <strong className="text-blue-700 font-mono">{TARGET_EMAIL}</strong>
                </span>
              </div>

              {/* Name and Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Your Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name (e.g. Alex Johnson)"
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Your Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-none transition-all"
                  />
                </div>
              </div>

              {/* Topic Select */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Category / Topic
                </label>
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-900 bg-white focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-none transition-all cursor-pointer"
                >
                  <option value="General Feedback or Suggestion">General Feedback or Suggestion</option>
                  <option value="Tool Suggestion / Request">Request a New Calculator or Tool</option>
                  <option value="Calculator Tools">Calculator & Math Tools</option>
                  <option value="PDF Tools">PDF Utilities (Merger, Splitter, etc.)</option>
                  <option value="Image Tools">Image Tools (Resizer, Compressor, etc.)</option>
                  <option value="Developer Tools">Developer & Encoder Tools</option>
                  <option value="Bug Report">Technical Bug Report / Error</option>
                  <option value="Partnership / Other">Partnership & Inquiries</option>
                </select>
              </div>

              {/* Custom Subject (Optional) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Subject Line <span className="text-slate-400 font-normal lowercase">(optional)</span>
                </label>
                <input
                  type="text"
                  value={customSubject}
                  onChange={(e) => setCustomSubject(e.target.value)}
                  placeholder="e.g. Please add an Age Difference Calculator"
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-none transition-all"
                />
              </div>

              {/* Message Area */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Your Message <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={5}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write your message here in detail. When you click Send via Gmail, this text will appear neatly formatted in your Gmail compose box..."
                  className="w-full p-3.5 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-none transition-all leading-relaxed"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-7 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-blue-600/20 transition-all"
                >
                  <Mail className="w-4 h-4" />
                  <span>Send via Gmail ({TARGET_EMAIL})</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>
                <p className="text-xs text-slate-500 mt-2">
                  Clicking will open Gmail with recipient <strong>{TARGET_EMAIL}</strong>, subject, and message pre-filled.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Multi-Placement Ad Banner */}
      <div className="w-full flex justify-center pt-4">
        <AdBanner
          adKey={AD_KEYS.MULTI_PLACEMENT_BANNER}
          slotType="multiPlacement"
          width={320}
          height={50}
          label={true}
          className="bg-white shadow-2xs"
        />
      </div>
    </div>
  );
};
