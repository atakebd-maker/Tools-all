import React from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';

interface TermsProps {
  onNavigateHome: () => void;
}

export const Terms: React.FC<TermsProps> = ({ onNavigateHome }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs
        items={[
          { label: 'Home', onClick: onNavigateHome },
          { label: 'Terms and Conditions' }
        ]}
      />

      <div className="space-y-3">
        <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
          Legal Agreement
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Terms & Conditions
        </h1>
        <p className="text-slate-500 text-xs">
          Effective Date: {new Date().getFullYear()}
        </p>
      </div>

      <div className="prose prose-slate max-w-none text-sm text-slate-600 space-y-6 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">1. Acceptance of Terms</h2>
          <p>
            By accessing and using Zynovexa, you acknowledge and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please discontinue use of the website immediately.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">2. Description of Service</h2>
          <p>
            Zynovexa provides an online suite of browser-native software utilities for image editing, PDF handling, unit conversion, mathematical calculations, and developer tasks. The service is provided entirely free of charge for personal and commercial productivity.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">3. Disclaimer of Warranties</h2>
          <p>
            Zynovexa is provided on an "AS IS" and "AS AVAILABLE" basis without warranties of any kind, whether express or implied. While we strive for mathematical precision and reliable processing across all tools:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li>Financial and loan calculations are educational estimates and should not be treated as formal fiscal advice.</li>
            <li>Health tools (such as the BMI calculator) are general screening references and are not clinical diagnoses.</li>
            <li>Users are solely responsible for verifying critical mathematical results and maintaining local backups of their files.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">4. Limitation of Liability</h2>
          <p>
            Under no circumstances shall Zynovexa or its maintainers be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use the tools or services.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">5. Acceptable Use</h2>
          <p>
            You agree not to use the tools for unlawful activities, or attempt to disrupt the operation or delivery of the application.
          </p>
        </section>
      </div>
    </div>
  );
};
