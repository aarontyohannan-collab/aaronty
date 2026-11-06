'use client';

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { Item, Claim, User, AppNotification, UserRole, ItemCategory, CampusLocation } from '@/types';
import { INITIAL_ITEMS, INITIAL_CLAIMS, INITIAL_NOTIFICATIONS, DEMO_USERS } from '@/lib/mockData';

interface AppContextType {
  items: Item[];
  claims: Claim[];
  currentUser: User | null;
  notifications: AppNotification[];
  unreadNotificationsCount: number;
  selectedItemForDetail: Item | null;
  selectedItemForClaim: Item | null;
  selectedItemForPoster: Item | null;
  isAuthModalOpen: boolean;
  authModalMode: 'login' | 'signup' | 'forgot';
  
  // Actions
  addItem: (item: Omit<Item, 'id' | 'createdAt' | 'status'>) => string;
  updateItem: (id: string, updates: Partial<Item>) => void;
  deleteItem: (id: string) => void;
  submitClaim: (claim: Omit<Claim, 'id' | 'status' | 'createdAt' | 'updatedAt'>) => string;
  updateClaimStatus: (claimId: string, status: 'approved' | 'rejected', notes?: string, pickupInstructions?: string) => void;
  
  // Auth
  setCurrentUser: (user: User | null) => void;
  login: (email: string, role?: UserRole) => { success: boolean; message?: string };
  signup: (userData: Partial<User>) => { success: boolean; message?: string };
  logout: () => void;
  switchUser: (user: User) => void;
  openAuthModal: (mode?: 'login' | 'signup' | 'forgot') => void;
  closeAuthModal: () => void;
  
  // Modals & Navigation
  openItemDetail: (item: Item) => void;
  closeItemDetail: () => void;
  openClaimModal: (item: Item) => void;
  closeClaimModal: () => void;
  openPosterModal: (item: Item) => void;
  closePosterModal: () => void;
  
  // Notifications
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  
  // Smart match
  findPotentialMatches: (queryItem: Partial<Item>) => Item[];
  
  // Stats
  stats: {
    totalReported: number;
    itemsFound: number;
    itemsLost: number;
    itemsReturned: number;
    itemsWaitingClaim: number;
    claimsPending: number;
    recoveryRate: number;
  };

