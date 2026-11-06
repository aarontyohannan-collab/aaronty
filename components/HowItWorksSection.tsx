'use client';

import React from 'react';
import Link from 'next/link';
import {
  FileEdit,
  Search,
  ShieldCheck,
  ArrowRight,
  Lock,
  Building2,
  CheckCircle,
} from 'lucide-react';

export default function HowItWorksSection() {
  const steps = [
    {
      step: '01',
      title: 'Report',
      subtitle: 'Submit Information',
      description:
        'Submit clear details of the item you lost or found on campus. Include location, category, date, and distinguishing marks.',
      icon: FileEdit,
      color: 'bg-blue-50 text-navy-950 border-blue-200',
      badge: 'Step 1',
    },
    {
      step: '02',
      title: 'Discover',
      subtitle: 'Browse & Match',
      description:
        'Browse the centralized campus listings using category & location filters. Our smart engine flags matching items automatically.',
      icon: Search,
      color: 'bg-sky-50 text-sky-600 border-sky-200',
      badge: 'Step 2',
    },
    {
      step: '03',
      title: 'Recover',
      subtitle: 'Verify & Collect',
      description:
        'Submit a verified ownership claim with non-public identifying details. Meet safely at the Campus Security or Library Desk for collection.',
      icon: ShieldCheck,
      color: 'bg-emerald-50 text-emerald-600 border-emerald-200',
      badge: 'Step 3',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-50 text-navy-950 text-xs font-bold uppercase tracking-wider mb-3">
            <span>Simple 3-Step Process</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-950 font-poppins tracking-tight mb-4">
            How CampusFind Works
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Reuniting college members with their lost valuables through a secure, transparent, and campus-verified workflow.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector Line for desktop */}
          <div className="hidden md:block absolute top-1/2 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-navy-200 via-sky-300 to-emerald-300 -translate-y-12 z-0" />

          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="relative z-10 bg-white rounded-3xl p-8 border border-slate-200/90 shadow-soft hover:shadow-card hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-extrabold text-slate-300 font-poppins">
                      {item.step}
                    </span>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                      {item.badge}
                    </span>
                  </div>

                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border mb-6 ${item.color} shadow-sm`}>
                    <Icon className="w-7 h-7" />
                  </div>

                  <h3 className="text-xl font-bold text-navy-950 font-poppins mb-1">
                    {item.title}
                  </h3>
                  <div className="text-xs font-bold text-sky-600 uppercase tracking-wider mb-3">
                    {item.subtitle}
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center text-xs font-semibold text-slate-500">
                  <CheckCircle className="w-4 h-4 text-emerald-600 mr-1.5" />
                  <span>College Staff &amp; Student Verified</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Security & Verification Callout */}
        <div className="mt-14 bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white rounded-2xl shadow-sm border border-slate-200 text-navy-950">
                <Lock className="w-6 h-6 text-sky-600" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-1">Privacy Protected</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Finder phone numbers &amp; emails are shielded from public view. All communication happens through secure claim review.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-white rounded-2xl shadow-sm border border-slate-200 text-navy-950">
                <Building2 className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-1">Central Handover Desks</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Items can be turned in safely at Central Library Helpdesk or Campus Security Office Rm 104 with an official receipt.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-white rounded-2xl shadow-sm border border-slate-200 text-navy-950">
                <ShieldCheck className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-1">Ownership Secret Proof</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Claimants must specify confidential details (lock screen, markings, internal contents) before an item is released.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

