/**=======================
 * REVIEWS INTERFACES
 =======================*/
export interface Review {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
  driver: {
    user: {
      fullName: string;
    };
  };
  user: {
    fullName: string;
    profilePicture: string;
  };
}

export interface ReviewResponse {
  status: string;
  data: {
    ratings: Review[];
    hasMore?: boolean;
    totalRatings: number;
    filters?: {};
    averageRating?: string;
  };
}

export interface StarRatingBreakdown {
  fiveStars: number;
  fourStars: number;
  threeStars: number;
  twoStars: number;
  oneStar: number;
}

export interface OverallRating {
  averageRating: number;
  totalRatings: number;
  breakdown: StarRatingBreakdown;
}

export interface TopDriver {
  driverName: string;
  userId: string;
  driverProfilePicture: string;
  averageRating: number;
}

export interface TopDriverResponse {
  status: string;
  data: TopDriver[];
}

export interface ReviewsPageData {
  overallRating: OverallRating;
  reviews: Review[];
  topDrivers: TopDriver[];
}
