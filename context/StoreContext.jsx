'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { products, promoCodes } from '../data/products';

const StoreContext = createContext(null);

export function StoreProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [activeQuickView, setActiveQuickView] = useState(null);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [toasts, setToasts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState(1500);
  const [sortBy, setSortBy] = useState('featured');
  const [orders, setOrders] = useState([]);
  const [latestOrder, setLatestOrder] = useState(null);

  // Initialize from localStorage safely on client
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('aether_cart');
      if (savedCart) setCart(JSON.parse(savedCart));

      const savedWishlist = localStorage.getItem('aether_wishlist');
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));

      const savedOrders = localStorage.getItem('aether_orders');
      if (savedOrders) setOrders(JSON.parse(savedOrders));
    } catch (e) {}
  }, []);

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('aether_cart', JSON.stringify(cart));
    } catch (e) {}
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('aether_wishlist', JSON.stringify(wishlist));
    } catch (e) {}
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('aether_orders', JSON.stringify(orders));
    } catch (e) {}
  }, [orders]);

  // Toast System
  const addToast = (title, description = '', type = 'info') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, title, description, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 3800);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Cart Functions
  const addToCart = (product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
    addToast('Added to Cart', `${product.name} (x${quantity}) is now in your cart.`, 'success');
  };

  const removeFromCart = (productId) => {
    const item = cart.find((i) => i.id === productId);
    setCart((prev) => prev.filter((i) => i.id !== productId));
    if (item) {
      addToast('Removed from Cart', `${item.name} was removed.`, 'warning');
    }
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist Functions
  const toggleWishlist = (product) => {
    const exists = wishlist.some((item) => item.id === product.id);
    if (exists) {
      setWishlist((prev) => prev.filter((item) => item.id !== product.id));
      addToast('Removed from Wishlist', `${product.name} was removed.`, 'info');
    } else {
      setWishlist((prev) => [...prev, product]);
      addToast('Added to Wishlist', `${product.name} saved for later!`, 'success');
    }
  };

  const isInWishlist = (productId) => {
    return wishlist.some((item) => item.id === productId);
  };

  // Coupon System
  const applyCoupon = (codeToApply) => {
    const cleanCode = (codeToApply || couponCode).trim().toUpperCase();
    if (!cleanCode) return { success: false, message: 'Please enter a coupon code' };

    const coupon = promoCodes[cleanCode];
    if (coupon) {
      setAppliedCoupon({ code: cleanCode, ...coupon });
      addToast('Promo Code Applied', `${cleanCode}: ${coupon.description}`, 'success');
      return { success: true, message: `Applied ${cleanCode}!` };
    } else {
      addToast('Invalid Coupon', 'Code not recognized. Try AURA20 or SAVE10', 'error');
      return { success: false, message: 'Invalid or expired code. Try AURA20 or SAVE10' };
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    addToast('Coupon Removed', 'Promo discount has been removed.', 'info');
  };

  // Cart Calculations
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  let couponDiscount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountPercent) {
      couponDiscount = Math.round((cartSubtotal * appliedCoupon.discountPercent) / 100);
    } else if (appliedCoupon.discountAmount) {
      couponDiscount = Math.min(appliedCoupon.discountAmount, cartSubtotal);
    }
  }

  const freeShippingThreshold = 150;
  const isFreeShipping = cartSubtotal >= freeShippingThreshold || appliedCoupon?.freeShipping;
  const shippingFee = cartSubtotal === 0 ? 0 : isFreeShipping ? 0 : 15;
  const taxableAmount = Math.max(0, cartSubtotal - couponDiscount);
  const taxAmount = Math.round(taxableAmount * 0.08); // 8% sales tax
  const cartTotal = Math.max(0, taxableAmount + shippingFee + taxAmount);

  // Place Order function
  const placeOrder = (orderData) => {
    const orderId = 'AET-' + Math.floor(100000 + Math.random() * 900000);
    const date = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
    const newOrder = {
      orderId,
      date,
      items: [...cart],
      customer: orderData,
      subtotal: cartSubtotal,
      discount: couponDiscount,
      shipping: shippingFee,
      tax: taxAmount,
      total: cartTotal,
      status: 'Confirmed & Processing',
      estimatedDelivery: '3-5 Business Days'
    };

    setOrders((prev) => [newOrder, ...prev]);
    setLatestOrder(newOrder);
    clearCart();
    setAppliedCoupon(null);
    return newOrder;
  };

  return (
    <StoreContext.Provider
      value={{
        cart,
        wishlist,
        cartCount,
        cartSubtotal,
        cartTotal,
        couponDiscount,
        shippingFee,
        taxAmount,
        freeShippingThreshold,
        isFreeShipping,
        appliedCoupon,
        couponCode,
        setCouponCode,
        applyCoupon,
        removeCoupon,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        isCartOpen,
        setIsCartOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        activeQuickView,
        setActiveQuickView,
        toasts,
        addToast,
        removeToast,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        priceRange,
        setPriceRange,
        sortBy,
        setSortBy,
        orders,
        latestOrder,
        placeOrder,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
