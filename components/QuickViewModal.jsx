'use client';

import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Heart, Star, ShoppingBag, ShieldCheck, Truck, ArrowRight, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function QuickViewModal() {
  const router = useRouter();
  const { activeQuickView, setActiveQuickView, addToCart, toggleWishlist, isInWishlist } = useStore();
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (!activeQuickView) return null;

  const product = activeQuickView;
  const isWishlisted = isInWishlist(product.id);
  const images = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    setActiveQuickView(null);
    router.push('/checkout');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setActiveQuickView(null)}
          className="fixed inset-0 bg-navy-950/80 backdrop-blur-md transition-opacity"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl bg-navy-900 border border-blue-500/30 rounded-3xl shadow-2xl overflow-hidden z-10 my-8"
        >
          <button
            onClick={() => setActiveQuickView(null)}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-navy-800/80 text-slate-300 hover:text-white hover:bg-navy-700 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-6 bg-navy-950/60 flex flex-col justify-between border-b md:border-b-0 md:border-r border-navy-800">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-navy-900/60 border border-navy-800">
                <img
                  src={images[selectedImageIndex] || product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />

                {product.badge && (
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-blue-600/40 text-cyan-300 border border-cyan-400/30 shadow-md">
                    {product.badge}
                  </span>
                )}
              </div>

              {images.length > 1 && (
                <div className="flex gap-3 mt-4 overflow-x-auto pb-1">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                        selectedImageIndex === idx
                          ? 'border-blue-500 shadow-md shadow-blue-500/30'
                          : 'border-navy-800 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              <div className="grid grid-cols-2 gap-3 mt-6 pt-4 border-t border-navy-800 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-cyan-400" />
                  <span>Free Express Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>2-Year Full Coverage</span>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8 flex flex-col justify-between max-h-[85vh] overflow-y-auto">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                    {product.categoryName}
                  </span>
                  <div className="flex items-center gap-1 text-amber-400">
                    <Star className="w-4 h-4 fill-amber-400" />
                    <span className="text-sm font-bold text-white">{product.rating}</span>
                    <span className="text-xs text-slate-400">({product.reviewsCount} verified reviews)</span>
                  </div>
                </div>

                <h2 className="text-2xl font-extrabold text-white leading-tight">
                  {product.name}
                </h2>
                <p className="text-sm text-cyan-300 font-medium mt-1">
                  {product.tagline}
                </p>

                <div className="flex items-baseline gap-3 my-4">
                  <span className="text-3xl font-black text-white">${product.price}</span>
                  {product.originalPrice > product.price && (
                    <span className="text-base text-slate-500 line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    In Stock ({product.stock} units left)
                  </span>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  {product.description}
                </p>

                <div className="mb-6">
                  <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-2.5">
                    Key Highlights
                  </h4>
                  <ul className="space-y-2">
                    {product.features?.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                        <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {product.specs && (
                  <div className="mb-6 bg-navy-950/70 p-4 rounded-2xl border border-navy-800">
                    <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-2">
                      Technical Specifications
                    </h4>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {Object.entries(product.specs).map(([key, val]) => (
                        <div key={key}>
                          <span className="text-slate-500 block">{key}</span>
                          <span className="text-slate-200 font-medium">{val}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-navy-800 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center bg-navy-800 rounded-xl border border-navy-700 p-1">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="w-8 h-8 rounded-lg text-slate-300 hover:text-white hover:bg-navy-750 flex items-center justify-center font-bold text-sm"
                    >
                      -
                    </button>
                    <span className="w-10 text-center text-sm font-bold text-white">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                      className="w-8 h-8 rounded-lg text-slate-300 hover:text-white hover:bg-navy-750 flex items-center justify-center font-bold text-sm"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => toggleWishlist(product)}
                    className={`p-3 rounded-xl border transition-all ${
                      isWishlisted
                        ? 'bg-rose-500/20 border-rose-500/50 text-rose-400'
                        : 'bg-navy-800 border-navy-700 text-slate-300 hover:text-white'
                    }`}
                    title="Add to Wishlist"
                  >
                    <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-rose-400' : ''}`} />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={handleAddToCart}
                    className="py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </button>

                  <button
                    onClick={handleBuyNow}
                    className="py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-navy-950 font-bold text-sm shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2"
                  >
                    <span>Instant Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
