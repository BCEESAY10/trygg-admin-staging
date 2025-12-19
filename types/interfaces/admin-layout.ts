import type { Meta } from '..';
import type { User } from '../user';

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  icon: string;
}

export interface DashboardLayoutProps {
  children?: React.ReactNode;
  title?: string;
  meta: Meta;
  user?: User;
  role: 'SUPER' | 'SUB';
}

export interface StatsCardProps {
  title: string;
  value: string | number;
  icon: string;
}

export interface TableColumn<T> {
  key: string;
  label: string;
  render?: (
    value: unknown,
    row: Record<string, unknown>,
    index?: number
  ) => React.ReactNode;
}

export interface ListTableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  title?: string;
}

export interface ExtendedListTableProps<T> extends ListTableProps<T> {
  onRowClick?: (row: T) => void;
}

export type Transaction = {
  transactionId: string;
  amount: string;
  createdAt: string;
  driverName: string;
  passengerName: string;
};

export type DriverStatus = {
  online: number;
  offline: number;
};

export type TopDriver = {
  name: string;
  averageRating: number;
  ridesCompleted: number;
  profilePicture: string;
};

export type PendingDriverApplication = {
  driverId: string;
  driverName: string;
  vehicleName: string;
  appliedAt: string;
  driverProfileImg: string;
};

export type DriverApplications = {
  totalApplications: number;
  approved: number;
  rejected: number;
  pending: number;
};

export type LicenseAlerts = {
  documentsExpiringSoon: number;
  sevenDaysToExpiry: number;
  remainingThirtyDaysToExpiry: number;
};

export type MonthlyRevenueEntry = {
  month: string;
  year: number;
  revenue: string;
};

export type MonthlyRevenue = {
  period: string;
  data: MonthlyRevenueEntry[];
};

export type DashboardStatsData = {
  transactionValue: string;
  totalDrivers: number;
  totalPassengers: number;
  totalReferrals: number;
  tenRecentTransactions: Transaction[];
  driverStatus: DriverStatus;
  topDriverThisMonth: TopDriver;
  pendingDriverApplications: PendingDriverApplication[];
  driverApplications: DriverApplications;
  licenseAlerts: LicenseAlerts;
  monthlyRevenue: MonthlyRevenue;
};

export type DashboardStatsResponse = {
  status: 'success';
  data: DashboardStatsData;
};
