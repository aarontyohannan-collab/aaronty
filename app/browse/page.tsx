'use client';

import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import ItemCard from '@/components/ItemCard';
import { CategoryBadge, StatusBadge } from '@/components/CategoryBadge';
import {
  ITEM_CATEGORIES_LIST,
  CAMPUS_LOCATIONS_LIST,
} from '@/lib/mockData';
import { ItemCategory, CampusLocation, ItemStatus, ReportType } from '@/types';
import {
  Search,
  Filter,
  ArrowUpDown,
  RotateCcw,
  SlidersHorizontal,
  Compass,
  Grid,
  List as ListIcon,
  Tag,
  MapPin,
  Calendar,
  CheckCircle,
  PlusCircle,
  AlertCircle,
  X,
} from 'lucide-react';
import Link from 'next/link';

export default function BrowsePage() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const initialType = (searchParams.get('type') as ReportType) || 'found';

  const { items, openItemDetail, openClaimModal } = useApp();

  const [activeTab, setActiveTab] = useState<ReportType>(initialType);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'recent' | 'oldest' | 'name' | 'category'>('recent');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filter & Search Logic
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // Must match active tab ('found' or 'lost')
      if (item.type !== activeTab) return false;

      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }

      // Location filter
      if (selectedLocation !== 'all' && item.location !== selectedLocation) {
        return false;
      }

      // Status filter
      if (selectedStatus !== 'all' && item.status !== selectedStatus) {
        return false;
      }

      // Search keyword filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchName = item.name.toLowerCase().includes(q);
        const matchDesc = item.description.toLowerCase().includes(q);
        const matchLoc = item.location.toLowerCase().includes(q);
        const matchCustomLoc = item.customLocation?.toLowerCase().includes(q);
        const matchBrand = item.brandModel?.toLowerCase().includes(q);
        const matchId = item.id.toLowerCase().includes(q);
        const matchColor = item.color.toLowerCase().includes(q);
        const matchFeatures = item.distinguishingFeatures.toLowerCase().includes(q);

        if (
          !matchName &&
          !matchDesc &&
          !matchLoc &&
          !matchCustomLoc &&
          !matchBrand &&
          !matchId &&
          !matchColor &&
          !matchFeatures
        ) {
          return false;
        }
      }

      return true;
    });
  }, [items, activeTab, selectedCategory, selectedLocation, selectedStatus, searchQuery]);

  // Sort Logic
  const sortedItems = useMemo(() => {
    const list = [...filteredItems];
    switch (sortBy) {
      case 'recent':
        return list.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case 'oldest':
        return list.sort(
          (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      case 'name':
        return list.sort((a, b) => a.name.localeCompare(b.name));
      case 'category':
        return list.sort((a, b) => a.category.localeCompare(b.category));
      default:
        return list;
    }
  }, [filteredItems, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedLocation('all');
    setSelectedStatus('all');
    setSortBy('recent');
  };

  const hasActiveFilters =
    searchQuery !== '' ||
    selectedCategory !== 'all' ||
    selectedLocation !== 'all' ||
    selectedStatus !== 'all';

  const foundCount = items.filter((i) => i.type === 'found').length;
  const lostCount = items.filter((i) => i.type === 'lost').length;

  return (
    <div className="min-h-screen bg-slate-50 py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Tabs */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-navy-950 font-poppins tracking-tight">
              Browse Campus Belongings
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Explore reported lost and found items with real-time filters and search.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-3">
            <Link
              href="/report-found"
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs sm:text-sm font-semibold shadow-sm transition-all flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Report Found</span>
            </Link>
            <Link
              href="/report-lost"
              className="px-4 py-2.5 bg-white hover:bg-slate-100 text-navy-950 border border-slate-300 rounded-xl text-xs sm:text-sm font-semibold shadow-sm transition-all flex items-center gap-2"
            >
              <AlertCircle className="w-4 h-4 text-sky-600" />
              <span>Report Lost</span>
            </Link>
          </div>
        </div>

        {/* Found vs Lost Tabs */}
        <div className="flex items-center gap-2 p-1.5 bg-slate-200/80 rounded-2xl w-fit mb-8 shadow-inner">
          <button
            onClick={() => setActiveTab('found')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${activeTab === 'found'
                ? 'bg-white text-navy-950 shadow-md scale-[1.02]'
                : 'text-slate-600 hover:text-navy-950'
              }`}
          >
            <span>Found Items</span>
            <span
              className={`px-2 py-0.5 rounded-full text-xs font-mono ${activeTab === 'found'
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-slate-300/70 text-slate-700'
                }`}
            >
              {foundCount}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('lost')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${activeTab === 'lost'
                ? 'bg-white text-navy-950 shadow-md scale-[1.02]'
                : 'text-slate-600 hover:text-navy-950'
              }`}
          >
            <span>Lost Items</span>
            <span
              className={`px-2 py-0.5 rounded-full text-xs font-mono ${activeTab === 'lost'
                  ? 'bg-sky-100 text-sky-800'
                  : 'bg-slate-300/70 text-slate-700'
                }`}
            >
              {lostCount}
            </span>
          </button>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-soft mb-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            {/* Search Input */}
            <div className="md:col-span-4 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                placeholder="Search name, brand, color, ID, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 bg-slate-50/50"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-700"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Category Dropdown */}
            <div className="md:col-span-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 bg-slate-50/50 font-medium text-slate-700 cursor-pointer"
              >
                <option value="all">All Categories</option>
                {ITEM_CATEGORIES_LIST.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Location Dropdown */}
            <div className="md:col-span-3">
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 bg-slate-50/50 font-medium text-slate-700 cursor-pointer"
              >
                <option value="all">All Campus Locations</option>
                {CAMPUS_LOCATIONS_LIST.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort & Reset Buttons */}
            <div className="md:col-span-2 flex items-center gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-sky-500 bg-slate-50/50 text-slate-700 cursor-pointer"
              >
                <option value="recent">Recently Added</option>
                <option value="oldest">Oldest First</option>
                <option value="name">Name (A-Z)</option>
                <option value="category">Category</option>
              </select>

              {hasActiveFilters && (
                <button
                  onClick={handleResetFilters}
                  title="Reset Filters"
                  className="p-2.5 bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-600 transition-colors flex-shrink-0"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Sub-toolbar: Status Pill Filter & View Mode Toggle */}
          <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-4 border-t border-slate-100 text-xs">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              <span className="text-slate-400 font-semibold mr-1">Status:</span>
              <button
                onClick={() => setSelectedStatus('all')}
                className={`px-3 py-1 rounded-full font-medium transition-colors ${selectedStatus === 'all'
                    ? 'bg-navy-950 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
              >
                All Status
              </button>
              <button
                onClick={() => setSelectedStatus('available')}
                className={`px-3 py-1 rounded-full font-medium transition-colors ${selectedStatus === 'available'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                  }`}
              >
                {activeTab === 'found' ? 'Waiting for Owner' : 'Still Missing'}
              </button>
              <button
                onClick={() => setSelectedStatus('claim_pending')}
                className={`px-3 py-1 rounded-full font-medium transition-colors ${selectedStatus === 'claim_pending'
                    ? 'bg-amber-600 text-white'
                    : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
                  }`}
              >
                Claim Under Review
              </button>
              <button
                onClick={() => setSelectedStatus('returned')}
                className={`px-3 py-1 rounded-full font-medium transition-colors ${selectedStatus === 'returned'
                    ? 'bg-blue-600 text-white'
                    : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                  }`}
              >
                Returned / Reunited
              </button>
            </div>

            {/* Results count & View Mode */}
            <div className="flex items-center gap-3">
              <span className="text-slate-500 font-medium">
                Showing <strong className="text-slate-900">{sortedItems.length}</strong> {activeTab} items
              </span>
              <div className="flex items-center bg-slate-100 rounded-lg p-0.5 border border-slate-200">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-md transition-colors ${viewMode === 'grid'
                      ? 'bg-white text-navy-950 shadow-xs'
                      : 'text-slate-400 hover:text-slate-700'
                    }`}
                  title="Grid View"
                >
                  <Grid className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-md transition-colors ${viewMode === 'list'
                      ? 'bg-white text-navy-950 shadow-xs'
                      : 'text-slate-400 hover:text-slate-700'
                    }`}
                  title="List View"
                >
                  <ListIcon className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Items Container */}
        {sortedItems.length === 0 ? (
          /* Empty State */
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-soft max-w-xl mx-auto my-12">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
              <Compass className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-navy-950 font-poppins mb-1">
              No matching {activeTab} items found
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mb-6">
              We couldn&apos;t find any {activeTab} belongings matching your current search query or filter selection.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {hasActiveFilters && (
                <button
                  onClick={handleResetFilters}
                  className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs rounded-xl transition-colors"
                >
                  Clear All Filters
                </button>
              )}
              {activeTab === 'found' ? (
                <Link
                  href="/report-lost"
                  className="px-5 py-2.5 bg-navy-950 hover:bg-navy-900 text-white font-semibold text-xs rounded-xl shadow transition-all"
                >
                  File a Lost Item Report
                </Link>
              ) : (
                <Link
                  href="/report-found"
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl shadow transition-all"
                >
                  Turn in a Found Item
                </Link>
              )}
            </div>
          </div>
        ) : viewMode === 'grid' ? (
          /* Grid View */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedItems.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          /* List View */
          <div className="space-y-3">
            {sortedItems.map((item) => (
              <div
                key={item.id}
                onClick={() => openItemDetail(item)}
                className="bg-white rounded-2xl p-4 border border-slate-200 hover:border-sky-300 hover:shadow-card transition-all flex flex-col sm:flex-row items-center justify-between gap-4 cursor-pointer"
              >
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
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
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-[11px] font-bold text-slate-500">
                        {item.id}
                      </span>
                      <CategoryBadge category={item.category} size="sm" />
                      <StatusBadge status={item.status} type={item.type} />
                    </div>
                    <h3 className="font-bold text-slate-900 text-base">{item.name}</h3>
                    <p className="text-xs text-slate-500 line-clamp-1">{item.description}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100 text-xs text-slate-500">
                  <div className="flex items-center gap-1 font-medium text-slate-700">
                    <MapPin className="w-3.5 h-3.5 text-rose-500" />
                    <span>{item.location}</span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openItemDetail(item);
                    }}
                    className="px-4 py-2 bg-slate-50 hover:bg-slate-100 text-navy-950 font-semibold rounded-xl border border-slate-200"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

