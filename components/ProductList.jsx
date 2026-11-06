'use client';

import React, { useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { products, categories } from '../data/products';
import ProductCard from './ProductCard';
import { SlidersHorizontal, ArrowUpDown, Search, RotateCcw, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProductList() {
  const {
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    priceRange,
    setPriceRange,
    sortBy,
    setSortBy
  } = useStore();

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        if (selectedCategory !== 'all' && p.category !== selectedCategory) {
          return false;
        }
        if (p.price > priceRange) {
          return false;
        }
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q);
          const matchTagline = p.tagline.toLowerCase().includes(q);
          const matchDesc = p.description.toLowerCase().includes(q);
          const matchCategory = p.categoryName.toLowerCase().includes(q);
          if (!matchName && !matchTagline && !matchDesc && !matchCategory) {
            return false;
          }
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        return 0;
      });
  }, [selectedCategory, priceRange, searchQuery, sortBy]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setPriceRange(1500);
    setSortBy('featured');
  };

  return (
    <section id="products-section" className="py-16 bg-navy-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-cyan-300 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Curated Catalogue</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Explore Our Collection
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-xl">
              Precision built with high-grade materials, tested for relentless endurance and maximum fidelity.
            </p>
          </div>

          <div className="text-xs text-slate-400 font-medium">
            Showing <span className="text-cyan-400 font-bold">{filteredProducts.length}</span> of {products.length} products
          </div>
        </div>

        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 border border-blue-500'
                      : 'bg-navy-900/80 text-slate-300 hover:text-white hover:bg-navy-850 border border-navy-750'
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>

          <div className="p-4 rounded-2xl bg-navy-900/60 border border-navy-800 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 w-full md:w-auto">
              <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 whitespace-nowrap">
                <SlidersHorizontal className="w-4 h-4 text-blue-400" />
                Max Price:
              </span>
              <input
                type="range"
                min="50"
                max="1500"
                step="25"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-36 sm:w-48 accent-blue-500 cursor-pointer"
              />
              <span className="text-xs font-mono font-bold text-cyan-300 bg-navy-800 px-2 py-1 rounded-lg border border-navy-700 min-w-[55px] text-center">
                ${priceRange}
              </span>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
              {searchQuery && (
                <div className="inline-flex items-center gap-1 text-xs bg-blue-500/10 text-blue-300 px-2.5 py-1 rounded-lg border border-blue-500/20">
                  <span>Searching: "{searchQuery}"</span>
                  <button onClick={() => setSearchQuery('')} className="hover:text-white font-bold ml-1">×</button>
                </div>
              )}

              <div className="flex items-center gap-2">
                <ArrowUpDown className="w-4 h-4 text-slate-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-navy-800 text-slate-200 text-xs sm:text-sm font-medium py-2 px-3 rounded-xl border border-navy-700 focus:outline-none focus:border-blue-500 cursor-pointer"
                >
                  <option value="featured">Featured / Best Match</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Customer Rating</option>
                  <option value="newest">Newest Releases</option>
                </select>
              </div>

              <button
                onClick={resetFilters}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-navy-800 border border-transparent hover:border-navy-700 transition-all text-xs flex items-center gap-1 cursor-pointer"
                title="Reset all filters"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            </div>
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <AnimatePresence>
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="text-center py-20 bg-navy-900/30 rounded-3xl border border-navy-800 p-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-navy-800 flex items-center justify-center text-slate-400 border border-navy-700">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No products matched your criteria</h3>
            <p className="text-slate-400 text-sm max-w-md mx-auto mb-6">
              Try adjusting your price slider or searching for a different keyword.
            </p>
            <button
              onClick={resetFilters}
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-lg shadow-blue-600/30 transition-all"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
