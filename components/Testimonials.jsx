'use client';

import React from 'react';
import { reviews } from '../data/products';
import { Star, CheckCircle, Quote } from 'lucide-react';

export default function Testimonials() {
  return (
    <section className="py-20 bg-navy-950 border-t border-navy-855 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-cyan-300 text-xs font-semibold mb-3">
            <span>Verified Customer Stories</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Trusted by Creators Worldwide
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            Read what designers, audio engineers, and tech founders say after experiencing AETHER.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-3xl bg-navy-900/70 border border-navy-800 hover:border-blue-500/40 hover:bg-navy-850/70 transition-all duration-300 flex flex-col justify-between relative group"
            >
              <Quote className="w-8 h-8 text-blue-500/20 absolute top-6 right-6 pointer-events-none group-hover:text-blue-500/40 transition-colors" />

              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                  <span className="text-xs font-semibold text-slate-400 ml-2">{rev.date}</span>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed mb-6 italic">
                  "{rev.content}"
                </p>
              </div>

              <div className="pt-4 border-t border-navy-800/80 flex items-center gap-3">
                <img
                  src={rev.avatar}
                  alt={rev.name}
                  className="w-10 h-10 rounded-full object-cover border border-blue-500/30"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-sm font-bold text-white truncate">{rev.name}</h4>
                    <CheckCircle className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  </div>
                  <p className="text-xs text-slate-400 truncate">{rev.role}</p>
                  <p className="text-[11px] text-cyan-400 font-medium truncate mt-0.5">
                    Purchased: {rev.product}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
