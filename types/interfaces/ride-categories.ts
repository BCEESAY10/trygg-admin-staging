export interface RideCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  basePrice: number;
  pricePerKm: number;
  pricePerMinute: number;
  minimumFare: number;
  sortOrder: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface RideCategoryResponse {
  status: string;
  data: {
    categories: RideCategory[];
    hasMore: boolean;
    totalCategories?: number;
    filters: { searchQuery: string };
  };
}

export interface KmRange {
  id: string;
  categoryId: string;
  fromKm: number;
  toKm: number;
  pricePerKm: number;
  createdAt: string;
}

export interface RideCategoriesFilterState {
  search: string;
}

export interface RideCategoriesFilterProps {
  filters: RideCategoriesFilterState;
  onFilterChange: (key: keyof RideCategoriesFilterState, value: string) => void;
  onResetFilters: () => void;
}

export interface CategoryFormData {
  name: string;
  icon: string;
  description: string;
  basePrice: number;
  pricePerKm: number;
  minimumFare: number;
  sortOrder: number;
  active: boolean;
}

export interface NewRangeFormData {
  fromKm: number;
  toKm: number;
  pricePerKm: number;
}

export interface CategoryFormProps {
  onSubmit: (data: CategoryFormData) => void;
  initialData?: Partial<CategoryFormData>;
  isEditing?: boolean;
}

export interface NewRangeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: NewRangeFormData) => void;
  categoryId: string;
}

export interface CategoryDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: RideCategory | null;
}

export interface RideCategoriesComponentProps {
  canCreate?: boolean;
  canEdit?: boolean;
  canDelete?: boolean;
}

export interface CategoryFilters {
  page: number;
  limit: number;
  searchTerm?: string;
  preferredLanguage?: string;
}

export interface CategoryToggleProps {
  active: boolean;
  onToggle: (newState: boolean) => void;
}
