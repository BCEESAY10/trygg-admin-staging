export interface AddressPoint {
  address: string;
  latitude: number;
  longitude: number;
}

export type RideStatus = 'COMPLETED' | 'NO_DRIVERS_FOUND' | 'CANCELLED_BY_USER';

export type CancelledBy = 'USER' | 'DRIVER' | 'SYSTEM' | null;

// user/driver/category/vehicle shapes
export interface RideUserMini {
  fullName: string;
  profilePicture: string | null;
}

export interface RideDriverMini {
  id: string;
  userId: string;
  licenseNumber: string;
  licenseExpiry: string;
  status: 'ACTIVE' | 'INACTIVE';
  rejectionReason: string | null;
  applicationStatus: 'APPROVED' | 'PENDING_APPROVAL' | 'REJECTED';
  averageRating: number | null;
  totalRatings: number;
  createdAt: string;
  updatedAt: string;
  user: RideUserMini;
}

export interface RideCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  basePrice: number;
  pricePerKm: number;
  pricePerMinute: number;
  minimumFare: number;
  active: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface RideVehicle {
  id: string;
  driverId: string;
  model: string;
  make: string;
  year: string;
  color: string;
  licensePlate: string;
  capacity: number;
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: string;
  updatedAt: string;
}

// Main API model
export interface Ride {
  id: string;
  userId: string;
  driverId: string | null;
  vehicleId: string | null;
  categoryId: string;

  pickupLocation: AddressPoint;
  destination: AddressPoint;

  status: RideStatus;

  estimatedDistance: number;
  estimatedDuration: number;
  estimatedFare: number;
  actualFare: number | null;

  paymentStatus: 'PAID';
  paymentMethodUsed: string | null;

  requestedAt: string;
  acceptedAt: string | null;
  arrivedAt: string | null;
  startedAt: string | null;
  completedAt: string | null;
  cancelledAt: string | null;

  cancellationReason: string | null;
  cancelledBy: CancelledBy;

  couponId: string | null;
  authorizationLink: string | null;
  authorizationId: string | null;

  user: RideUserMini;
  driver: RideDriverMini | null;
  category: RideCategory;
  vehicle: RideVehicle | null;
}

// response
export interface RidesResponse {
  status: 'success';
  data: {
    rides: Ride[];
    hasMore?: boolean;
    totalRides?: number;
    filters?: { searchQuery: string };
  };
}

// UI row type
export interface RideRow {
  rideId: string;
  passenger: string;
  passengerAvatar: string | null;
  driver: string;
  driverAvatar: string;
  pickupLocation: string;
  dropoffLocation: string;
  distance: number;
  duration: number;
  fare: number;
  status: RideStatus;
  dateTime: string;
}

// helper to map AP
export const toRideRow = (r: Ride): RideRow => ({
  rideId: r.id,
  status: r.status,
  passenger: r.user.fullName,
  passengerAvatar: r.user.profilePicture ?? null,
  driver: r.driver?.user.fullName ?? 'N/A',
  driverAvatar: r.driver?.user.profilePicture ?? '/profiles/profile-1.avif',
  pickupLocation: r.pickupLocation.address,
  dropoffLocation: r.destination.address,
  distance: r.estimatedDistance,
  duration: r.estimatedDuration,
  fare: r.actualFare ?? r.estimatedFare,
  dateTime: r.requestedAt,
});

export interface RidesFilterState {
  search: string;
  status: string;
  dateFrom: string;
  dateTo: string;
}

export interface RideFiltersProps {
  filters: RidesFilterState;
  onFilterChange: (key: keyof RidesFilterState, value: string) => void;
  onResetFilters: () => void;
}

// Stats
export interface RidesStats {
  totalRides: number;
  activeRides: number;
  ridesCompletedToday: number;
  averageDistance: string;
}

export interface RidesStatsResponse {
  status: string;
  data: RidesStats;
}
