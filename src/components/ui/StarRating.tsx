import styles from '@/src/styles/StarRating.module.css';
import type { StarRatingProps } from '@/types/interfaces/drivers';

const StarRating = ({ rating, maxStars = 5 }: StarRatingProps) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = maxStars - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className={styles.star__rating}>
      {/*==================== Full Stars ====================*/}
      {[...Array(fullStars)].map((_, i) => (
        <span
          key={`full-${i}`}
          className={`${styles.star} ${styles.star__filled}`}
        >
          ★
        </span>
      ))}
      {/*==================== End of Full Stars ====================*/}

      {/*==================== Half Star ====================*/}
      {hasHalfStar && (
        <span className={`${styles.star} ${styles.star__half}`}>★</span>
      )}
      {/*==================== End of Half Star ====================*/}

      {/*==================== Empty Stars ====================*/}
      {[...Array(emptyStars)].map((_, i) => (
        <span
          key={`empty-${i}`}
          className={`${styles.star} ${styles.star__empty}`}
        >
          ★
        </span>
      ))}
      {/*==================== End of Empty Stars ====================*/}
    </div>
  );
};

export default StarRating;
