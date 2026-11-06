'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { formatDate } from '@/lib/utils';
import {
  X,
  Printer,
  Compass,
  QrCode,
  ShieldCheck,
  Building2,
  Calendar,
  MapPin,
} from 'lucide-react';

export default function PosterModal() {
  const { selectedItemForPoster, closePosterModal } = useApp();

  if (!selectedItemForPoster) return null;

  const item = selectedItemForPoster;
  const isFound = item.type === 'found';

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6">
        {/* Controls Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-b border-slate-200 print:hidden">
          <div className="flex items-center gap-2">
            <Printer className="w-5 h-5 text-navy-950" />
            <h3 className="font-bold text-slate-900 text-sm sm:text-base">
              Campus Notice Flyer &amp; QR Tag
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-navy-950 hover:bg-navy-900 text-white font-semibold text-xs rounded-xl shadow transition-all flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Poster</span>
            </button>
            <button
              onClick={closePosterModal}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-xl transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Poster Area */}
        <div id="printable-poster" className="p-8 bg-white max-h-[80vh] overflow-y-auto">
          <div className="border-4 border-navy-950 rounded-2xl p-6 sm:p-8 text-center relative">
            {/* Header */}
            <div className="flex items-center justify-center gap-2 mb-2">
              <Compass className="w-6 h-6 text-navy-950" />
              <span className="font-poppins font-extrabold text-xs sm:text-sm tracking-widest uppercase text-navy-950">
                Official University Campus Notice
              </span>
            </div>

            <div
              className={`inline-block px-8 py-2 rounded-xl text-xl sm:text-2xl font-black uppercase tracking-wider mb-4 ${
                isFound
                  ? 'bg-emerald-600 text-white'
                  : 'bg-navy-950 text-white'
              }`}
            >
              {isFound ? 'PROPERTY FOUND' : 'LOST PROPERTY'}
            </div>

            {/* Reference ID Pill */}
            <div className="text-xs font-mono font-bold text-slate-600 mb-6">
              Official Reference ID: <span className="text-navy-950 text-sm font-black underline">{item.id}</span>
            </div>

            {/* Photo */}
            <div className="w-52 h-44 sm:w-64 sm:h-52 mx-auto rounded-xl overflow-hidden border-2 border-slate-300 shadow-sm bg-slate-100 mb-5">
              <img
                src={
                  item.images?.[0] ||
                  'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?w=800&auto=format&fit=crop&q=80'
                }
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Title */}
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-950 font-poppins mb-2">
              {item.name}
            </h2>

            {/* Key Specs */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-slate-700 mb-4">
              <span className="bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                Category: {item.category}
              </span>
              <span className="bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                Location: {item.location}
              </span>
              <span className="bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                Date: {formatDate(item.date)}
              </span>
            </div>

            {/* Description */}
            <p className="text-sm text-slate-800 leading-relaxed max-w-lg mx-auto mb-6 bg-slate-50 p-4 rounded-xl border border-slate-200 text-left">
              {item.description}
            </p>

            {/* Handover & Recovery Instructions */}
            <div className="border-t-2 border-dashed border-slate-300 pt-5 mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <div className="flex items-center gap-1.5 font-bold text-xs text-navy-950 mb-1">
                  <Building2 className="w-4 h-4 text-sky-600" />
                  <span>Collection &amp; Custody Desk:</span>
                </div>
                <p className="text-xs text-slate-600 leading-normal">
                  {item.custodyLocation || 'Campus Safety & Security Office, Admin Block Rm 104 (Mon-Fri 8am-6pm)'}
                </p>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 flex items-center gap-3">
                <div className="w-14 h-14 bg-white border border-slate-300 rounded-lg flex items-center justify-center flex-shrink-0">
                  <QrCode className="w-10 h-10 text-slate-800" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-navy-950">
                    Scan via Campus Portal
                  </div>
                  <div className="text-[10px] text-slate-500 leading-tight">
                    Visit campusfind.edu or scan code to submit verified ownership proof.
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 text-[10px] text-slate-400">
              Campus Safety Verification Notice • Reference: {item.id} • Printed on {new Date().toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

