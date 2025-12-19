export const AdminPageMeta = {
  dashboardPage: {
    title: 'Trygg Admin | Dashboard',
    description: 'Track all Trygg recent activites.',
  },

  driversPage: {
    title: 'Trygg Admin | Drivers',
    description: 'Track all Trygg drivers.',
  },

  driverDetailsPage: {
    title: 'Trygg Admin | Driver Details',
    description: 'View detailed information about a specific driver.',
  },

  passengersPage: {
    title: 'Trygg Admin | Passengers',
    description: 'Track all Trygg passengers.',
  },

  rideHistoryPage: {
    title: 'Trygg Admin | Ride History',
    description: 'Track all Trygg rides.',
  },

  reviewsPage: {
    title: 'Trygg Admin | Reviews & Feedback',
    description: 'View and manage reviews and feedback from users.',
  },

  categoriesPage: {
    title: 'Trygg Admin | Ride Categories',
    description: 'View and manage ride categories',
  },

  settingsPage: {
    title: 'Trygg Admin | Settings',
    description: 'Change your Trygg admin dashboard settings.',
  },
};

export const SuperAdminPageMeta = {
  ...AdminPageMeta,

  transactionPage: {
    title: 'Trygg Admin | Transactions',
    description: 'Track all Trygg transactions.',
  },

  subAdminsPage: {
    title: 'Trygg Admin | Sub Admins',
    description: 'Track all Trygg Sub Admins.',
  },
};
