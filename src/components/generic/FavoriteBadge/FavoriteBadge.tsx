import styles from './FavoriteBadge.module.scss';
import { useFavoritesSelector } from '../../../hooks/reduxHooks';

const FavoriteBadge: React.FC = () => {
  const favorites = useFavoritesSelector(state => state.favorites);

  return (
    <div className={styles['favorite-badge']}>
      <span className={styles['quantity']}>{favorites.length}</span>
    </div>
  );
};

export default FavoriteBadge;
