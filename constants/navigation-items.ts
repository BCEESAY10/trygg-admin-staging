import type { NavigationItem } from '@/types/interfaces/admin-layout';

export const subAdminNavigationItems: NavigationItem[] = [
  {
    id: 'dashboard',
    label: 'layout.dashboard',
    href: '/sub-admin',
    icon: 'LayoutDashboard',
  },
  {
    id: 'drivers',
    label: 'layout.drivers',
    href: '/sub-admin/drivers',
    icon: 'Car',
  },
  {
    id: 'passengers',
    label: 'layout.passengers',
    href: '/sub-admin/passengers',
    icon: 'Users',
  },
  {
    id: 'rides',
    label: 'layout.rideHistory',
    href: '/sub-admin/ride-history',
    icon: 'Route',
  },
  {
    id: 'categories',
    label: 'Ride Categories',
    href: '/sub-admin/categories',
    icon: 'Tag',
  },
  {
    id: 'reviews',
    label: 'layout.reviews',
    href: '/sub-admin/reviews',
    icon: 'StarIcon',
  },
  {
    id: 'settings',
    label: 'layout.settings',
    href: '/sub-admin/settings',
    icon: 'Settings',
  },
];

export const superAdminNavigationItems: NavigationItem[] = [
  {
    id: 'dashboard',
    label: 'layout.dashboard',
    href: '/super-admin',
    icon: 'LayoutDashboard',
  },
  {
    id: 'drivers',
    label: 'layout.drivers',
    href: '/super-admin/drivers',
    icon: 'Car',
  },
  {
    id: 'passengers',
    label: 'layout.passengers',
    href: '/super-admin/passengers',
    icon: 'Users',
  },
  {
    id: 'rides',
    label: 'layout.rideHistory',
    href: '/super-admin/ride-history',
    icon: 'Route',
  },
  {
    id: 'categories',
    label: 'layout.categories',
    href: '/super-admin/categories',
    icon: 'Tag',
  },
  {
    id: 'reviews',
    label: 'layout.reviews',
    href: '/super-admin/reviews',
    icon: 'StarIcon',
  },
  {
    id: 'transactions',
    label: 'layout.transactions',
    href: '/super-admin/transactions',
    icon: 'CreditCard',
  },
  {
    id: 'subadmins',
    label: 'layout.admins',
    href: '/super-admin/sub-admins',
    icon: 'User',
  },
  {
    id: 'settings',
    label: 'layout.settings',
    href: '/super-admin/settings',
    icon: 'Settings',
  },
];
