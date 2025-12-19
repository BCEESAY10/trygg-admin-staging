export interface DriversResponse {
  status: string;
  data: {
    drivers: Driver[];
    hasMore: boolean;
    totalDrivers: number;
    filters: { searchQuery: string };
  };
}

export interface Driver {
  id: string;
  userId: string;
  licenseNumber: string;
  licenseExpiry: string;
  status: 'ACTIVE' | 'INACTIVE';
  rejectionReason: string | null;
  applicationStatus: 'PENDING_APPROVAL' | 'APPROVED' | 'REJECTED';
  averageRating: number | null;
  totalRatings: number;
  createdAt: string | Date;
  updatedAt: string | Date;
  user: {
    id: string;
    email: string;
    phone: string;
    fullName: string;
    profilePicture: string;
  };
  reason?: string;
}

export interface PartialDriver extends Partial<Driver> {}

export interface DriverLocationData {
  driverId: string;
  userId: string;
  fullName: string;
  email: string | null;
  profilePicture: string | null;
  location: { latitude: number; longitude: number };
  timestamp: string;
  status: string;
}

export interface DriverMapProps {
  drivers: DriverLocationData[];
  count?: number;
  timestamp?: string;
}

export interface GetDriversInput {
  searchTerm?: string;
  page: number;
  limit: number;
  ratings?: number;
  status?: string;
  startDate?: string;
  endDate?: string;
  paymentMethod?: string;
}

export interface DriverStats {
  totalDrivers: number;
  totalActiveDrivers: number;
  averageRating: string;
  totalPayouts: string;
}

export interface DriverStatsResponse {
  status: string;
  data: DriverStats;
}
