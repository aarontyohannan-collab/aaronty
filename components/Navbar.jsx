'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useStore } from '../context/StoreContext';
import {
  ShoppingBag,
  Heart,
  Search,
  Menu,
  X,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { products } from '../data/products';

export default function Navbar() {
  const router = useRouter();
  const {
    cartCount,
    wishlist,
    setIsCartOpen,
    setIsWishlistOpen,
    searchQuery,
    setSearchQuery,
    setSelectedCategory
  } = useStore();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef(null);

  const searchSuggestions = searchQuery.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.tagline.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 4)
    : [];

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectCategory = (cat) => {
    setSelectedCategory(cat);
    setIsMobileMenuOpen(false);
    if (typeof window !== 'undefined' && window.location.pathname !== '/') {
      router.push('/');
    } else {
      const el = document.getElementById('products-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectProduct = (product) => {
    setIsSearchFocused(false);
    setSearchQuery('');
    if (typeof window !== 'undefined' && window.location.pathname !== '/') {
      router.push('/');
    }
    setTimeout(() => {
      const el = document.getElementById(`product-${product.id}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 200);
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-nav transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo */}
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="group flex items-center gap-3 text-white font-extrabold text-2xl tracking-wider transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 via-indigo-600 to-navy-900 p-0.5 shadow-lg shadow-blue-500/25 group-hover:shadow-blue-500/40 transition-all flex items-center justify-center">
                <div className="w-full h-full bg-navy-950 rounded-[10px] flex items-center justify-center">
                  <span className="text-xl font-black bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                    Æ
                  </span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold tracking-widest text-lg sm:text-xl text-white">
                  AETHER
                </span>
                <span className="text-[9px] tracking-[0.25em] text-blue-400 uppercase -mt-1 font-semibold">
                  Luxe Electronics
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              <button
                onClick={() => handleSelectCategory('all')}
                className="px-3.5 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-navy-800/60 rounded-xl transition-all cursor-pointer"
              >
                Catalog
              </button>
              <button
                onClick={() => handleSelectCategory('audio')}
                className="px-3.5 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-navy-800/60 rounded-xl transition-all cursor-pointer"
              >
                Audio
              </button>
              <button
                onClick={() => handleSelectCategory('wearables')}
                className="px-3.5 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-navy-800/60 rounded-xl transition-all cursor-pointer"
              >
                Wearables
              </button>
              <button
                onClick={() => handleSelectCategory('computing')}
                className="px-3.5 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-navy-800/60 rounded-xl transition-all cursor-pointer"
              >
                Pro Gear
              </button>
              <button
                onClick={() => handleSelectCategory('optics')}
                className="px-3.5 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-navy-800/60 rounded-xl transition-all cursor-pointer"
              >
                Smart Optics
              </button>
              <Link
                href="/checkout"
                className="px-3.5 py-2 text-sm font-medium text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10 rounded-xl transition-all flex items-center gap-1"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Checkout
              </Link>
            </nav>
          </div>

          {/* Search Bar - Desktop */}
          <div ref={searchRef} className="hidden md:flex flex-1 max-w-md mx-4 relative">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search headphones, smartwatches, keyboards..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                className="w-full bg-navy-800/80 text-white placeholder-slate-400 text-sm pl-10 pr-10 py-2.5 rounded-xl border border-navy-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-0.5 rounded-md"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Quick search dropdown */}
            <AnimatePresence>
              {isSearchFocused && searchSuggestions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-navy-900 border border-navy-700 rounded-xl shadow-2xl p-2 z-50 overflow-hidden"
                >
                  <p className="text-[11px] font-semibold text-slate-400 px-3 py-1 uppercase tracking-wider">
                    Quick Results
                  </p>
                  <div className="divide-y divide-navy-800">
                    {searchSuggestions.map((prod) => (
                      <div
                        key={prod.id}
                        onClick={() => handleSelectProduct(prod)}
                        className="flex items-center gap-3 p-2 hover:bg-navy-800/80 rounded-lg cursor-pointer transition-colors"
                      >
                        <img
                          src={prod.image}
                          alt={prod.name}
                          className="w-10 h-10 object-cover rounded-md bg-navy-950 shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-white truncate">{prod.name}</p>
                          <p className="text-xs text-blue-400 font-semibold">${prod.price}</p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-500" />
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Action Buttons: Wishlist, Cart, Mobile Toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Wishlist Button */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="relative p-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-navy-800/80 border border-transparent hover:border-navy-700 transition-all cursor-pointer group"
              aria-label="View Wishlist"
              title="View Saved Wishlist"
            >
              <Heart className="w-5 h-5 group-hover:scale-110 transition-transform group-hover:text-rose-400" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white font-bold text-[11px] min-w-[20px] h-5 rounded-full px-1 flex items-center justify-center shadow-lg shadow-rose-500/40 animate-pulse">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-sm shadow-lg shadow-blue-600/30 active:scale-95 transition-all cursor-pointer"
              aria-label="View Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5 shrink-0" />
              <span className="hidden sm:inline">Cart</span>
              <span className="bg-white/20 text-white text-xs font-bold px-2 py-0.5 rounded-full min-w-[20px] text-center">
                {cartCount}
              </span>
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-navy-800 border border-navy-700/60 transition-all"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search input bar */}
        <div className="md:hidden pb-3">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-navy-800/90 text-white placeholder-slate-400 text-sm pl-9 pr-8 py-2 rounded-xl border border-navy-700 focus:outline-none focus:border-blue-500"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-navy-900 border-b border-navy-700/80 px-4 pt-2 pb-6 space-y-3"
          >
            <div className="flex flex-col gap-1">
              <button
                onClick={() => handleSelectCategory('all')}
                className="text-left px-3 py-2.5 rounded-lg text-slate-200 hover:bg-navy-800 font-medium text-sm"
              >
                All Products
              </button>
              <button
                onClick={() => handleSelectCategory('audio')}
                className="text-left px-3 py-2.5 rounded-lg text-slate-200 hover:bg-navy-800 font-medium text-sm"
              >
                Premium Audio
              </button>
              <button
                onClick={() => handleSelectCategory('wearables')}
                className="text-left px-3 py-2.5 rounded-lg text-slate-200 hover:bg-navy-800 font-medium text-sm"
              >
                Wearables & Smart
              </button>
              <button
                onClick={() => handleSelectCategory('computing')}
                className="text-left px-3 py-2.5 rounded-lg text-slate-200 hover:bg-navy-800 font-medium text-sm"
              >
                Pro Computing
              </button>
              <button
                onClick={() => handleSelectCategory('optics')}
                className="text-left px-3 py-2.5 rounded-lg text-slate-200 hover:bg-navy-800 font-medium text-sm"
              >
                Smart Optics
              </button>
              <Link
                href="/checkout"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg text-cyan-400 bg-cyan-500/10 font-medium text-sm"
              >
                <span>Express Checkout</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
