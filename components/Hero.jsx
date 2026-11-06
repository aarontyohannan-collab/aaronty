'use client';

import React from 'react';
import { ArrowRight, Sparkles, Star, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useStore } from '../context/StoreContext';
import { products } from '../data/products';

export default function Hero() {
  const { addToCart, setActiveQuickView } = useStore();
  const flagship = products[0];

  const handleScrollToProducts = () => {
    const el = document.getElementById('products-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:py-24 bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-10 right-10 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-10 left-10 w-[450px] h-[450px] bg-indigo-600/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          <div className="lg:col-span-7 flex flex-col items-start space-y-6 text-left">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-300 text-xs sm:text-sm font-medium shadow-inner"
            >
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Next-Generation Spatial Sound Architecture</span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
              <span className="text-white font-semibold">2026 Collection</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]"
            >
              Engineered for Pure{' '}
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-300 bg-clip-text text-transparent">
                Acoustic & Tactile
              </span>{' '}
              Perfection.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-slate-300 text-base sm:text-lg max-w-xl leading-relaxed"
            >
              Discover high-performance audio, aerospace titanium wearables, and precision mechanical computing devices designed for creators, developers, and connoisseurs.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 w-full sm:w-auto pt-2"
            >
              <button
                onClick={handleScrollToProducts}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-base shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Explore Products</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setActiveQuickView(flagship)}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-navy-800/80 hover:bg-navy-750 text-slate-200 hover:text-white border border-blue-500/25 hover:border-blue-400/50 font-semibold text-base transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>View Flagship Spec</span>
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-3 gap-6 pt-6 border-t border-navy-800 w-full max-w-lg"
            >
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-white">4.9/5</p>
                <div className="flex items-center text-amber-400 my-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-400">Over 3,400+ reviews</p>
              </div>

              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-white">48h</p>
                <p className="text-xs text-blue-400 font-semibold my-1">Express Dispatch</p>
                <p className="text-xs text-slate-400">Free global delivery</p>
              </div>

              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-white">2 Yrs</p>
                <p className="text-xs text-cyan-400 font-semibold my-1">Full Warranty</p>
                <p className="text-xs text-slate-400">Zero-hassle replacement</p>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-5 relative flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full max-w-md"
            >
              <div className="relative rounded-3xl bg-gradient-to-b from-navy-800/90 to-navy-900/95 border border-blue-500/30 p-5 shadow-2xl shadow-blue-900/40 backdrop-blur-xl">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-blue-500/20 text-cyan-300 border border-cyan-400/30">
                    Flagship Release
                  </span>
                  <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
                    ● In Stock (Ships Today)
                  </span>
                </div>

                <div className="relative w-full h-64 sm:h-72 rounded-2xl overflow-hidden bg-navy-950/60 border border-navy-700/60 group">
                  <img
                    src={flagship.image}
                    alt={flagship.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between bg-navy-950/80 backdrop-blur-md px-3.5 py-2 rounded-xl border border-blue-500/20 text-xs">
                    <span className="text-slate-300">ANC Hybrid 45dB</span>
                    <span className="text-blue-400 font-mono font-bold">60h Battery</span>
                    <span className="text-cyan-300 font-mono font-bold">Lossless LDAC</span>
                  </div>
                </div>

                <div className="mt-4 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3
                        className="text-lg font-bold text-white hover:text-blue-300 transition-colors cursor-pointer"
                        onClick={() => setActiveQuickView(flagship)}
                      >
                        {flagship.name}
                      </h3>
                      <p className="text-xs text-slate-400 line-clamp-1">{flagship.tagline}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-black text-white">${flagship.price}</p>
                      <p className="text-xs text-slate-500 line-through">${flagship.originalPrice}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5 pt-1">
                    <button
                      onClick={() => addToCart(flagship, 1)}
                      className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-md shadow-blue-600/30 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Add to Cart
                    </button>
                    <button
                      onClick={() => setActiveQuickView(flagship)}
                      className="w-full py-2.5 px-4 rounded-xl bg-navy-750 hover:bg-navy-700 text-slate-200 hover:text-white font-semibold text-sm border border-navy-600 transition-all text-center cursor-pointer"
                    >
                      Quick View
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
