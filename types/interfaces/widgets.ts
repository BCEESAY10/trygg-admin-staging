export interface TopDriverData {
  name: string;
  profilePicture: string;
  averageRating: number;
  ridesCompleted: number;
}

export interface DriverStatusData {
  online: number;
  offline: number;
}

export interface AlertsSummaryData {
  documentsExpiringSoon: number;
  sevenDaysToExpiry: number;
  remainingThirtyDaysToExpiry: number;
}

export interface DriverApplicationStatsData {
  totalApplications: number;
  approved: number;
  pending: number;
  rejected: number;
}

export interface TopDriverWidgetProps {
  data: TopDriverData;
}

export interface DriverStatusWidgetProps {
  data: DriverStatusData;
}

export interface AlertsSummaryWidgetProps {
  data: AlertsSummaryData;
}

export interface DriverApplicationStatsWidgetProps {
  data: DriverApplicationStatsData;
}
