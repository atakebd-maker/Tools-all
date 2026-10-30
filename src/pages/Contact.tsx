import React, { useState, useEffect } from 'react';
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
  AtSign,
  Smartphone,
  Laptop
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
  const [preparedAndroidIntent, setPreparedAndroidIntent] = useState<string>('');
  const [preparedIosGmailUrl, setPreparedIosGmailUrl] = useState<string>('');
  const [formattedMessagePreview, setFormattedMessagePreview] = useState<string>('');
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);
  const [copiedBody, setCopiedBody] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    // Detect mobile device
    const checkMobile = () => {
      const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : '';
      const mobileRegex = /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i;
      const isTouch = typeof window !== 'undefined' && 'ontouchstart' in window;
      const isNarrow = typeof window !== 'undefined' && window.innerWidth <= 768;
      setIsMobile(mobileRegex.test(userAgent) || (isTouch && isNarrow));
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const isAndroidDevice = () => {
    if (typeof navigator === 'undefined') return false;
    return /Android/i.test(navigator.userAgent);
  };

  const isIOSDevice = () => {
    if (typeof navigator === 'undefined') return false;
    return /iPhone|iPad|iPod/i.test(navigator.userAgent);
  };

  // Formats the message cleanly and generates both Gmail web URL & mobile App URLs
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

    // 1. Gmail Web Compose URL (for desktop / browser)
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
      TARGET_EMAIL
    )}&su=${encodeURIComponent(effectiveSubject)}&body=${encodeURIComponent(
      formattedBody
    )}`;

    // 2. Standard RFC mailto URL (triggers default email app, including Gmail on mobile)
    const mailtoUrl = `mailto:${encodeURIComponent(
      TARGET_EMAIL
    )}?subject=${encodeURIComponent(effectiveSubject)}&body=${encodeURIComponent(
      formattedBody
    )}`;

    // 3. Android Intent targeting Gmail app specifically
    const androidIntent = `intent://co?to=${encodeURIComponent(
      TARGET_EMAIL
    )}&subject=${encodeURIComponent(effectiveSubject)}&body=${encodeURIComponent(
      formattedBody
    )}#Intent;scheme=googlegmail;package=com.google.android.gm;end`;

    // 4. iOS Gmail app deep-link scheme
    const iosGmailUrl = `googlegmail:///co?to=${encodeURIComponent(
      TARGET_EMAIL
    )}&subject=${encodeURIComponent(effectiveSubject)}&body=${encodeURIComponent(
      formattedBody
    )}`;

    return {
      gmailUrl,
      mailtoUrl,
      androidIntent,
      iosGmailUrl,
      formattedBody,
      effectiveSubject
    };
  };

  /**
   * Intelligently launches the Gmail app on mobile or Gmail web on computer
   */
  const triggerEmailClient = (
    mode: 'auto' | 'mobile_app' | 'web' | 'mailto',
    urls?: {
      gmailUrl: string;
      mailtoUrl: string;
      androidIntent: string;
      iosGmailUrl: string;
    }
  ) => {
    const activeUrls = urls || {
      gmailUrl: preparedGmailUrl,
      mailtoUrl: preparedMailtoUrl,
      androidIntent: preparedAndroidIntent,
      iosGmailUrl: preparedIosGmailUrl
    };

    if (mode === 'web') {
      window.open(activeUrls.gmailUrl, '_blank', 'noopener,noreferrer');
      return;
    }

    if (mode === 'mailto') {
      window.location.href = activeUrls.mailtoUrl;
      return;
    }

    // Mobile specific launcher
    if (mode === 'mobile_app' || (mode === 'auto' && isMobile)) {
      if (isAndroidDevice()) {
        // Try Android Gmail Intent first
        try {
          const link = document.createElement('a');
          link.href = activeUrls.androidIntent;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

          // Fallback to standard mailto if intent doesn't trigger within 400ms
          setTimeout(() => {
            window.location.href = activeUrls.mailtoUrl;
          }, 450);
        } catch {
          window.location.href = activeUrls.mailtoUrl;
        }
      } else if (isIOSDevice()) {
        // Try iOS Gmail Scheme first
        window.location.href = activeUrls.iosGmailUrl;
        setTimeout(() => {
          window.location.href = activeUrls.mailtoUrl;
        }, 450);
      } else {
        // General mobile: standard mailto universally launches mobile default mail/Gmail
        window.location.href = activeUrls.mailtoUrl;
      }
      return;
    }

    // Default Desktop / Computer: open Gmail web in a new tab
    try {
      const newWin = window.open(activeUrls.gmailUrl, '_blank', 'noopener,noreferrer');
      if (!newWin || newWin.closed || typeof newWin.closed === 'undefined') {
        // Popup was blocked, redirect fallback
        window.location.href = activeUrls.mailtoUrl;
      }
    } catch {
      window.location.href = activeUrls.mailtoUrl;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    const urls = generateMailUrls();

    setPreparedGmailUrl(urls.gmailUrl);
    setPreparedMailtoUrl(urls.mailtoUrl);
    setPreparedAndroidIntent(urls.androidIntent);
    setPreparedIosGmailUrl(urls.iosGmailUrl);
    setFormattedMessagePreview(urls.formattedBody);
    setSubmitted(true);

    // Auto-launch the relevant client (Mobile Gmail App on mobile, Gmail Web on computer)
    triggerEmailClient('auto', urls);
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
          মোবাইলে থাকলে সরাসরি <strong>Gmail App</strong> ওপেন হবে এবং কম্পিউটারে থাকলে <strong>Gmail Web</strong> ওপেন হবে। প্রাপকের ঘরে <strong className="text-blue-700">{TARGET_EMAIL}</strong> এবং আপনার সব মেসেজ তথ্য স্বয়ংক্রিয়ভাবে বসে যাবে, আপনি শুধু <strong>Send</strong> করবেন!
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
          <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-2xs space-y-3">
            <div className="flex items-center gap-2 text-blue-600 font-bold text-sm">
              <MessageSquare className="w-4 h-4" />
              <span>মোবাইল ও কম্পিউটারে কীভাবে কাজ করে?</span>
            </div>
            <ul className="text-slate-600 text-xs space-y-2 leading-relaxed">
              <li className="flex items-start gap-1.5">
                <Smartphone className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span><strong>মোবাইল (Android/iPhone):</strong> বাটনে চাপ দিলে সরাসরি ফোনের জিমেইল অ্যাপ ওপেন হবে এবং To, Subject, Body সবকিছু রেডি থাকবে।</span>
              </li>
              <li className="flex items-start gap-1.5">
                <Laptop className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <span><strong>কম্পিউটার (PC/Laptop):</strong> নতুন ট্যাবে জিমেইল কম্পোজ পেজ ওপেন হবে এবং তথ্যগুলো সুন্দর ফরম্যাটে বসে যাবে।</span>
              </li>
            </ul>
          </div>

          <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2 text-xs text-slate-600">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>100% Privacy Guarantee</span>
            </div>
            <p className="leading-relaxed">
              আপনার কোনো ডেটা আমাদের সার্ভারে সংরক্ষণ হয় না। মেসেজ সরাসরি আপনার ব্যক্তিগত ইমেইল থেকে আমাদের অফিশিয়াল ইনবক্সে পৌঁছে যাবে।
            </p>
          </div>

          <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-2 text-xs text-slate-600 shadow-2xs">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>জরুরি বিষয়সমূহ</span>
            </div>
            <ul className="space-y-1.5 list-disc list-inside text-slate-600">
              <li>নতুন ক্যালকুলেটর বা টুল যুক্ত করার অনুরোধ</li>
              <li>টুলের ফলাফলে কোনো সংশোধন প্রয়োজন হলে</li>
              <li>PDF এবং ইমেজ টুলের কোনো ফিচার প্রস্তাব</li>
              <li>যেকোনো মতামত ও শুভেচ্ছা বার্তা</li>
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
                  মেসেজ জিমেইলে যাওয়ার জন্য প্রস্তুত!
                </h2>
                <p className="text-slate-700 text-sm max-w-md mx-auto leading-relaxed">
                  প্রাপকের ঠিকানা হিসেবে <strong className="text-blue-700 font-mono bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200">{TARGET_EMAIL}</strong> এবং আপনার তথ্যগুলো ফরম্যাট করা হয়েছে। নিচে ক্লিক করে সেন্ড করুন:
                </p>
              </div>

              {/* Action Buttons to Open Gmail or Mail app */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                {/* Mobile Specific Button: Launches Gmail App */}
                <button
                  type="button"
                  onClick={() => triggerEmailClient('mobile_app')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm transition-all shadow-md hover:shadow-blue-600/20 cursor-pointer"
                >
                  <Smartphone className="w-4 h-4" />
                  <span>মোবাইলে জিমেইল অ্যাপে ওপেন করুন</span>
                </button>

                {/* Desktop Specific Button: Launches Gmail Web in Browser */}
                <button
                  type="button"
                  onClick={() => triggerEmailClient('web')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-white hover:bg-slate-50 text-slate-800 font-semibold rounded-xl text-sm border border-slate-300 transition-colors shadow-2xs cursor-pointer"
                >
                  <Laptop className="w-4 h-4 text-blue-600" />
                  <span>কম্পিউটারে Gmail Web-এ ওপেন করুন</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </button>
              </div>

              {/* Formatted Message Preview Box */}
              <div className="bg-white border border-emerald-200/90 rounded-xl p-4 sm:p-5 shadow-2xs space-y-3">
                <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    জিমেইলে যেভাবে মেসেজটি সাজানো হয়েছে:
                  </span>
                  <button
                    type="button"
                    onClick={copyBodyToClipboard}
                    className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-semibold cursor-pointer"
                  >
                    {copiedBody ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700 font-medium">কপি হয়েছে!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-400" />
                        <span>মেসেজ কপি করুন</span>
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
                  মেসেজ পরিবর্তন বা আবার নতুন মেসেজ লিখতে চান? এখানে ক্লিক করুন
                </button>
              </div>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="p-6 sm:p-8 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-5"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-slate-900">মেসেজ পাঠান</h2>
                  <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                    {isMobile ? '📱 Mobile Device' : '💻 Computer / Desktop'}
                  </span>
                </div>
                <span className="text-xs text-slate-500">
                  প্রাপক: <strong className="text-blue-700 font-mono">{TARGET_EMAIL}</strong>
                </span>
              </div>

              {/* Name and Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    আপনার নাম (Your Name) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="যেমন: মোঃ সাকিব হাসান"
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    আপনার ইমেইল (Your Email) <span className="text-rose-500">*</span>
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
                  ক্যাটাগরি বা বিষয় (Topic)
                </label>
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-900 bg-white focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-none transition-all cursor-pointer"
                >
                  <option value="General Feedback or Suggestion">সাধারণ মতামত ও পরামর্শ</option>
                  <option value="Tool Suggestion / Request">নতুন ক্যালকুলেটর বা টুল যুক্ত করার অনুরোধ</option>
                  <option value="Calculator Tools">ক্যালকুলেটর ও গণিত টুলস</option>
                  <option value="PDF Tools">পিডিএফ টুলস (Merger, Splitter ইত্যাদি)</option>
                  <option value="Image Tools">ইমেজ টুলস (Resizer, Compressor ইত্যাদি)</option>
                  <option value="Developer Tools">ডেভেলপার ও কোড টুলস</option>
                  <option value="Bug Report">ত্রুটি বা টেকনিক্যাল সমস্যা রিপোর্ট</option>
                  <option value="Partnership / Other">অন্যান্য যোগাযোগ</option>
                </select>
              </div>

              {/* Custom Subject (Optional) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  ইমেইলের সাবজেক্ট (Subject Line) <span className="text-slate-400 font-normal lowercase">(ঐচ্ছিক)</span>
                </label>
                <input
                  type="text"
                  value={customSubject}
                  onChange={(e) => setCustomSubject(e.target.value)}
                  placeholder="যেমন: অনুগ্রহ করে বয়সের ব্যবধান নির্ণায়ক ক্যালকুলেটর যোগ করুন"
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-none transition-all"
                />
              </div>

              {/* Message Area */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  আপনার মেসেজ (Your Message) <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={5}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="এখানে বিস্তারিতভাবে আপনার বক্তব্য লিখুন। সেন্ড বাটনে ক্লিক করলেই জিমেইলের কম্পোজ বক্সে এটি সুন্দরভাবে সাজানো থাকবে..."
                  className="w-full p-3.5 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-none transition-all leading-relaxed"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-7 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-blue-600/20 transition-all"
                >
                  {isMobile ? (
                    <>
                      <Smartphone className="w-4 h-4" />
                      <span>জিমেইল অ্যাপে মেসেজ পাঠান ({TARGET_EMAIL})</span>
                    </>
                  ) : (
                    <>
                      <Mail className="w-4 h-4" />
                      <span>জিমেইলে মেসেজ পাঠান ({TARGET_EMAIL})</span>
                    </>
                  )}
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>
                <p className="text-xs text-slate-500 mt-2">
                  {isMobile
                    ? `📱 মোবাইলে ক্লিক করলে সরাসরি আপনার Gmail App চালু হবে এবং প্রাপক ${TARGET_EMAIL} ও আপনার মেসেজ স্বয়ংক্রিয়ভাবে বসে যাবে।`
                    : `💻 কম্পিউটারে ক্লিক করলে ব্রাউজারে Gmail খুলে যাবে এবং প্রাপক ${TARGET_EMAIL} ও মেসেজ স্বয়ংক্রিয়ভাবে বসে যাবে।`}
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