  // Utilities
  resetToDefaultData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  ITEMS: 'campusfind_items_v2',
  CLAIMS: 'campusfind_claims_v2',
  USER: 'campusfind_user_v2',
  NOTIFS: 'campusfind_notifications_v2',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<Item[]>([]);
  const [claims, setClaims] = useState<Claim[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Modals
  const [selectedItemForDetail, setSelectedItemForDetail] = useState<Item | null>(null);
  const [selectedItemForClaim, setSelectedItemForClaim] = useState<Item | null>(null);
  const [selectedItemForPoster, setSelectedItemForPoster] = useState<Item | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup' | 'forgot'>('login');

  // Load from localStorage on client mount
  useEffect(() => {
    try {
      const storedItems = localStorage.getItem(STORAGE_KEYS.ITEMS);
      const storedClaims = localStorage.getItem(STORAGE_KEYS.CLAIMS);
      const storedUser = localStorage.getItem(STORAGE_KEYS.USER);
      const storedNotifs = localStorage.getItem(STORAGE_KEYS.NOTIFS);

      if (storedItems) {
        setItems(JSON.parse(storedItems));
      } else {
        setItems(INITIAL_ITEMS);
        localStorage.setItem(STORAGE_KEYS.ITEMS, JSON.stringify(INITIAL_ITEMS));
      }

      if (storedClaims) {
        setClaims(JSON.parse(storedClaims));
      } else {
        setClaims(INITIAL_CLAIMS);
        localStorage.setItem(STORAGE_KEYS.CLAIMS, JSON.stringify(INITIAL_CLAIMS));
      }

      if (storedNotifs) {
        setNotifications(JSON.parse(storedNotifs));
      } else {
        setNotifications(INITIAL_NOTIFICATIONS);
        localStorage.setItem(STORAGE_KEYS.NOTIFS, JSON.stringify(INITIAL_NOTIFICATIONS));
      }

      if (storedUser) {
        setCurrentUser(JSON.parse(storedUser));
      } else {
        // Default to Sarah Chen (student) for immediate easy exploration
        setCurrentUser(DEMO_USERS[0]);
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(DEMO_USERS[0]));
      }
    } catch (e) {
      console.error('Failed to load from storage:', e);
      setItems(INITIAL_ITEMS);
      setClaims(INITIAL_CLAIMS);
      setNotifications(INITIAL_NOTIFICATIONS);
      setCurrentUser(DEMO_USERS[0]);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Sync back to localStorage
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEYS.ITEMS, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save items to storage:', e);
    }
  }, [items, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEYS.CLAIMS, JSON.stringify(claims));
    } catch (e) {
      console.error('Failed to save claims to storage:', e);
    }
  }, [claims, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEYS.NOTIFS, JSON.stringify(notifications));
    } catch (e) {
      console.error('Failed to save notifications to storage:', e);
    }
  }, [notifications, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      if (currentUser) {
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(currentUser));
      } else {
        localStorage.removeItem(STORAGE_KEYS.USER);
      }
    } catch (e) {
      console.error('Failed to save user to storage:', e);
    }
  }, [currentUser, isLoaded]);

  // Keep modal detail synced if underlying item changes
  useEffect(() => {
    if (selectedItemForDetail) {
      const updated = items.find((i) => i.id === selectedItemForDetail.id);
      if (updated) setSelectedItemForDetail(updated);
    }
  }, [items, selectedItemForDetail]);

  const addItem = (itemData: Omit<Item, 'id' | 'createdAt' | 'status'>): string => {
    const year = new Date().getFullYear();
    const rand = Math.floor(1000 + Math.random() * 9000);
    const prefix = itemData.type === 'found' ? 'FND' : 'LST';
    const id = `${prefix}-${year}-${rand}`;

    const newItem: Item = {
      ...itemData,
      id,
      status: 'available',
      createdAt: new Date().toISOString(),
    };

    setItems((prev) => [newItem, ...prev]);

    // Add alert notification
    const newNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      userId: itemData.reporter.userId || 'all',
      title: `${itemData.type === 'found' ? 'Found' : 'Lost'} Item Reported`,
      message: `"${itemData.name}" has been published with Reference ID: ${id}.`,
      type: 'success',
      itemId: id,
      read: false,
      createdAt: new Date().toISOString(),
    };
    setNotifications((prev) => [newNotif, ...prev]);

    return id;
  };

  const updateItem = (id: string, updates: Partial<Item>) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
  };

  const deleteItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const submitClaim = (claimData: Omit<Claim, 'id' | 'status' | 'createdAt' | 'updatedAt'>): string => {
    const year = new Date().getFullYear();
    const rand = Math.floor(1000 + Math.random() * 9000);
    const id = `CLM-${year}-${rand}`;

    const newClaim: Claim = {
      ...claimData,
      id,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setClaims((prev) => [newClaim, ...prev]);

    // Update item status to claim_pending
    updateItem(claimData.itemId, { status: 'claim_pending', claimId: id });

    // Notify Finder and Admin
    const targetItem = items.find((i) => i.id === claimData.itemId);
    const finderUserId = targetItem?.reporter.userId || 'usr-finder-01';

    const claimNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      userId: finderUserId,
      title: 'New Claim Received',
      message: `${claimData.claimantName} filed an ownership claim for "${claimData.itemName}".`,
      type: 'claim',
      itemId: claimData.itemId,
      claimId: id,
      read: false,
      createdAt: new Date().toISOString(),
    };

    setNotifications((prev) => [claimNotif, ...prev]);

    return id;
  };

  const updateClaimStatus = (
    claimId: string,
    status: 'approved' | 'rejected',
    notes?: string,
    pickupInstructions?: string
  ) => {
    const now = new Date().toISOString();
    let affectedClaim: Claim | undefined;

    setClaims((prev) =>
      prev.map((c) => {
        if (c.id === claimId) {
          affectedClaim = {
            ...c,
            status,
            adminNotes: notes || c.adminNotes,
            pickupInstructions: pickupInstructions || c.pickupInstructions,
            updatedAt: now,
          };
          return affectedClaim;
        }
        return c;
      })
    );

    if (affectedClaim) {
      if (status === 'approved') {
        updateItem(affectedClaim.itemId, {
          status: 'returned',
          claimedBy: `${affectedClaim.claimantName} (${affectedClaim.claimantEmail})`,
          returnedDate: new Date().toISOString().split('T')[0],
          custodyLocation: pickupInstructions || 'Released to verified owner at Security Desk',
        });

        // Notify Claimant
        const approvedNotif: AppNotification = {
          id: `notif-${Date.now()}`,
          userId: affectedClaim.claimantUserId,
          title: '🎉 Ownership Claim Approved!',
          message: `Your claim for "${affectedClaim.itemName}" was verified! Check instructions to collect your item.`,
          type: 'success',
          itemId: affectedClaim.itemId,
          claimId: affectedClaim.id,
          read: false,
          createdAt: now,
        };
        setNotifications((prev) => [approvedNotif, ...prev]);
      } else {
        // Revert item status back to available if no other pending claims
        updateItem(affectedClaim.itemId, { status: 'available' });

        const rejectedNotif: AppNotification = {
          id: `notif-${Date.now()}`,
          userId: affectedClaim.claimantUserId,
          title: 'Claim Update: Verification Incomplete',
          message: `Your claim for "${affectedClaim.itemName}" was declined. Reason: ${notes || 'Details did not match physical item.'}`,
          type: 'warning',
          itemId: affectedClaim.itemId,
          claimId: affectedClaim.id,
          read: false,
          createdAt: now,
        };
        setNotifications((prev) => [rejectedNotif, ...prev]);
      }
    }
  };

  // Auth Functions
  const login = (email: string, role?: UserRole) => {
    const trimmed = email.trim().toLowerCase();
    const existing = DEMO_USERS.find((u) => u.email.toLowerCase() === trimmed);
    if (existing) {
      setCurrentUser(existing);
      return { success: true };
    }

    // Auto-create user for valid college email
    const namePart = trimmed.split('@')[0].replace(/[._]/g, ' ');
    const formattedName = namePart
      .split(' ')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ') || 'Campus Member';

    const newUser: User = {
      id: `usr-${Date.now()}`,
      name: formattedName,
      email: trimmed,
      department: 'General Studies / Campus Member',
      role: role || (trimmed.includes('security') || trimmed.includes('admin') ? 'admin' : 'student'),
      avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80`,
    };

    setCurrentUser(newUser);
    return { success: true };
  };

  const signup = (userData: Partial<User>) => {
    if (!userData.email || !userData.name) {
      return { success: false, message: 'Name and email are required.' };
    }

    const newUser: User = {
      id: `usr-${Date.now()}`,
      name: userData.name,
      email: userData.email.toLowerCase(),
      department: userData.department || 'Student Union',
      studentId: userData.studentId,
      phone: userData.phone,
      role: userData.role || 'student',
      avatar: userData.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    };

    setCurrentUser(newUser);
    return { success: true };
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const switchUser = (user: User) => {
    setCurrentUser(user);
  };

  const openAuthModal = (mode: 'login' | 'signup' | 'forgot' = 'login') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  // Modals
  const openItemDetail = (item: Item) => {
    setSelectedItemForDetail(item);
  };

  const closeItemDetail = () => {
    setSelectedItemForDetail(null);
  };

  const openClaimModal = (item: Item) => {
    setSelectedItemForClaim(item);
  };

  const closeClaimModal = () => {
    setSelectedItemForClaim(null);
  };

  const openPosterModal = (item: Item) => {
    setSelectedItemForPoster(item);
  };

  const closePosterModal = () => {
    setSelectedItemForPoster(null);
  };

  // Notifications
  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const unreadNotificationsCount = useMemo(() => {
    if (!currentUser) return 0;
    return notifications.filter(
      (n) => !n.read && (n.userId === currentUser.id || n.userId === 'all')
    ).length;
  }, [notifications, currentUser]);

  // Smart Matching Engine
  const findPotentialMatches = (queryItem: Partial<Item>): Item[] => {
    if (!queryItem.category && !queryItem.name) return [];

    const targetType = queryItem.type === 'found' ? 'lost' : 'found';
    const queryWords = (queryItem.name || '')
      .toLowerCase()
      .split(/\s+/)
      .filter((w) => w.length > 2);

    return items.filter((item) => {
      // Must be opposite type and not returned/closed
      if (item.type !== targetType || item.status === 'returned' || item.status === 'closed') {
        return false;
      }

      // Check category match
      const categoryMatch = queryItem.category && item.category === queryItem.category;

      // Check location match
      const locationMatch = queryItem.location && item.location === queryItem.location;

      // Check word overlaps in name / description / brand
      const combinedText = `${item.name} ${item.description} ${item.brandModel || ''} ${item.color}`.toLowerCase();
      const keywordMatch = queryWords.some((word) => combinedText.includes(word));

      // Match score
      let score = 0;
      if (categoryMatch) score += 2;
      if (keywordMatch) score += 3;
      if (locationMatch) score += 1;

      return score >= 2;
    });
  };

  // Stats calculation
  const stats = useMemo(() => {
    const totalReported = items.length;
    const itemsFound = items.filter((i) => i.type === 'found').length;
    const itemsLost = items.filter((i) => i.type === 'lost').length;
    const itemsReturned = items.filter((i) => i.status === 'returned').length;
    const itemsWaitingClaim = items.filter((i) => i.type === 'found' && i.status === 'available').length;
    const claimsPending = claims.filter((c) => c.status === 'pending').length;
    const recoveryRate = totalReported > 0 ? Math.round((itemsReturned / totalReported) * 100) : 0;

    return {
      totalReported,
      itemsFound,
      itemsLost,
      itemsReturned,
      itemsWaitingClaim,
      claimsPending,
      recoveryRate,
    };
  }, [items, claims]);

  const resetToDefaultData = () => {
    setItems(INITIAL_ITEMS);
    setClaims(INITIAL_CLAIMS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setCurrentUser(DEMO_USERS[0]);
    localStorage.removeItem(STORAGE_KEYS.ITEMS);
    localStorage.removeItem(STORAGE_KEYS.CLAIMS);
    localStorage.removeItem(STORAGE_KEYS.NOTIFS);
    localStorage.removeItem(STORAGE_KEYS.USER);
  };

  return (
    <AppContext.Provider
      value={{
        items,
        claims,
        currentUser,
        notifications,
        unreadNotificationsCount,
        selectedItemForDetail,
        selectedItemForClaim,
        selectedItemForPoster,
        isAuthModalOpen,
        authModalMode,
        addItem,
        updateItem,
        deleteItem,
        submitClaim,
        updateClaimStatus,
        setCurrentUser,
        login,
        signup,
        logout,
        switchUser,
        openAuthModal,
        closeAuthModal,
        openItemDetail,
        closeItemDetail,
        openClaimModal,
        closeClaimModal,
        openPosterModal,
        closePosterModal,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        findPotentialMatches,
        stats,
        resetToDefaultData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

