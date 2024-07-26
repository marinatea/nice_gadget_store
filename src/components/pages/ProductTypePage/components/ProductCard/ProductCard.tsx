import { useEffect, useState } from 'react';
import { Icons, ProductT } from '../../../../../types';
import {
  addToFavorites,
  removeFromFavorites,
} from '../../../../../slices/favoriteSlice';
import {
  useAppDispatch,
  useCartSelector,
  useFavoritesSelector,
} from '../../../../../hooks/reduxHooks';
import Button from '../../../../generic/Button/Button';
import Icon from '../../../../generic/Icon/Icon';
import classnames from 'classnames';
import styles from './ProductCard.module.scss';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { addToCart } from '../../../../../slices/cartSlice';

interface Props {
  product: ProductT;
  isSlider?: boolean;
}

const ProductCard: React.FC<Props> = ({ product, isSlider }) => {
  const { cart } = useCartSelector((state) => state);
  const { favorites } = useFavoritesSelector((state) => state);
  const dispatch = useAppDispatch();
  const { user, isSignedIn } = useUser();
  const navigate = useNavigate();

  const {
    itemId: id,
    name,
    capacity,
    ram,
    price,
    fullPrice,
    screen,
    image,
  } = product;

  const isProductInCart = Object.hasOwn(cart, id);
  const cartProduct = {
    id,
    name,
    image,
    price,
  };

  const favoriteCard: ProductT = {
    name: product.name,
    capacity,
    color: product.color,
    screen,
    ram,
    id: product.id,
    category: 'phones',
    itemId: product.itemId,
    fullPrice: product.fullPrice,
    price: product.price,
    year: product.year,
    image: product.image,
  };

  const isProductInFavorites = favorites.some((item) => item.name === name);

  const [icon, setIcon] = useState(
    isProductInFavorites ? Icons.HEART_FILL : Icons.HEART,
  );

  useEffect(() => {
    setIcon(
      favorites.some((item) => item.name === name)
        ? Icons.HEART_FILL
        : Icons.HEART,
    );
  }, [favorites, name]);

  const handleFavoriteClick = () => {
    if (isSignedIn) {
      if (isProductInFavorites) {
        dispatch(
          removeFromFavorites({
            itemId: favoriteCard.itemId,
            userId: user?.id as string,
          }),
        );

        setIcon(Icons.HEART);
      } else {
        dispatch(
          addToFavorites({ newItem: favoriteCard, userId: user?.id as string }),
        );

        setIcon(Icons.HEART_FILL);
      }
    } else {
      navigate('/signin/');
    }
  };

  const link = '/' + product.category + '/' + product.itemId;

  return (
    <div
      className={classnames(
        {
          [styles['slider-card-container']]: isSlider,
          [styles['container']]: !isSlider,
        },
        '__app-phone-card-container',
      )}
      data-cy="cardsContainer"
    >
      <a href={link} className={styles['link']}>
        <img
          className={classnames({
            [styles['slider-card-image']]: isSlider,
            [styles['image']]: !isSlider,
          })}
          src={image}
          alt={name}
        />
      </a>
      <a href={link} className={styles['name']}>
        {name}
      </a>
      <div className={styles['price']}>
        <span className={styles['current-price']}>{`$${price}`}</span>
        <span className={styles['full-price']}>{`$${fullPrice}`}</span>
      </div>
      <ul className={styles['details-list']}>
        <li className={styles['details-item']}>
          <span className={styles['details-title']}>Screen</span>
          <span>{screen}</span>
        </li>
        <li className={styles['details-item']}>
          <span className={styles['details-title']}>Capacity</span>
          <span>{capacity}</span>
        </li>
        <li className={styles['details-item']}>
          <span className={styles['details-title']}>RAM</span>
          <span>{ram}</span>
        </li>
      </ul>
      <div className={styles['buttons']}>
        <Button
          onClick={() => {
            if (isSignedIn) {
              dispatch(
                addToCart({
                  newItem: { ...cartProduct, count: 1 },
                  userId: user?.id as string,
                }),
              );
            } else {
              navigate('/signin/');
            }
          }}
          isSelected={isProductInCart}
          className={styles['add-to-card']}
          title={isProductInCart ? 'Added to cart' : 'Add to cart'}
          isDisabled={isProductInCart}
        />
        <Icon
          onClick={handleFavoriteClick}
          className={styles['add-to-favorite']}
          iconId={icon}
        />
      </div>
    </div>
  );
};

export default ProductCard;
