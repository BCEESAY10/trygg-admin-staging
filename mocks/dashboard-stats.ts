/**=============================
 * Dashboard Statistical Data.
 =============================*/
export const dashboardStats = [
  {
    title: 'Transaction Value',
    value: '$124,850.00',
    icon: 'DollarSign',
    trend: { value: 12.5, isPositive: true },
  },
  {
    title: 'Total Drivers',
    value: '1,247',
    icon: 'Car',
    trend: { value: 8.2, isPositive: true },
  },
  {
    title: 'Total Passengers',
    value: '8,329',
    icon: 'Users',
    trend: { value: 15.3, isPositive: true },
  },
  {
    title: 'Total Referrals',
    value: '342',
    icon: 'Share2',
    trend: { value: 4.1, isPositive: false },
  },
];

/**============================
 * Recent Transactions Data.
 ============================*/
export const recentTransactions = [
  {
    id: '1',
    passenger: 'John Smith',
    driver: 'Mike Johnson',
    amount: '$25.50',
    dateTime: '2025-01-24 14:30',
  },
  {
    id: '2',
    passenger: 'Sarah Wilson',
    driver: 'David Brown',
    amount: '$18.75',
    dateTime: '2025-01-24 14:15',
  },
  {
    id: '3',
    passenger: 'Emily Davis',
    driver: 'James Miller',
    amount: '$32.00',
    dateTime: '2025-01-24 14:05',
  },
  {
    id: '4',
    passenger: 'Michael Chen',
    driver: 'Robert Garcia',
    amount: '$45.25',
    dateTime: '2025-01-24 13:45',
  },
  {
    id: '5',
    passenger: 'Lisa Anderson',
    driver: 'William Jones',
    amount: '$22.80',
    dateTime: '2025-01-24 13:30',
  },
  {
    id: '6',
    passenger: 'Chris Martinez',
    driver: 'Thomas Wilson',
    amount: '$38.90',
    dateTime: '2025-01-24 13:15',
  },
  {
    id: '7',
    passenger: 'Anna Taylor',
    driver: 'Charles Moore',
    amount: '$16.45',
    dateTime: '2025-01-24 13:00',
  },
  {
    id: '8',
    passenger: 'Mark Thompson',
    driver: 'Daniel Lee',
    amount: '$28.70',
    dateTime: '2025-01-24 12:45',
  },
  {
    id: '9',
    passenger: 'Rachel Green',
    driver: 'Kevin White',
    amount: '$34.15',
    dateTime: '2025-01-24 12:30',
  },
  {
    id: '10',
    passenger: 'Tom Wilson',
    driver: 'Steven Clark',
    amount: '$19.60',
    dateTime: '2025-01-24 12:15',
  },
];

/**==================================
 * Pending Driver Applications Data.
 ==================================*/
export const pendingDrivers = [
  {
    id: '1',
    profilePicture: '/profiles/profile-1.avif',
    name: 'Alex Rodriguez',
    appliedDate: '2025-01-23',
    vehicleType: 'Toyota Camry',
  },
  {
    id: '2',
    profilePicture: '/profiles/profile-2.avif',
    name: 'Maria Santos',
    appliedDate: '2025-01-23',
    vehicleType: 'Honda Civic',
  },
  {
    id: '3',
    profilePicture: '/profiles/profile-3.avif',
    name: 'Peter Kim',
    appliedDate: '2025-01-22',
    vehicleType: 'Ford Focus',
  },
  {
    id: '4',
    profilePicture: '/profiles/profile-4.avif',
    name: 'Jennifer Lopez',
    appliedDate: '2025-01-22',
    vehicleType: 'Nissan Altima',
  },
  {
    id: '5',
    profilePicture: '/profiles/profile-5.avif',
    name: 'Samuel Osei',
    appliedDate: '2025-01-21',
    vehicleType: 'Hyundai Elantra',
  },
  {
    id: '6',
    profilePicture: '/profiles/profile-6.avif',
    name: 'Chloe Dubois',
    appliedDate: '2025-01-21',
    vehicleType: 'Peugeot 208',
  },
  {
    id: '7',
    profilePicture: '/profiles/profile-7.avif',
    name: 'Liam Johnson',
    appliedDate: '2025-01-20',
    vehicleType: 'Chevrolet Malibu',
  },
  {
    id: '8',
    profilePicture: '/profiles/profile-8.avif',
    name: 'Fatima Diallo',
    appliedDate: '2025-01-20',
    vehicleType: 'Kia Optima',
  },
  {
    id: '9',
    profilePicture: '/profiles/profile-9.avif',
    name: 'Ivan Petrov',
    appliedDate: '2025-01-19',
    vehicleType: 'Skoda Octavia',
  },
  {
    id: '10',
    profilePicture: '/profiles/profile-10.avif',
    name: 'Nora Ahmed',
    appliedDate: '2025-01-19',
    vehicleType: 'Mazda 6',
  },
];

/**==========================
 * Driver Leaderboard Data.
 ==========================*/
export const driverLeaderboard = [
  {
    id: '1',
    profilePicture: '/profiles/profile-8.avif',
    name: 'Mike Johnson',
    rides: 84,
    rating: 4.9,
  },
  {
    id: '2',
    profilePicture: '/profiles/profile-3.avif',
    name: 'David Brown',
    rides: 78,
    rating: 4.8,
  },
  {
    id: '3',
    profilePicture: '/profiles/profile-10.avif',
    name: 'James Miller',
    rides: 72,
    rating: 4.7,
  },
  {
    id: '4',
    profilePicture: '/profiles/profile-4.avif',
    name: 'Robert Garcia',
    rides: 69,
    rating: 4.8,
  },
  {
    id: '5',
    profilePicture: '/profiles/profile-1.avif',
    name: 'William Jones',
    rides: 65,
    rating: 4.6,
  },
];

/**===========================
 * Document Expiring Data.
 ===========================*/
export const documentsExpiring = [
  {
    id: '1',
    profilePicture: '/profiles/profile-6.avif',
    driverName: 'Carlos Martinez',
    documentType: 'License',
    expiryDate: '2025-02-15',
    daysLeft: 21,
  },
  {
    id: '2',
    profilePicture: '/profiles/profile-2.avif',
    driverName: 'Ahmed Hassan',
    documentType: 'Insurance',
    expiryDate: '2025-02-08',
    daysLeft: 14,
  },
  {
    id: '3',
    profilePicture: '/profiles/profile-9.avif',
    driverName: 'John Parker',
    documentType: 'Registration',
    expiryDate: '2025-01-30',
    daysLeft: 5,
  },
  {
    id: '4',
    profilePicture: '/profiles/profile-7.avif',
    driverName: 'Liam Johnson',
    documentType: 'Registration',
    expiryDate: '2025-01-30',
    daysLeft: 5,
  },
];

/**=======================
 * Offline Drivers Data.
 =======================*/
export const offlineDrivers = [
  {
    id: '1',
    profilePicture: '/profiles/profile-4.avif',
    name: 'Lisa Thompson',
    lastSeen: '2 hours ago',
  },
  {
    id: '2',
    profilePicture: '/profiles/profile-7.avif',
    name: 'Mark Wilson',
    lastSeen: '4 hours ago',
  },
  {
    id: '3',
    profilePicture: '/profiles/profile-3.avif',
    name: 'Sarah Davis',
    lastSeen: '6 hours ago',
  },
  {
    id: '4',
    profilePicture: '/profiles/profile-10.avif',
    name: 'Tom Anderson',
    lastSeen: '8 hours ago',
  },
];
