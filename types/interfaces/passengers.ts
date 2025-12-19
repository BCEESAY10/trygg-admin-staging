export interface Passenger {
  id: string;
  email: string;
  token?: string;
  fullName: string;
  profilePicture: string;
  phone: string;
  lastLogin?: string;
  status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
}

export interface PassengersFilterState {
  search: string;
  rating: string;
  status: string;
}

export interface PassengerFiltersProps {
  filters: PassengersFilterState;
  onFilterChange: (key: keyof PassengersFilterState, value: string) => void;
  onResetFilters: () => void;
}

export interface PassengerStats {
  totalPassengers: number;
  activeThisMonth: number;
  newRegistrations: number;
  averageSpending: string;
}

export interface PassengerStatsResponse {
  status: string;
  data: PassengerStats;
}
