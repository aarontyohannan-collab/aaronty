export type ItemCategory =
  | 'Electronics'
  | 'Books and Stationery'
  | 'Bags and Accessories'
  | 'ID Cards'
  | 'Wallets and Money'
  | 'Keys'
  | 'Clothing'
  | 'Jewellery'
  | 'Sports Equipment'
  | 'Other';

export type CampusLocation =
  | 'Main Block'
  | 'Library'
  | 'Canteen'
  | 'Auditorium'
  | 'Computer Lab'
  | 'Science Lab'
  | 'Playground'
  | 'Parking Area'
  | 'Hostel'
  | 'Classroom'
  | 'Other';

export type ItemStatus = 'available' | 'claim_pending' | 'returned' | 'closed';

export type ReportType = 'found' | 'lost';

export interface Item {
  id: string; // e.g. "FND-2026-8942" or "LST-2026-4192"
  type: ReportType;
  name: string;
  category: ItemCategory;
  description: string;
  brandModel?: string;
  color: string;
  distinguishingFeatures: string;
  location: CampusLocation;
  customLocation?: string;
  date: string;
  approximateTime: string;
  images: string[];
  status: ItemStatus;
  custodyLocation?: string;
  reporter: {
    name: string;
    email: string;
    phone?: string;
    department?: string;
    userId?: string;
    role?: 'student' | 'finder' | 'admin';
  };
  createdAt: string;
  claimedBy?: string;
  claimId?: string;
  returnedDate?: string;
  matchedItemsCount?: number;
}

export type ClaimStatus = 'pending' | 'approved' | 'rejected';

export interface Claim {
  id: string; // e.g. "CLM-2026-7712"
  itemId: string;
  itemName: string;
  itemCategory: ItemCategory;
  itemType: ReportType;
  claimantName: string;
  claimantEmail: string;
  claimantDept: string;
  claimantPhone?: string;
  claimantUserId: string;
  finderEmail: string;
  description: string;
  identifyingInfo: string; // Private secret proof
  proofImages: string[];
  status: ClaimStatus;
  adminNotes?: string;
  pickupInstructions?: string;
  createdAt: string;
  updatedAt: string;
}

export type UserRole = 'student' | 'finder' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  department: string;
  studentId?: string;
  phone?: string;
  role: UserRole;
  avatar?: string;
}

export interface AppNotification {
  id: string;
  userId: string; // target user or "all"
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'claim';
  itemId?: string;
  claimId?: string;
  read: boolean;
  createdAt: string;
}

