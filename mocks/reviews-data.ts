import type {
  OverallRating,
  ReviewsPageData,
} from '@/types/interfaces/reviews';

/**=======================
 * OVERALL RATING DATA
 =======================*/
export const overallRatingData: OverallRating = {
  averageRating: 4.44,
  totalRatings: 23,
  breakdown: {
    fiveStars: 10,
    fourStars: 8,
    threeStars: 2,
    twoStars: 3,
    oneStar: 0,
  },
};

/**===============
 * REVIEWS DATA
 ===============*/
export const reviewsData: any[] = [
  {
    id: '1',
    reviewerId: 'PAX001',
    reviewerName: 'John Smith',
    reviewerAvatar: '/profiles/profile-1.avif',
    rating: 5,
    reviewText:
      'I recently used this taxi booking service and I was blown away by the exceptional service. The app was incredibly user-friendly and made booking a ride a breeze. The driver arrived on time and was incredibly polite and professional.',
    driverName: 'Ellen Tromp',
    date: '12 Jan 2025',
    createdAt: '2025-01-12T10:30:00Z',
  },
  {
    id: '2',
    reviewerId: 'PAX002',
    reviewerName: 'Sarah Wilson',
    reviewerAvatar: '/profiles/profile-2.avif',
    rating: 5,
    reviewText:
      'Outstanding service! The driver was courteous and professional. The vehicle was clean and comfortable. I will definitely use this service again for my future transportation needs.',
    driverName: 'Carlos Martinez',
    date: '12 Jan 2025',
    createdAt: '2025-01-12T09:15:00Z',
  },
  {
    id: '3',
    reviewerId: 'PAX003',
    reviewerName: 'Emily Davis',
    reviewerAvatar: '/profiles/profile-3.avif',
    rating: 5,
    reviewText:
      'Excellent experience from start to finish! The booking process was seamless, the driver arrived promptly, and the ride was smooth and comfortable. Highly recommended!',
    driverName: 'Ahmed Hassan',
    date: '11 Jan 2025',
    createdAt: '2025-01-11T16:45:00Z',
  },
  {
    id: '4',
    reviewerId: 'PAX004',
    reviewerName: 'Michael Chen',
    reviewerAvatar: '/profiles/profile-4.avif',
    rating: 4,
    reviewText:
      'Great service overall. The driver was friendly and the car was clean. Only minor issue was a slight delay in pickup, but communication was good throughout the journey.',
    driverName: 'John Parker',
    date: '11 Jan 2025',
    createdAt: '2025-01-11T14:20:00Z',
  },
  {
    id: '5',
    reviewerId: 'PAX005',
    reviewerName: 'Lisa Anderson',
    reviewerAvatar: '/profiles/profile-5.avif',
    rating: 5,
    reviewText:
      'Fantastic service! The driver was professional and knew all the best routes. The vehicle was spotless and the ride was very comfortable. Will definitely book again.',
    driverName: 'Liam Johnson',
    date: '10 Jan 2025',
    createdAt: '2025-01-10T18:30:00Z',
  },
  {
    id: '6',
    reviewerId: 'PAX006',
    reviewerName: 'Chris Martinez',
    reviewerAvatar: '/profiles/profile-6.avif',
    rating: 4,
    reviewText:
      'Very reliable service. The app is easy to use and the driver was punctual. Good value for money and I appreciate the transparent pricing structure.',
    driverName: 'Lisa Thompson',
    date: '10 Jan 2025',
    createdAt: '2025-01-10T13:10:00Z',
  },
  {
    id: '7',
    reviewerId: 'PAX007',
    reviewerName: 'Anna Taylor',
    reviewerAvatar: '/profiles/profile-7.avif',
    rating: 3,
    reviewText:
      'Decent service but there is room for improvement. The driver was polite but seemed unfamiliar with the route. The car was clean and comfortable though.',
    driverName: 'Mark Wilson',
    date: '09 Jan 2025',
    createdAt: '2025-01-09T11:45:00Z',
  },
  {
    id: '8',
    reviewerId: 'PAX008',
    reviewerName: 'Mark Thompson',
    reviewerAvatar: '/profiles/profile-8.avif',
    rating: 5,
    reviewText:
      'Exceptional service! The booking was quick and easy, the driver arrived exactly on time, and the journey was smooth. The vehicle was immaculate and well-maintained.',
    driverName: 'Sarah Davis',
    date: '09 Jan 2025',
    createdAt: '2025-01-09T08:25:00Z',
  },
];

/**==================
 * TOP DRIVERS DATA
 ==================*/
export const topDriversData: any[] = [
  {
    id: '1',
    driverId: 'DVR001',
    name: 'Ellen Tromp',
    avatar: '/profiles/profile-1.avif',
    rating: 4.9,
    totalTrips: 156,
    totalEarning: 15689.0,
    rank: 1,
  },
  {
    id: '2',
    driverId: 'DVR002',
    name: 'Carlos Martinez',
    avatar: '/profiles/profile-6.avif',
    rating: 4.8,
    totalTrips: 189,
    totalEarning: 18989.0,
    rank: 2,
  },
  {
    id: '3',
    driverId: 'DVR003',
    name: 'Ahmed Hassan',
    avatar: '/profiles/profile-2.avif',
    rating: 4.8,
    totalTrips: 134,
    totalEarning: 14567.0,
    rank: 3,
  },
  {
    id: '4',
    driverId: 'DVR004',
    name: 'John Parker',
    avatar: '/profiles/profile-9.avif',
    rating: 4.7,
    totalTrips: 145,
    totalEarning: 13456.0,
    rank: 4,
  },
  {
    id: '5',
    driverId: 'DVR005',
    name: 'Liam Johnson',
    avatar: '/profiles/profile-7.avif',
    rating: 4.7,
    totalTrips: 178,
    totalEarning: 16789.0,
    rank: 5,
  },
  {
    id: '6',
    driverId: 'DVR006',
    name: 'Lisa Thompson',
    avatar: '/profiles/profile-4.avif',
    rating: 4.6,
    totalTrips: 123,
    totalEarning: 12345.0,
    rank: 6,
  },
  {
    id: '7',
    driverId: 'DVR007',
    name: 'Mark Wilson',
    avatar: '/profiles/profile-7.avif',
    rating: 4.6,
    totalTrips: 167,
    totalEarning: 15234.0,
    rank: 7,
  },
  {
    id: '8',
    driverId: 'DVR008',
    name: 'Sarah Davis',
    avatar: '/profiles/profile-3.avif',
    rating: 4.5,
    totalTrips: 198,
    totalEarning: 17890.0,
    rank: 8,
  },
  {
    id: '9',
    driverId: 'DVR009',
    name: 'Tom Anderson',
    avatar: '/profiles/profile-10.avif',
    rating: 4.5,
    totalTrips: 156,
    totalEarning: 14678.0,
    rank: 9,
  },
  {
    id: '10',
    driverId: 'DVR010',
    name: 'Jennifer Lopez',
    avatar: '/profiles/profile-1.avif',
    rating: 4.4,
    totalTrips: 134,
    totalEarning: 13567.0,
    rank: 10,
  },
];

/**=======================
 * COMPLETE REVIEWS DATA
 =======================*/
export const reviewsPageData: ReviewsPageData = {
  overallRating: overallRatingData,
  reviews: reviewsData,
  topDrivers: topDriversData,
};
