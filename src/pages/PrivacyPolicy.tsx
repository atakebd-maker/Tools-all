import React from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ShieldCheck, Check } from 'lucide-react';

interface PrivacyPolicyProps {
  onNavigateHome: () => void;
}

export const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onNavigateHome }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs
        items={[
          { label: 'Home', onClick: onNavigateHome },
          { label: 'Privacy Policy' }
        ]}
      />

      <div className="space-y-3">
        <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
          Privacy First
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-slate-500 text-xs">
          Last Updated: {new Date().getFullYear()}
        </p>
      </div>

      <div className="prose prose-slate max-w-none text-sm text-slate-600 space-y-6 leading-relaxed">
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3 text-emerald-800">
          <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
          <p className="m-0 font-medium">
            Summary: Zynovexa processes your files, images, PDF documents, and text strings strictly inside your browser. No files are transmitted to any server or cloud database.
          </p>
        </div>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">1. Information We Do Not Collect</h2>
          <p>
            Unlike conventional online converters and calculation websites, Zynovexa does not maintain an application backend server, cloud storage bucket, or user database. Specifically:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li>We do not collect or store your uploaded photos, images, or graphics.</li>
            <li>We do not collect or read your uploaded PDF documents or converted text.</li>
            <li>We do not ask for, store, or transmit your passwords, names, or financial calculations.</li>
            <li>We do not employ third-party tracking scripts or user fingerprinting technologies.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">2. How Local Processing Works</h2>
          <p>
            When you use a tool on Zynovexa (for example, resizing an image or merging PDF files), your browser loads our static JavaScript application code. All operations are executed locally using native browser APIs such as HTML5 Canvas, Web Cryptography, and local in-memory buffers. Once you close your browser tab, all temporary data in memory is immediately cleared.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">3. Cookies and Local Storage</h2>
          <p>
            Zynovexa does not use tracking cookies or persistent advertising identifiers. If benign browser local storage is utilized, it is strictly restricted to saving your interface theme or session preferences locally on your own machine.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">4. Third-Party Hosting</h2>
          <p>
            The website is deployed as a static web application via standard content delivery networks (e.g. Vercel). Standard web server access logs (such as IP addresses and browser user-agent headers) may be recorded by the hosting infrastructure solely for security and DDoS mitigation purposes.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">5. Updates to this Policy</h2>
          <p>
            Any future revisions to our privacy practices will be documented on this page. Our foundational commitment to client-side data privacy remains unconditional.
          </p>
        </section>
      </div>
    </div>
  );
};
