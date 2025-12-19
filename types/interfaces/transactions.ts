export interface Transaction {
  id: string;
  rideId: string;
  amount: number;
  type: string;
  status: string;
  description: string;
  referenceNumber: string;
  createdAt: string;
  ride: Ride;
  recipientUser: DriverUser;
  sourceUser: BasicUser;
}

export interface SimplifiedTransaction {
  id: string;
  recipientUser: string;
  recipientAvatar: string;
  sourceUser: string;
  sourceAvatar: string;
  description: string;
  amount: number;
  type: string;
  paymentMethod: string;
  status: string;
  createdAt: string;
}

export interface Location {
  address: string;
  latitude: number;
  longitude: number;
}

export interface Ride {
  id: string;
  userId: string;
  driverId: string;
  vehicleId: string;
  categoryId: string;
  pickupLocation: Location;
  destination: Location;
  status: string;
  estimatedDistance: number;
  estimatedDuration: number;
  estimatedFare: number;
  actualFare: number;
  paymentStatus: string;
  paymentMethodUsed: string;
  requestedAt: string;
  acceptedAt: string;
  arrivedAt: string;
  startedAt: string;
  completedAt: string;
  cancelledAt: string | null;
  cancellationReason: string | null;
  cancelledBy: string | null;
  couponId: string | null;
  authorizationLink: string;
  authorizationId: string;
  acceptanceCode: string;
}

export interface BasicUser {
  id: string;
  email: string;
  phone: string;
  profilePicture: string;
  role: string;
  fullName: string;
}

export interface DriverUser {
  id: string;
  licenseNumber: string;
  licenseExpiry: string;
  status: string;
  rejectionReason: string | null;
  applicationStatus: string;
  averageRating: number | null;
  totalRatings: number;
  user: BasicUser;
}

export interface TransactionResponse {
  status: string;
  data: {
    transactions: Transaction[];
    hasMore: boolean;
    totalTransactions: number;
    currentPage: number;
    filters: {
      searchQuery: string;
    };
  };
}

export interface TransactionsFilterState {
  search: string;
  status: string;
  paymentMethod: string;
  dateFrom: string;
  dateTo: string;
}

export interface TransactionFiltersProps {
  filters: TransactionsFilterState;
  onFilterChange: (key: keyof TransactionsFilterState, value: string) => void;
  onResetFilters: () => void;
}

// export interface TransactionTrendData {
//   day: string;
//   revenue: number;
//   transactions: number;
// }

// export interface TransactionVolumeData {
//   month: string;
//   completed: number;
//   pending: number;
//   failed: number;
// }

export interface PaymentMethodData {
  method: string;
  count: number;
  percentage: number;
}

export interface TransactionLineChartProps {
  data: WeeklyTrendEntry[];
  title: string;
}

export interface TransactionBarChartProps {
  data: MonthlyRevenueEntry[];
  title: string;
}

export interface TransactionTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    name: string;
    color: string;
  }>;
  label?: string;
}

// === Transaction Stats ===
export interface MonthlyRevenueEntry {
  month: string;
  year: number;
  revenue: string;
}

export interface MonthlyRevenue {
  period: string;
  data: MonthlyRevenueEntry[];
}

export interface MonthlyRevenueProps {
  data: MonthlyRevenue;
  title: string;
}

export interface WeeklyTrendEntry {
  day: string;
  revenue: number;
  transactionCount: number;
  date: string;
  formattedRevenue: string;
}

export interface WeeklyTrends {
  period: string;
  data: WeeklyTrendEntry[];
  totalRevenue: number;
  totalTransactions: number;
}

export interface RevenueDashboardData {
  totalRevenue: string;
  transactionCount: number;
  averageTransaction: string;
  successRate: string;
  monthlyRevenue: MonthlyRevenue;
  weeklyTrends: WeeklyTrends;
}

export interface RevenueDashboardResponse {
  status: string;
  data: RevenueDashboardData;
}
