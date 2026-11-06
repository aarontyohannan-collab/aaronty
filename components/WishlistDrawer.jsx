'use client';

import React from 'react';
import { useStore } from '../context/StoreContext';
import { X, Heart, Trash2, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function WishlistDrawer() {
  const {
    wishlist,
    isWishlistOpen,
    setIsWishlistOpen,
    toggleWishlist,
    addToCart,
    setActiveQuickView
  } = useStore();

  if (!isWishlistOpen) return null;

  const handleMoveAllToCart = () => {
    wishlist.forEach((product) => {
      addToCart(product, 1);
    });
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsWishlistOpen(false)}
          className="absolute inset-0 bg-navy-950/80 backdrop-blur-sm transition-opacity"
        />

        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="w-screen max-w-md bg-navy-900 border-l border-blue-500/25 shadow-2xl flex flex-col"
          >
            <div className="p-5 border-b border-navy-800 flex items-center justify-between bg-navy-950/70">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center">
                  <Heart className="w-4 h-4 fill-rose-400" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Your Saved Wishlist</h3>
                  <p className="text-xs text-slate-400">
                    {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} saved
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsWishlistOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-navy-800 transition-colors"
                aria-label="Close wishlist"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {wishlist.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-navy-800/80 flex items-center justify-center text-slate-500 border border-navy-750">
                    <Heart className="w-8 h-8 text-rose-400/60" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white">Your wishlist is empty</h4>
                    <p className="text-xs text-slate-400 mt-1 max-w-xs">
                      Tap the heart icon on any device to bookmark it here for later.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsWishlistOpen(false)}
                    className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
                  >
                    Browse Collection
                  </button>
                </div>
              ) : (
                wishlist.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-3.5 p-3 rounded-2xl bg-navy-850/60 border border-navy-800 hover:border-navy-700 transition-all"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-18 h-18 sm:w-20 sm:h-20 object-cover rounded-xl bg-navy-950 shrink-0"
                    />

                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4
                            onClick={() => {
                              setIsWishlistOpen(false);
                              setActiveQuickView(item);
                            }}
                            className="text-xs sm:text-sm font-bold text-white hover:text-blue-300 transition-colors cursor-pointer truncate"
                          >
                            {item.name}
                          </h4>
                          <span className="text-xs text-slate-400 line-through">
                            ${item.originalPrice}
                          </span>
                          <span className="text-sm font-bold text-cyan-300 ml-2">
                            ${item.price}
                          </span>
                        </div>
                        <button
                          onClick={() => toggleWishlist(item)}
                          className="text-slate-500 hover:text-rose-400 p-1 rounded-md transition-colors"
                          title="Remove from wishlist"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="pt-2">
                        <button
                          onClick={() => addToCart(item, 1)}
                          className="w-full py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-md shadow-blue-600/20 active:scale-95 transition-all flex items-center justify-center gap-1.5"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Move to Cart</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {wishlist.length > 0 && (
              <div className="p-5 border-t border-navy-800 bg-navy-950/90 space-y-2">
                <button
                  onClick={handleMoveAllToCart}
                  className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Move All Items to Cart</span>
                </button>
                <button
                  onClick={() => setIsWishlistOpen(false)}
                  className="w-full py-2.5 px-4 rounded-xl bg-navy-800 hover:bg-navy-750 text-slate-300 text-xs font-semibold"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
