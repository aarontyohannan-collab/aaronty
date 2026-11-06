'use client';

import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  X,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Sparkles,
  Tag,
  ShieldCheck,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function CartDrawer() {
  const router = useRouter();
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    cartTotal,
    couponDiscount,
    shippingFee,
    taxAmount,
    freeShippingThreshold,
    isFreeShipping,
    appliedCoupon,
    applyCoupon,
    removeCoupon
  } = useStore();

  const [inputCoupon, setInputCoupon] = useState('');

  if (!isCartOpen) return null;

  const progressPercent = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;
    applyCoupon(inputCoupon);
    setInputCoupon('');
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    router.push('/checkout');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsCartOpen(false)}
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
                <div className="w-8 h-8 rounded-lg bg-blue-600/20 text-cyan-400 flex items-center justify-center">
                  <ShoppingBag className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Your Shopping Cart</h3>
                  <p className="text-xs text-slate-400">
                    {cart.length} {cart.length === 1 ? 'item' : 'items'}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-navy-800 transition-colors"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 bg-navy-850/80 border-b border-navy-800">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-semibold text-slate-200">
                  {isFreeShipping ? (
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      Free Worldwide Express Unlocked!
                    </span>
                  ) : (
                    <span>
                      Add <strong className="text-cyan-300 font-bold">${amountNeededForFreeShipping}</strong> more for Free Shipping
                    </span>
                  )}
                </span>
                <span className="text-slate-400 font-mono text-[11px]">{progressPercent}%</span>
              </div>
              <div className="w-full h-2 bg-navy-950 rounded-full overflow-hidden p-0.5 border border-navy-750">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-navy-800/80 flex items-center justify-center text-slate-500 border border-navy-750">
                    <ShoppingBag className="w-8 h-8 text-blue-400/60" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white">Your cart is empty</h4>
                    <p className="text-xs text-slate-400 mt-1 max-w-xs">
                      Looks like you haven't added anything to your cart yet. Explore our innovative lineup.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                cart.map((item) => (
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
                          <h4 className="text-xs sm:text-sm font-bold text-white truncate" title={item.name}>
                            {item.name}
                          </h4>
                          <p className="text-[11px] text-blue-400/90 font-medium">
                            ${item.price} each
                          </p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-slate-500 hover:text-rose-400 p-1 rounded-md transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center bg-navy-950 rounded-lg border border-navy-750 px-1 py-0.5">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 text-slate-400 hover:text-white"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-7 text-center text-xs font-bold text-white">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 text-slate-400 hover:text-white"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="text-sm font-black text-white">
                          ${item.price * item.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-5 border-t border-navy-800 bg-navy-950/90 space-y-3">
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="Coupon code (e.g. AURA20)"
                      value={inputCoupon}
                      onChange={(e) => setInputCoupon(e.target.value)}
                      className="w-full bg-navy-900 text-white placeholder-slate-500 text-xs px-3 py-2 rounded-xl border border-navy-750 focus:outline-none focus:border-blue-500 uppercase"
                    />
                    <Tag className="w-3.5 h-3.5 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2" />
                  </div>
                  <button
                    type="submit"
                    className="px-3.5 py-2 rounded-xl bg-navy-800 hover:bg-navy-750 text-slate-200 hover:text-white text-xs font-semibold border border-navy-700 transition-colors"
                  >
                    Apply
                  </button>
                </form>

                {appliedCoupon && (
                  <div className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Check className="w-3.5 h-3.5" />
                      {appliedCoupon.code} ({appliedCoupon.description})
                    </span>
                    <button
                      onClick={removeCoupon}
                      className="text-slate-400 hover:text-rose-400 font-bold ml-2"
                    >
                      ×
                    </button>
                  </div>
                )}

                <div className="space-y-1.5 text-xs text-slate-300 pt-2 border-t border-navy-850">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-white">${cartSubtotal}</span>
                  </div>
                  {couponDiscount > 0 && (
                    <div className="flex justify-between text-emerald-400">
                      <span>Promo Discount</span>
                      <span>-${couponDiscount}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Estimated Shipping</span>
                    <span>
                      {shippingFee === 0 ? (
                        <span className="text-emerald-400 font-semibold">FREE</span>
                      ) : (
                        `$${shippingFee}`
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Tax (8%)</span>
                    <span>${taxAmount}</span>
                  </div>
                  <div className="flex justify-between text-sm font-extrabold text-white pt-2 border-t border-navy-800">
                    <span>Estimated Total</span>
                    <span className="text-base text-cyan-300 font-black">${cartTotal}</span>
                  </div>
                </div>

                <button
                  onClick={handleProceedToCheckout}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Proceed to Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <p className="text-[11px] text-center text-slate-400 flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Encrypted 256-Bit Bank Grade Checkout
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
