'use client';

import React from 'react';
import { Heart, ShoppingBag, Eye, Star } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { motion } from 'framer-motion';

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, isInWishlist, setActiveQuickView } = useStore();
  const isWishlisted = isInWishlist(product.id);

  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      id={`product-${product.id}`}
      className="group relative flex flex-col justify-between rounded-2xl bg-navy-900/90 border border-navy-750 hover:border-blue-500/50 shadow-lg hover:shadow-xl hover:shadow-blue-900/20 transition-all duration-300 overflow-hidden"
    >
      <div
        className="relative w-full aspect-square bg-navy-950/70 overflow-hidden cursor-pointer"
        onClick={() => setActiveQuickView(product)}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500"
          loading="lazy"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-3">
          <span className="text-xs font-semibold text-blue-300 flex items-center gap-1.5 bg-navy-900/90 px-3 py-1.5 rounded-full border border-blue-500/30 shadow-md">
            <Eye className="w-3.5 h-3.5" />
            Click for Quick View
          </span>
        </div>

        {product.badge && (
          <div className="absolute top-3 left-3 z-10">
            <span
              className={`text-[10px] font-black tracking-wider uppercase px-2.5 py-1 rounded-full shadow-md ${
                product.badgeColor === 'emerald'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : product.badgeColor === 'amber'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'bg-blue-600/30 text-cyan-300 border border-blue-400/40'
              }`}
            >
              {product.badge}
            </span>
          </div>
        )}

        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className={`absolute top-3 right-3 z-10 p-2 rounded-full backdrop-blur-md transition-all duration-200 shadow-md ${
            isWishlisted
              ? 'bg-rose-500 text-white shadow-rose-500/30'
              : 'bg-navy-900/80 text-slate-300 hover:text-rose-400 hover:bg-navy-850'
          }`}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart
            className={`w-4 h-4 transition-transform active:scale-125 ${
              isWishlisted ? 'fill-white stroke-white' : ''
            }`}
          />
        </button>
      </div>

      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="font-semibold text-blue-400/90 uppercase tracking-wider text-[10px]">
              {product.categoryName}
            </span>
            <div className="flex items-center gap-1 text-amber-400">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span className="font-bold text-slate-200">{product.rating}</span>
              <span className="text-slate-500 text-[11px]">({product.reviewsCount})</span>
            </div>
          </div>

          <h3
            onClick={() => setActiveQuickView(product)}
            className="text-base font-bold text-white group-hover:text-blue-300 transition-colors line-clamp-1 cursor-pointer"
            title={product.name}
          >
            {product.name}
          </h3>

          <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
            {product.tagline}
          </p>
        </div>

        <div className="pt-2 border-t border-navy-800">
          <div className="flex items-baseline justify-between mb-3">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-black text-white">${product.price}</span>
              {product.originalPrice > product.price && (
                <span className="text-xs text-slate-500 line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>
            {discountPercent > 0 && (
              <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                Save {discountPercent}%
              </span>
            )}
          </div>

          <div className="grid grid-cols-5 gap-2">
            <button
              onClick={() => addToCart(product, 1)}
              className="col-span-4 py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-semibold text-xs sm:text-sm shadow-md shadow-blue-600/30 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Cart</span>
            </button>
            <button
              onClick={() => setActiveQuickView(product)}
              className="col-span-1 py-2.5 rounded-xl bg-navy-800 hover:bg-navy-750 text-slate-300 hover:text-white border border-navy-700 flex items-center justify-center transition-all cursor-pointer"
              title="Quick Specifications"
            >
              <Eye className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
