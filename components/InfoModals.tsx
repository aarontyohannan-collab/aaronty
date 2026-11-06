'use client';

import React, { useState } from 'react';
import {
  X,
  HelpCircle,
  Shield,
  FileText,
  MapPin,
  Phone,
  Mail,
  Clock,
  Building,
  CheckCircle,
} from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FAQModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!isOpen) return null;

  const faqs = [
    {
      q: 'What should I do immediately after finding an item on campus?',
      a: 'Report it right away through CampusFind by clicking "Report a Found Item". If the item is high-value (laptop, wallet, keys, phone), drop it off at the nearest official collection point (Central Security Office Rm 104 or Library Helpdesk) and select that as the custody location.',
    },
    {
      q: 'How does ownership verification work to prevent false claims?',
      a: 'When someone clicks "Claim This Item", they must provide private identifying proof not shown in the public listing. For example: serial numbers, phone wallpaper descriptions, lockscreen patterns, or distinctive stickers. The finder or campus security officer verifies these before approving the claim.',
    },
    {
      q: 'Will my personal phone number or email be visible to the public?',
      a: 'No! CampusFind strictly protects your privacy. Your personal phone and email are never exposed publicly on item cards. Claimants submit inquiries through our secure portal, and notifications are sent to your dashboard.',
    },
    {
      q: 'How long are found items kept at the campus security office?',
      a: 'Standard property is held for 90 days. Unclaimed government/state IDs or bank cards are safely disposed of according to university security regulations after 60 days.',
    },
    {
      q: 'Can students who lost an item print a poster for physical noticeboards?',
      a: 'Yes! On any item details page, click the printer icon to generate an official printable campus notice poster with a reference code to pin on campus bulletin boards.',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6">
        <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-sky-600" />
            <h3 className="font-bold text-slate-900 text-base sm:text-lg">Frequently Asked Questions</h3>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-700 rounded-xl">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 max-h-[75vh] overflow-y-auto space-y-3">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border border-slate-200 rounded-2xl overflow-hidden transition-colors">
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full px-5 py-4 text-left font-bold text-slate-900 text-sm flex items-center justify-between bg-slate-50/50 hover:bg-slate-100/60 transition-colors"
              >
                <span>{faq.q}</span>
                <span className="text-slate-400 text-lg font-mono ml-2">
                  {openIndex === idx ? '−' : '+'}
                </span>
              </button>
              {openIndex === idx && (
                <div className="px-5 py-4 text-xs sm:text-sm text-slate-600 leading-relaxed bg-white border-t border-slate-100">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const PrivacyModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6">
        <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-emerald-600" />
            <h3 className="font-bold text-slate-900 text-base">CampusFind Privacy Policy</h3>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-700 rounded-xl">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 max-h-[75vh] overflow-y-auto text-xs sm:text-sm text-slate-600 space-y-4 leading-relaxed">
          <p>
            CampusFind is dedicated to safeguarding student and staff privacy across the university network.
          </p>
          <h4 className="font-bold text-slate-900">1. Contact Information Privacy</h4>
          <p>
            We do not disclose personal phone numbers or direct personal addresses publicly. All initial inquiries and claims are filtered through the platform&apos;s verified verification workflow.
          </p>
          <h4 className="font-bold text-slate-900">2. College Email Verification</h4>
          <p>
            Users are required to submit and verify college-affiliated credentials to protect against spam bots, impersonation, and fraudulent claims.
          </p>
          <h4 className="font-bold text-slate-900">3. Proof and Verification Data</h4>
          <p>
            Confidential identifying details (such as wallpaper descriptions or partial serial numbers) submitted during a claim are shared only with the designated finder or campus security officers responsible for validating ownership.
          </p>
        </div>
      </div>
    </div>
  );
};

export const TermsModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6">
        <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-navy-950" />
            <h3 className="font-bold text-slate-900 text-base">Terms &amp; University Regulations</h3>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-700 rounded-xl">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 max-h-[75vh] overflow-y-auto text-xs sm:text-sm text-slate-600 space-y-4 leading-relaxed">
          <h4 className="font-bold text-slate-900">1. Good Faith Reporting</h4>
          <p>
            All users agree to submit accurate, truthful, and lawful information. False claims of ownership constitute a violation of the Student Code of Conduct and will be referred to the Dean of Students.
          </p>
          <h4 className="font-bold text-slate-900">2. Prohibited Items</h4>
          <p>
            Weapons, illegal substances, and hazardous materials cannot be listed on CampusFind. If discovered, report immediately to Campus Police Dispatch.
          </p>
          <h4 className="font-bold text-slate-900">3. Unclaimed Property Protocol</h4>
          <p>
            Property stored at Campus Security will be safely logged according to university retention schedules. Items remaining unclaimed after 90 days may be recycled or donated to university charities.
          </p>
        </div>
      </div>
    </div>
  );
};

