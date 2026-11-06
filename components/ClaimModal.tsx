'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { validateCollegeEmail } from '@/lib/utils';
import confetti from 'canvas-confetti';
import {
  X,
  ShieldCheck,
  Lock,
  Upload,
  AlertCircle,
  CheckCircle2,
  FileText,
  HelpCircle,
  Eye,
  Camera,
  Image as ImageIcon,
} from 'lucide-react';

export default function ClaimModal() {
  const {
    selectedItemForClaim,
    closeClaimModal,
    submitClaim,
    currentUser,
  } = useApp();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [description, setDescription] = useState('');
  const [identifyingInfo, setIdentifyingInfo] = useState('');
  const [proofImages, setProofImages] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedClaimId, setSubmittedClaimId] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (currentUser) {
      setFullName(currentUser.name);
      setEmail(currentUser.email);
      setDepartment(currentUser.department);
      if (currentUser.phone) setContactNumber(currentUser.phone);
    }
  }, [currentUser, selectedItemForClaim]);

  if (!selectedItemForClaim) return null;

  const item = selectedItemForClaim;
  const isFoundItem = item.type === 'found';

  // Quick photo upload mock / simulator
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setProofImages((prev) => [...prev, event.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const addPresetReceipt = () => {
    const preset = 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=80';
    setProofImages((prev) => [...prev, preset]);
  };

  const removePhoto = (index: number) => {
    setProofImages((prev) => prev.filter((_, i) => i !== index));
  };

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!fullName.trim()) errs.fullName = 'Full Name is required.';
    if (!email.trim()) {
      errs.email = 'College Email is required.';
    } else {
      const emailCheck = validateCollegeEmail(email);
      if (!emailCheck.isValid) errs.email = emailCheck.message || 'Invalid email.';
    }
    if (!department.trim()) errs.department = 'Department or Class is required.';
    if (!description.trim()) {
      errs.description = 'Please explain your reason / where you lost the item.';
    }
    if (!identifyingInfo.trim()) {
      errs.identifyingInfo =
        'Secret identifying details (e.g. wallpaper, serial #, inside markings) are required to prevent fraud.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const claimId = submitClaim({
      itemId: item.id,
      itemName: item.name,
      itemCategory: item.category,
      itemType: item.type,
      claimantName: fullName.trim(),
      claimantEmail: email.trim(),
      claimantDept: department.trim(),
      claimantPhone: contactNumber.trim(),
      claimantUserId: currentUser?.id || `usr-${Date.now()}`,
      finderEmail: item.reporter.email,
      description: description.trim(),
      identifyingInfo: identifyingInfo.trim(),
      proofImages,
    });

    setSubmittedClaimId(claimId);
    setIsSubmitted(true);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {
      // Confetti fallback
    }
  };

  const handleClose = () => {
    setIsSubmitted(false);
    setSubmittedClaimId('');
    closeClaimModal();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <h3 className="font-bold text-slate-900 text-base sm:text-lg">
              {isFoundItem ? 'Submit Ownership Claim' : 'Notify Owner of Found Match'}
            </h3>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto">
          {isSubmitted ? (
            /* Success State */
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-navy-950 font-poppins mb-2">
                Claim Submitted Successfully!
              </h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto mb-6">
                Your claim reference ID is{' '}
                <span className="font-mono font-bold text-slate-900 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-300">
                  {submittedClaimId}
                </span>
                . The item finder and Campus Security have been notified to review your proof.
              </p>

              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 max-w-md mx-auto text-left text-xs text-slate-600 mb-6 space-y-2">
                <div className="font-bold text-slate-900 text-sm">Next Steps:</div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-emerald-600">1.</span>
                  <span>
                    Your claim is now in <strong>Pending</strong> review status.
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-emerald-600">2.</span>
                  <span>
                    Once verified, you will receive pickup instructions with location (e.g. Central Library Front Desk or Campus Security Office).
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-emerald-600">3.</span>
                  <span>Bring your student ID card when collecting the item.</span>
                </div>
              </div>

              <button
                onClick={handleClose}
                className="px-6 py-2.5 bg-navy-950 hover:bg-navy-900 text-white font-semibold text-sm rounded-xl shadow transition-all"
              >
                Close &amp; Return to Portal
              </button>
            </div>
          ) : (
            /* Claim Form */
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Target Item summary badge */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-slate-200 overflow-hidden flex-shrink-0">
                    <img
                      src={
                        item.images?.[0] ||
                        'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?w=400&auto=format&fit=crop&q=80'
                      }
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-semibold text-slate-500 uppercase">
                      Target Item: {item.id}
                    </span>
                    <h4 className="font-bold text-slate-900 text-sm">{item.name}</h4>
                    <p className="text-xs text-slate-500">
                      {item.category} • {item.location}
                    </p>
                  </div>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 bg-amber-100 text-amber-800 rounded-full">
                  Verification Required
                </span>
              </div>

              {/* Security Hint */}
              <div className="bg-sky-50 rounded-2xl p-3.5 border border-sky-200/80 text-xs text-sky-900 flex items-start gap-2.5">
                <Lock className="w-4 h-4 text-sky-600 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Anti-Fraud Verification:</strong> To claim sensitive items (laptops, wallets, keys, ID cards), you must specify identifying details not shown in the public photos.
                </span>
              </div>

              {/* Personal Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Alex Morgan"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  />
                  {errors.fullName && (
                    <span className="text-xs text-red-500 mt-1 block">{errors.fullName}</span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    College Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. alex.morgan@campus.edu"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  />
                  {errors.email && (
                    <span className="text-xs text-red-500 mt-1 block">{errors.email}</span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Department / Class / Major <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    placeholder="e.g. Computer Science, 3rd Year"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  />
                  {errors.department && (
                    <span className="text-xs text-red-500 mt-1 block">{errors.department}</span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Contact Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    placeholder="e.g. +1 (555) 019-2834"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  />
                </div>
              </div>

              {/* Ownership Reason */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Why do you believe this item belongs to you? <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Explain when and where you lost it, brand details, or circumstance..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                />
                {errors.description && (
                  <span className="text-xs text-red-500 mt-1 block">{errors.description}</span>
                )}
              </div>

              {/* Secret Proof / Identifying Information */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Confidential Proof / Identifying Marks <span className="text-red-500">*</span>
                </label>
                <div className="text-[11px] text-slate-500 mb-1.5">
                  Provide unique details known only to the true owner (e.g. wallpaper description, partial serial number, contents inside wallet/bag, passcode hint, specific keychain engravings).
                </div>
                <textarea
                  rows={3}
                  value={identifyingInfo}
                  onChange={(e) => setIdentifyingInfo(e.target.value)}
                  placeholder="e.g. The laptop lockscreen wallpaper is a photo of my orange cat. There is a small dent on the right corner. Serial number ends in 891..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 bg-amber-50/20"
                />
                {errors.identifyingInfo && (
                  <span className="text-xs text-red-500 mt-1 block">{errors.identifyingInfo}</span>
                )}
              </div>

              {/* Upload Supporting Photo/Document */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-slate-700">
                    Upload Supporting Documents / Previous Photos (Optional)
                  </label>
                  <button
                    type="button"
                    onClick={addPresetReceipt}
                    className="text-xs font-medium text-sky-600 hover:text-sky-700 underline"
                  >
                    + Add Sample Receipt / Proof
                  </button>
                </div>

                <div className="border-2 border-dashed border-slate-300 rounded-2xl p-4 text-center hover:bg-slate-50 transition-colors">
                  <Upload className="w-6 h-6 text-slate-400 mx-auto mb-1.5" />
                  <p className="text-xs text-slate-600 font-medium">
                    Upload purchase receipt, old photo with item, or warranty card
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handlePhotoUpload}
                    className="mt-2 text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-sky-50 file:text-sky-700 hover:file:bg-sky-100 cursor-pointer"
                  />
                </div>

                {proofImages.length > 0 && (
                  <div className="flex items-center gap-2 mt-3 overflow-x-auto pb-1">
                    {proofImages.map((img, i) => (
                      <div key={i} className="relative w-16 h-16 rounded-xl overflow-hidden border border-slate-300 flex-shrink-0 group">
                        <img src={img} alt="" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => removePhoto(i)}
                          className="absolute inset-0 bg-red-600/70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Submit Verified Claim</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

