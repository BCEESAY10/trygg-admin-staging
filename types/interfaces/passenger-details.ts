/**===============================
 * PASSENGER DETAILS INTERFACES
 ===============================*/
export interface PassengerDetails {
  id: string;
  email: string;
  phone: string;
  fullName: string;
  profilePicture: string;
  role: string;
  biometricEnabled: boolean;
  status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
  lastLogin: string;
  preferredLanguage: string;
  referralCode: string;
  referredBy?: string;
  referredById?: string;
}

export interface PassengerDetailsResponse {
  status: string;
  data: PassengerDetails;
}

export interface PassengerDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPassengerId: string;
}

export interface PassengerInfoCardProps {
  passenger: PassengerDetails;
}
