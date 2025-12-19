export interface DriverDetails {
  id: string; // userId
  email: string;
  phone: string;
  fullName: string;
  profilePicture: string;
  status: 'ACTIVE' | 'INACTIVE' | 'PENDING';
  createdAt: string;
  updatedAt: string;
  lastLogin: string | null;

  driverData: {
    id: string;
    userId: string;
    licenseNumber: string;
    licenseExpiry: string;
    status: 'ACTIVE' | 'INACTIVE';
    applicationStatus:
      | 'APPROVED'
      | 'PENDING_APPROVAL'
      | 'REJECTED'
      | 'SUSPENDED';
    averageRating: number | null;
    totalRatings: number;
    createdAt: string;
    updatedAt: string;

    vehicle: {
      id: string;
      driverId: string;
      model: string;
      make: string;
      year: string;
      color: string;
      licensePlate: string;
      capacity: number;
      status: string;
      createdAt: string;
      updatedAt: string;
    };
  };
}

export interface DriverDetailsModalProps {
  onClose: () => void;
  selectedDriverId: string;
}

export interface DriverInfoCardProps {
  driverData: DriverDetails | null;
}
