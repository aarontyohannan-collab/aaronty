'use client';

import React from 'react';
import { Truck, ShieldCheck, RefreshCw, Headphones } from 'lucide-react';

const features = [
  {
    icon: Truck,
    title: 'Free Express Shipping',
    description: 'On all orders over $150. Fully insured global air freight with live parcel tracking.'
  },
  {
    icon: RefreshCw,
    title: '30-Day Risk-Free Trial',
    description: 'Experience your gear in comfort. Easy, no-questions-asked prepaid returns within 30 days.'
  },
  {
    icon: ShieldCheck,
    title: '2-Year Direct Warranty',
    description: 'Every product comes backed with our comprehensive bumper-to-bumper replacement plan.'
  },
  {
    icon: Headphones,
    title: '24/7 Expert Audio Support',
    description: 'Direct access to acoustic specialists and tech advisors whenever you need setup assistance.'
  }
];

export default function Features() {
  return (
    <section className="py-12 border-y border-navy-800/80 bg-navy-950/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="flex items-start gap-4 p-5 rounded-2xl bg-navy-900/50 border border-navy-800/80 hover:border-blue-500/30 hover:bg-navy-850/60 transition-all duration-300 group"
              >
                <div className="p-3 rounded-xl bg-blue-600/10 text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors">
                    {feature.title}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
