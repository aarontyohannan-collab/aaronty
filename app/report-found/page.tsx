'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import {
  ITEM_CATEGORIES_LIST,
  CAMPUS_LOCATIONS_LIST,
} from '@/lib/mockData';
import { ItemCategory, CampusLocation } from '@/types';
import { validateCollegeEmail, SAMPLE_PHOTO_PRESETS } from '@/lib/utils';
import confetti from 'canvas-confetti';
import {
  PlusCircle,
  Upload,
  X,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Building2,
  Calendar,
  Clock,
  Tag,
  ArrowRight,
  Printer,
  Sparkles,
  Info,
  MapPin,
  Camera,
} from 'lucide-react';

export default function ReportFoundPage() {
  const router = useRouter();
  const { addItem, currentUser, openPosterModal, items } = useApp();

  // Finder Info
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('');
  const [phone, setPhone] = useState('');

  // Item Info
  const [itemName, setItemName] = useState('');
  const [category, setCategory] = useState<ItemCategory>('Electronics');
  const [description, setDescription] = useState('');
  const [brandModel, setBrandModel] = useState('');
  const [color, setColor] = useState('');
  const [distinguishingFeatures, setDistinguishingFeatures] = useState('');
  const [images, setImages] = useState<string[]>([]);

  // Location & Time
  const [location, setLocation] = useState<CampusLocation>('Library');
  const [customLocation, setCustomLocation] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [approximateTime, setApproximateTime] = useState('14:30');
  const [custodyLocation, setCustodyLocation] = useState('Held with me (Finder)');

  // Submission State
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [generatedRefId, setGeneratedRefId] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Auto-populate finder info if user is logged in
  useEffect(() => {
    if (currentUser) {
      setFullName(currentUser.name);
      setEmail(currentUser.email);
      setDepartment(currentUser.department);
      if (currentUser.phone) setPhone(currentUser.phone);
    }
  }, [currentUser]);

  // Handle Photo Upload via File input
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImages((prev) => [...prev, event.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const addPresetPhoto = (presetUrl: string, presetCategory?: ItemCategory) => {
    setImages((prev) => [...prev, presetUrl]);
    if (presetCategory && !category) {
      setCategory(presetCategory);
    }
  };

  const validate = () => {
    const errs: { [key: string]: string } = {};

    // Finder info
    if (!fullName.trim()) errs.fullName = 'Full Name is required.';
    if (!email.trim()) {
      errs.email = 'College Email Address is required.';
    } else {
      const emailCheck = validateCollegeEmail(email);
      if (!emailCheck.isValid) errs.email = emailCheck.message || 'Invalid email.';
    }
    if (!department.trim()) errs.department = 'Department is required.';

    // Item info
    if (!itemName.trim()) errs.itemName = 'Item Name is required.';
    if (!category) errs.category = 'Item Category is required.';
    if (!description.trim()) errs.description = 'Detailed description is required.';
    if (!color.trim()) errs.color = 'Item color is required.';
    if (location === 'Other' && !customLocation.trim()) {
      errs.customLocation = 'Please specify the custom campus location.';
    }
    if (!date) errs.date = 'Date found is required.';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      window.scrollTo({ top: 150, behavior: 'smooth' });
      return;
    }

    const defaultPhoto =
      images.length > 0
        ? images
        : ['https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?w=800&auto=format&fit=crop&q=80'];

    const newId = addItem({
      type: 'found',
      name: itemName.trim(),
      category,
      description: description.trim(),
      brandModel: brandModel.trim() || undefined,
      color: color.trim(),
      distinguishingFeatures: distinguishingFeatures.trim(),
      location,
      customLocation: location === 'Other' ? customLocation.trim() : undefined,
      date,
      approximateTime,
      images: defaultPhoto,
      custodyLocation: custodyLocation.trim(),
      reporter: {
        name: fullName.trim(),
        email: email.trim(),
        phone: phone.trim() || undefined,
        department: department.trim(),
        userId: currentUser?.id,
        role: currentUser?.role || 'finder',
      },
    });

    setGeneratedRefId(newId);
    setIsSubmitted(true);

    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 },
      });
    } catch {
      // fallback
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Find newly created item for success card
  const submittedItem = items.find((i) => i.id === generatedRefId);

  return (
    <div className="min-h-screen bg-slate-50 py-10 lg:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Heading */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            <PlusCircle className="w-4 h-4 text-emerald-600" />
            <span>Turn In a Found Property</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-navy-950 font-poppins tracking-tight">
            Report a Found Item
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto mt-2">
            Help reconnect your fellow student or colleague with their lost belongings. Please provide as much accurate detail as possible.
          </p>
        </div>

        {isSubmitted ? (
          /* Submission Success State */
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xl text-center animate-in zoom-in-95 duration-300">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
              <CheckCircle2 className="w-12 h-12" />
            </div>

            <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Report Successfully Logged
            </span>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-950 font-poppins mt-3 mb-2">
              Thank You for Being an Honest Campus Member!
            </h2>
            <p className="text-sm text-slate-600 max-w-md mx-auto mb-6">
              Your found item report has been published to the CampusFind database and is now searchable by students.
            </p>

            {/* Generated Reference ID Box */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/90 max-w-md mx-auto mb-8 text-left">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
                  Item Reference ID
                </span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                  Status: Available
                </span>
              </div>
              <div className="text-2xl font-mono font-black text-navy-950 mb-3 bg-white p-3 rounded-xl border border-slate-200 text-center tracking-wider">
                {generatedRefId}
              </div>

              <div className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-200">
                <div className="flex justify-between">
                  <span className="text-slate-400">Item:</span>
                  <span className="font-semibold text-slate-900">{itemName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Category:</span>
                  <span className="font-semibold text-slate-900">{category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Location Found:</span>
                  <span className="font-semibold text-slate-900">
                    {location}
                    {customLocation ? ` (${customLocation})` : ''}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Custody:</span>
                  <span className="font-semibold text-slate-900">{custodyLocation}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/browse"
                className="px-6 py-3 bg-navy-950 hover:bg-navy-900 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center gap-2"
              >
                <span>View in Browse Items</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              {submittedItem && (
                <button
                  onClick={() => openPosterModal(submittedItem)}
                  className="px-6 py-3 bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm rounded-xl border border-slate-300 shadow-sm transition-all flex items-center gap-2"
                >
                  <Printer className="w-4 h-4 text-sky-600" />
                  <span>Print Notice Flyer</span>
                </button>
              )}

              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setItemName('');
                  setDescription('');
                  setColor('');
                  setBrandModel('');
                  setDistinguishingFeatures('');
                  setImages([]);
                }}
                className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm rounded-xl transition-all"
              >
                Report Another Item
              </button>
            </div>
          </div>
        ) : (
          /* Report Found Form */
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* 1. Finder Information Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-soft">
              <div className="flex items-center gap-3 pb-4 mb-6 border-b border-slate-100">
                <div className="w-9 h-9 rounded-xl bg-navy-50 text-navy-950 flex items-center justify-center font-bold text-sm">
                  1
                </div>
                <div>
                  <h3 className="font-poppins font-bold text-lg text-navy-950">
                    Finder Information
                  </h3>
                  <p className="text-xs text-slate-500">
                    Your contact details are protected and never displayed to the general public.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Prof. Marcus Vance or Sarah Chen"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
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
                    placeholder="e.g. marcus.vance@campus.edu"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  />
                  {errors.email && (
                    <span className="text-xs text-red-500 mt-1 block">{errors.email}</span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Department / College Unit <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    placeholder="e.g. Library Services, Computer Science, Staff"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  />
                  {errors.department && (
                    <span className="text-xs text-red-500 mt-1 block">{errors.department}</span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +1 (555) 234-5678"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  />
                </div>
              </div>
            </div>

            {/* 2. Found Item Information Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-soft">
              <div className="flex items-center gap-3 pb-4 mb-6 border-b border-slate-100">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-sm">
                  2
                </div>
                <div>
                  <h3 className="font-poppins font-bold text-lg text-navy-950">
                    Found Item Information
                  </h3>
                  <p className="text-xs text-slate-500">
                    Specify the category, item name, and general specifications.
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Item Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={itemName}
                      onChange={(e) => setItemName(e.target.value)}
                      placeholder="e.g. Apple MacBook Air 13-inch, Leather Wallet, Dorm Keys"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                    />
                    {errors.itemName && (
                      <span className="text-xs text-red-500 mt-1 block">{errors.itemName}</span>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Item Category <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as ItemCategory)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 bg-white cursor-pointer font-medium"
                    >
                      {ITEM_CATEGORIES_LIST.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Primary Color <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                      placeholder="e.g. Midnight Blue, Dark Brown, Silver, Black"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                    />
                    {errors.color && (
                      <span className="text-xs text-red-500 mt-1 block">{errors.color}</span>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Brand or Model (Optional)
                    </label>
                    <input
                      type="text"
                      value={brandModel}
                      onChange={(e) => setBrandModel(e.target.value)}
                      placeholder="e.g. Apple M2, Fossil Derrick, Sony WH-1000XM4"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Detailed Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Provide a general description of where you spotted it, what condition it is in, protective case details..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  />
                  {errors.description && (
                    <span className="text-xs text-red-500 mt-1 block">{errors.description}</span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Distinguishing Features &amp; Markings
                  </label>
                  <div className="text-[11px] text-slate-500 mb-1">
                    Noticeable exterior details (e.g. stickers, scratches, lanyard colors, engraved initials).
                  </div>
                  <input
                    type="text"
                    value={distinguishingFeatures}
                    onChange={(e) => setDistinguishingFeatures(e.target.value)}
                    placeholder="e.g. Has a small mountain sticker on corner, blue lanyard with 3 keys"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  />
                </div>

                {/* Upload Item Photograph */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold text-slate-700">
                      Upload Item Photograph(s)
                    </label>
                    <span className="text-[11px] text-slate-500">Multiple images allowed</span>
                  </div>

                  {/* Preset quick test selector */}
                  <div className="mb-3 p-3 bg-slate-50 rounded-2xl border border-slate-200">
                    <div className="text-[11px] font-bold text-slate-600 mb-2 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-sky-500" />
                      <span>Quick Presets for Fast Testing:</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {SAMPLE_PHOTO_PRESETS.map((p) => (
                        <button
                          key={p.label}
                          type="button"
                          onClick={() => {
                            addPresetPhoto(p.url, p.category);
                            if (!itemName) setItemName(p.label);
                            if (!brandModel) setBrandModel(p.label);
                          }}
                          className="px-2.5 py-1 bg-white hover:bg-sky-50 border border-slate-200 hover:border-sky-400 rounded-lg text-xs font-medium text-slate-700 transition-colors"
                        >
                          + {p.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Drag and Drop Box */}
                  <div className="border-2 border-dashed border-slate-300 hover:border-sky-400 rounded-2xl p-6 text-center hover:bg-slate-50 transition-colors">
                    <Camera className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                    <p className="text-xs font-bold text-slate-700 mb-0.5">
                      Click to choose files or drag &amp; drop photos
                    </p>
                    <p className="text-[11px] text-slate-500 mb-3">
                      PNG, JPG, WEBP up to 10MB
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handlePhotoUpload}
                      className="text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-navy-950 file:text-white hover:file:bg-navy-900 cursor-pointer"
                    />
                  </div>

                  {/* Thumbnail Previews */}
                  {images.length > 0 && (
                    <div className="flex items-center gap-3 mt-4 overflow-x-auto pb-1">
                      {images.map((img, idx) => (
                        <div
                          key={idx}
                          className="relative w-20 h-20 rounded-xl overflow-hidden border border-slate-300 flex-shrink-0 group shadow-xs"
                        >
                          <img src={img} alt="" className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => removePhoto(idx)}
                            className="absolute inset-0 bg-red-600/75 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            title="Remove photo"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* 3. Location, Date & Custody Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-soft">
              <div className="flex items-center gap-3 pb-4 mb-6 border-b border-slate-100">
                <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center font-bold text-sm">
                  3
                </div>
                <div>
                  <h3 className="font-poppins font-bold text-lg text-navy-950">
                    Location, Date &amp; Custody
                  </h3>
                  <p className="text-xs text-slate-500">
                    Where and when was the item found, and where is it safely stored now?
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Found Campus Location <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={location}
                      onChange={(e) => setLocation(e.target.value as CampusLocation)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 bg-white cursor-pointer font-medium"
                    >
                      {CAMPUS_LOCATIONS_LIST.map((loc) => (
                        <option key={loc} value={loc}>
                          {loc}
                        </option>
                      ))}
                    </select>
                  </div>

                  {location === 'Other' && (
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Specify Custom Location <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={customLocation}
                        onChange={(e) => setCustomLocation(e.target.value)}
                        placeholder="e.g. Outside Bio-Tech Garden, Bus Stop 2"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                      />
                      {errors.customLocation && (
                        <span className="text-xs text-red-500 mt-1 block">
                          {errors.customLocation}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Date Found <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 bg-white"
                    />
                    {errors.date && (
                      <span className="text-xs text-red-500 mt-1 block">{errors.date}</span>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Approximate Time Found
                    </label>
                    <input
                      type="time"
                      value={approximateTime}
                      onChange={(e) => setApproximateTime(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Current Safe Custody Location
                  </label>
                  <select
                    value={custodyLocation}
                    onChange={(e) => setCustodyLocation(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 bg-white cursor-pointer"
                  >
                    <option value="Held with me (Finder)">
                      Held with me (Finder will verify claimant)
                    </option>
                    <option value="Handed over to Campus Security Office Rm 104">
                      Handed over to Campus Security Office Rm 104
                    </option>
                    <option value="Deposited at Central Library Front Desk (2nd Floor)">
                      Deposited at Central Library Front Desk (2nd Floor)
                    </option>
                    <option value="Deposited at Student Union Information Desk">
                      Deposited at Student Union Information Desk
                    </option>
                    <option value="Deposited at Hostel Warden Office">
                      Deposited at Hostel Warden Office
                    </option>
                  </select>
                </div>
              </div>
            </div>

            {/* Submission Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>All reports are cryptographically timestamped and referenced.</span>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-3"
              >
                <PlusCircle className="w-5 h-5" />
                <span>Submit Found Item Report</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

