'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Compass,
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  Building2,
  ExternalLink,
  Heart,
} from 'lucide-react';
import { FAQModal, PrivacyModal, TermsModal } from './InfoModals';

export default function Footer() {
  const [showFAQ, setShowFAQ] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  return (
    <>
      <footer className="bg-navy-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
            {/* Column 1 & 2: About CampusFind */}
            <div className="lg:col-span-2">
              <Link href="/" className="flex items-center gap-3 mb-4 group">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-sky-400 group-hover:scale-105 transition-transform">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xl font-bold text-white font-poppins tracking-tight">
                    Campus<span className="text-sky-400">Find</span>
                  </span>
                  <span className="block text-[11px] text-sky-200">
                    College Lost &amp; Found Portal
                  </span>
                </div>
              </Link>

              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6 max-w-sm">
                The centralized digital network connecting students, faculty, and security personnel across campus to report, find, and safely recover lost property.
              </p>

              <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 rounded-xl px-3.5 py-2.5 max-w-sm">
                <ShieldCheck className="w-4 h-4 flex-shrink-0" />
                <span>Operating in partnership with University Campus Security</span>
              </div>
            </div>

            {/* Column 3: Quick Navigation */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
                Quick Navigation
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm">
                <li>
                  <Link href="/" className="text-slate-400 hover:text-sky-400 transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/browse" className="text-slate-400 hover:text-sky-400 transition-colors">
                    Browse All Items
                  </Link>
                </li>
                <li>
                  <Link href="/report-found" className="text-slate-400 hover:text-emerald-400 transition-colors font-medium">
                    Report a Found Item
                  </Link>
                </li>
                <li>
                  <Link href="/report-lost" className="text-slate-400 hover:text-sky-400 transition-colors">
                    Report a Lost Item
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="text-slate-400 hover:text-sky-400 transition-colors">
                    My Claims &amp; Reports
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Help & Policies */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
                Support &amp; Policies
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm">
                <li>
                  <button
                    onClick={() => setShowFAQ(true)}
                    className="text-slate-400 hover:text-sky-400 transition-colors text-left"
                  >
                    Frequently Asked Questions
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setShowPrivacy(true)}
                    className="text-slate-400 hover:text-sky-400 transition-colors text-left"
                  >
                    Privacy &amp; Data Protection
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setShowTerms(true)}
                    className="text-slate-400 hover:text-sky-400 transition-colors text-left"
                  >
                    Terms &amp; College Rules
                  </button>
                </li>
                <li>
                  <Link href="/#how-it-works" className="text-slate-400 hover:text-sky-400 transition-colors">
                    3-Step Recovery Workflow
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 5: Campus Administration Contact */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
                Campus Security Desk
              </h4>
              <div className="space-y-3 text-xs text-slate-400">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                  <span>
                    Admin Block Room 104, Main Quadrangle (Ground Floor)
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>+1 (555) 911-CAMPUS (Ext 402)</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-sky-400 flex-shrink-0" />
                  <span>lostandfound@campus.edu</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span>Mon - Fri: 8:00 AM - 6:00 PM</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>
              &copy; {new Date().getFullYear()} CampusFind – College Lost &amp; Found Portal. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <span>Made for University Students &amp; Faculty</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Interactive Modals */}
      <FAQModal isOpen={showFAQ} onClose={() => setShowFAQ(false)} />
      <PrivacyModal isOpen={showPrivacy} onClose={() => setShowPrivacy(false)} />
      <TermsModal isOpen={showTerms} onClose={() => setShowTerms(false)} />
    </>
  );
}

