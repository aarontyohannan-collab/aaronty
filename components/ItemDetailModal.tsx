'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { CategoryBadge, StatusBadge } from './CategoryBadge';
import { formatDate, formatTime } from '@/lib/utils';
import {
  X,
  MapPin,
  Calendar,
  Clock,
  ShieldCheck,
  Share2,
  Printer,
  Copy,
  Check,
  Lock,
  Tag,
  Building2,
  FileCheck2,
  HelpCircle,
  Eye,
  AlertTriangle,
} from 'lucide-react';

export default function ItemDetailModal() {
  const {
    selectedItemForDetail,
    closeItemDetail,
    openClaimModal,
    openPosterModal,
    currentUser,
  } = useApp();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [copiedId, setCopiedId] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);

  if (!selectedItemForDetail) return null;

  const item = selectedItemForDetail;
  const isFound = item.type === 'found';
  const images =
    item.images && item.images.length > 0
      ? item.images
      : ['https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?w=800&auto=format&fit=crop&q=80'];

  const handleCopyId = () => {
    navigator.clipboard.writeText(item.id);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${item.name} | CampusFind`,
        text: `Campus Lost & Found Report: ${item.name} (${item.id})`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`${window.location.origin}/browse?q=${item.id}`);
      setShareSuccess(true);
      setTimeout(() => setShareSuccess(false), 2000);
    }
  };

  const isReporter = currentUser && currentUser.email.toLowerCase() === item.reporter.email.toLowerCase();

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-b border-slate-200">
          <div className="flex items-center gap-2.5">
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                isFound
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-navy-950 text-white'
              }`}
            >
              {isFound ? 'Found Property' : 'Lost Property'}
            </span>
            <div className="flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-lg border border-slate-200 text-xs font-mono font-bold text-slate-700">
              <span>{item.id}</span>
              <button
                onClick={handleCopyId}
                className="text-slate-400 hover:text-navy-950 transition-colors ml-1"
                title="Copy Reference ID"
              >
                {copiedId ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
            {copiedId && (
              <span className="text-[11px] font-semibold text-emerald-600 animate-in fade-in">
                Copied!
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => openPosterModal(item)}
              className="p-2 text-slate-500 hover:text-navy-950 hover:bg-slate-200/60 rounded-xl transition-colors"
              title="Print Campus Notice / Flyer"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={handleShare}
              className="p-2 text-slate-500 hover:text-navy-950 hover:bg-slate-200/60 rounded-xl transition-colors"
              title="Share Link"
            >
              {shareSuccess ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
            </button>
            <button
              onClick={closeItemDetail}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-xl transition-colors"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scroll Content */}
        <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto">
          {/* Main Title & Status */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <CategoryBadge category={item.category} size="md" />
                <StatusBadge status={item.status} type={item.type} />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-navy-950 font-poppins">
                {item.name}
              </h2>
            </div>
          </div>

          {/* Photo Gallery */}
          <div className="mb-6">
            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-slate-900 shadow-md">
              <img
                src={images[activeImageIndex]}
                alt={item.name}
                className="w-full h-full object-contain"
              />
            </div>
            {/* Thumbnails if multiple */}
            {images.length > 1 && (
              <div className="flex items-center gap-2 mt-3 overflow-x-auto pb-1">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all ${
                      activeImageIndex === idx
                        ? 'border-sky-500 shadow-md scale-105'
                        : 'border-slate-200 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Key Item Specs Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200/80 mb-6 text-xs">
            <div>
              <span className="text-slate-400 block font-medium">Campus Location</span>
              <span className="font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-rose-500 flex-shrink-0" />
                <span className="truncate">
                  {item.location}
                  {item.customLocation ? ` (${item.customLocation})` : ''}
                </span>
              </span>
            </div>

            <div>
              <span className="text-slate-400 block font-medium">Date {isFound ? 'Found' : 'Lost'}</span>
              <span className="font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                <Calendar className="w-3.5 h-3.5 text-sky-500" />
                <span>{formatDate(item.date)}</span>
              </span>
            </div>

            <div>
              <span className="text-slate-400 block font-medium">Approx. Time</span>
              <span className="font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                <Clock className="w-3.5 h-3.5 text-amber-500" />
                <span>{formatTime(item.approximateTime) || 'Not specified'}</span>
              </span>
            </div>

            <div>
              <span className="text-slate-400 block font-medium">Color / Brand</span>
              <span className="font-bold text-slate-800 flex items-center gap-1 mt-0.5 truncate">
                <Tag className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                <span className="truncate">{item.color || item.brandModel || 'General'}</span>
              </span>
            </div>
          </div>

          {/* Detailed Description */}
          <div className="space-y-4 mb-6">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                Detailed Description
              </h4>
              <p className="text-sm text-slate-700 leading-relaxed bg-white p-3.5 rounded-xl border border-slate-200/60">
                {item.description}
              </p>
            </div>

            {item.distinguishingFeatures && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Distinguishing Features &amp; Markings
                </h4>
                <div className="text-sm text-slate-800 bg-amber-50/60 border border-amber-200/80 p-3.5 rounded-xl flex items-start gap-2.5">
                  <Tag className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{item.distinguishingFeatures}</span>
                </div>
              </div>
            )}

            {/* Custody Information */}
            {item.custodyLocation && (
              <div className="bg-sky-50/60 border border-sky-200 rounded-xl p-3.5 flex items-start gap-3">
                <Building2 className="w-5 h-5 text-sky-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-sky-950 uppercase tracking-wide">
                    Custody &amp; Handover Location
                  </h4>
                  <p className="text-xs text-sky-900 mt-0.5 leading-relaxed">
                    {item.custodyLocation}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Privacy & Anti-Fraud Security Guarantee Notice */}
          <div className="bg-slate-100/80 rounded-2xl p-4 border border-slate-200 mb-8 flex items-start gap-3">
            <Lock className="w-5 h-5 text-navy-950 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-slate-600 leading-relaxed">
              <span className="font-bold text-navy-950 block mb-0.5">
                Finder Contact &amp; Student Privacy Protected
              </span>
              Personal phone numbers and private email addresses are shielded to prevent spam, extortion, and fraudulent pickup. All ownership verification occurs securely through the CampusFind Claim Portal or Campus Safety Office.
            </div>
          </div>

          {/* Action Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-200">
            <div className="text-xs text-slate-500 text-center sm:text-left">
              Reported by: <span className="font-semibold text-slate-700">{item.reporter.name}</span>{' '}
              ({item.reporter.department || 'Campus Member'})
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              {isFound ? (
                item.status === 'available' ? (
                  <button
                    onClick={() => {
                      closeItemDetail();
                      openClaimModal(item);
                    }}
                    className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <ShieldCheck className="w-5 h-5" />
                    <span>Claim This Item</span>
                  </button>
                ) : item.status === 'claim_pending' ? (
                  <button
                    onClick={() => {
                      closeItemDetail();
                      openClaimModal(item);
                    }}
                    className="w-full sm:w-auto px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <Clock className="w-5 h-5" />
                    <span>Submit Second Claim / Dispute</span>
                  </button>
                ) : (
                  <div className="w-full sm:w-auto px-5 py-2.5 bg-slate-100 text-slate-500 rounded-xl text-xs font-bold text-center">
                    Item Reunited &amp; Returned
                  </div>
                )
              ) : (
                /* Lost Item Actions */
                <button
                  onClick={() => {
                    closeItemDetail();
                    openClaimModal(item);
                  }}
                  className="w-full sm:w-auto px-6 py-3 bg-sky-500 hover:bg-sky-600 text-white font-bold text-sm rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-5 h-5" />
                  <span>I Found This Item / Notify Owner</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

