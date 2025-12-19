import { useState } from 'react';

import { Tag } from 'lucide-react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import CategoryUpdateDropdown from '@/components/dropdowns/CategoryUpdateDropdown';
import CategoriesFilters from '@/components/filters/CategoriesFilters';
import CategoriesSkeleton from '@/components/shared/categories/categories-skeleton';
import ErrorState from '@/components/ui/ErrorState';
import ListTable from '@/components/ui/ListTable';
import { useFetchAllCategories } from '@/hooks/useFetchCategories';
//import { CategoryModal } from '@/components/categories/CategoryModal';
import { useUpdateCategory } from '@/hooks/useUpdateCategory';
import styles from '@/src/styles/categories/Category.module.css';
import type { TableColumn } from '@/types/interfaces/admin-layout';
import type {
  RideCategoriesFilterState,
  RideCategory,
} from '@/types/interfaces/ride-categories';

const CategoriesPageComponent = () => {
  const { t } = useTranslation('translation');

  const [filters, setFilters] = useState<RideCategoriesFilterState>({
    search: '',
  });

  const [currentPage, setCurrentPage] = useState(0);

  const entriesPerPage = 15;
  const lang = localStorage.getItem('language') ?? 'sv';

  // ==== Fetch All Categories ====
  const { data, isLoading, refetch, isError, error } = useFetchAllCategories(
    currentPage,
    entriesPerPage,
    filters.search,
    lang
  );

  //const { mutate } = useCreateCategory();
  // const {
  //   mutate: toggleCategory,
  //   isError: isToggleError,
  //   error: toggleError,
  // } = useToggleCategoryStatus();

  const { mutate: updateCategory } = useUpdateCategory();

  // ==== Create a Category =====
  //   const handleCreateCategory = (formData: CategoryFormData) => {
  //     mutate(formData, {
  //       onSuccess: data => {
  //         Swal.fire({
  //           title: t('categories.success'),
  //           text: t('categories.created'),
  //           icon: 'success',
  //           iconColor: '#30a702',
  //         });
  //         console.log(data);
  //       },
  //       onError: error => {
  //         Swal.fire(t('categories.error'), t('categories.failed'), 'error');
  //         console.log(error);
  //       },
  //     });
  //   };

  // const handleUpdateStatus = (id: string) => {
  //   if (id === '') {
  //     return toast.success(t('categories.toastMsg'));
  //   }
  //   if (isToggleError) {
  //     return <ErrorState title={t('modal.errorTitle')} message={toggleError} />;
  //   }
  //   toggleCategory(
  //     { id },
  //     {
  //       onSuccess: _data => {
  //         toast.success(t('modal.success'));
  //       },
  //       onError: _data => {
  //         toast.error(t('modal.error'));
  //       },
  //     }
  //   );
  // };

  const handleUpdateCategory = (
    id: string,
    updates: {
      basePrice: number;
      pricePerKm: number;
      minimumFare: number;
    }
  ) => {
    updateCategory(
      { id, ...updates },
      {
        onSuccess: () => {
          toast.success(t('categories.updateSuccess'));
          refetch();
        },
        onError: () => {
          toast.error(t('categories.updateError'));
        },
      }
    );
  };

  const handleFilterChange = (
    key: keyof RideCategoriesFilterState,
    value: string
  ) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(0);
  };

  const handleResetFilters = () => {
    setFilters({ search: '' });
    setCurrentPage(0);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page - 1);
  };

  const categoriesColumns: TableColumn<RideCategory>[] = [
    {
      key: 'id',
      label: 'ID',
      render: (_value, _row, index) => <span>{index! + 1}</span>,
    },
    { key: 'name', label: t('categories.name') },
    { key: 'description', label: t('categories.description') },
    { key: 'basePrice', label: t('categories.basePrice') },
    { key: 'pricePerKm', label: t('categories.pricePerKm') },
    { key: 'minimumFare', label: t('categories.minimumFare') },
    {
      key: 'action',
      label: t('admins.action'),
      render: (_, row) => {
        const category = row as unknown as RideCategory;
        return (
          <CategoryUpdateDropdown
            category={category}
            onUpdate={handleUpdateCategory}
          />
        );
      },
    },
  ];

  const categories = data?.data.categories ?? [];
  const totalEntries = data?.data.totalCategories ?? 0;
  const totalPages = Math.ceil(totalEntries / entriesPerPage);

  const startIndex = currentPage * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;

  if (isError)
    return (
      <ErrorState
        title={t('modal.errorTitle')}
        message={error.message}
        onRetry={refetch}
        retryLabel={t('modal.retry')}
        showRetryButton
      />
    );

  const getPaginationButtons = () => {
    const buttons: number[] = [];
    const maxButtons = 5;
    const currentPageUI = currentPage + 1;

    let startPage = Math.max(1, currentPageUI - Math.floor(maxButtons / 2));
    const endPage = Math.min(totalPages, startPage + maxButtons - 1);

    if (endPage - startPage + 1 < maxButtons) {
      startPage = Math.max(1, endPage - maxButtons + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(i);
    }

    return buttons;
  };

  return (
    <>
      <div className={styles.categories__page}>
        {/*==================== Two Column Layout ====================*/}
        {/* <div className={styles.two__column__layout}> */}
        {/*==================== Left Column - Create Categories Form ====================*/}
        {/* <div className={styles.left__column}>
            <CreateCategoryForm onSubmit={handleCreateCategory} />
          </div> */}
        {/*==================== End of Left Column ====================*/}

        {/*==================== Right Column - Ride Categories List ====================*/}
        {/* <div className={styles.right__column}> */}
        {/*==================== Filters Section ====================*/}
        <CategoriesFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
        />
        {/*==================== End of Filters Section ====================*/}

        {/*==================== Categories Table ====================*/}
        <div className={styles.table__with__icon}>
          <Tag size={20} color="#fbbf24" />
          {isLoading ? (
            <CategoriesSkeleton />
          ) : (
            <ListTable
              title={t('categories.categoriesList')}
              data={categories}
              columns={categoriesColumns}
            />
          )}
        </div>

        {/*==================== Pagination Section ====================*/}
        <div className={styles.pagination__section}>
          <div className={styles.pagination__info}>
            {t('pagination.showing')} {startIndex + 1} {t('pagination.to')}{' '}
            {Math.min(endIndex, totalEntries)} {t('pagination.of')}{' '}
            {totalEntries} {t('pagination.entries')}
          </div>

          <div className={styles.pagination__controls}>
            <button
              onClick={() => handlePageChange(currentPage)}
              disabled={currentPage === 0}
              className={styles.pagination__button}
            >
              {t('pagination.previous')}
            </button>

            {getPaginationButtons().map(page => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`${styles.pagination__button} ${currentPage + 1 === page ? styles.active : ''}`}
              >
                {page}
              </button>
            ))}

            <button
              disabled={currentPage + 1 === totalPages}
              className={styles.pagination__button}
              onClick={() => handlePageChange(currentPage + 2)}
            >
              {t('pagination.next')}
            </button>
          </div>
        </div>
      </div>
      {/*==================== End of Right Column ====================*/}
      {/* </div> */}
      {/* </div> */}
      {/*==================== End of Two Column Layout ====================*/}
    </>
  );
};

export default CategoriesPageComponent;
