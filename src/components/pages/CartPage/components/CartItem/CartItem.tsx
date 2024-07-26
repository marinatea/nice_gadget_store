import { ICartProduct, Icons, ProductT } from '../../../../../types';
import {
  patchCartItemCount,
  removeFromCart,
} from '../../../../../slices/cartSlice';
import {
  useAppDispatch,
  useCartSelector,
  useProductsSelector,
} from '../../../../../hooks/reduxHooks';

import Button from '../../../../generic/Button/Button';
import { Link } from 'react-router-dom';
import styles from './CartItem.module.scss';
import { useUser } from '@clerk/clerk-react';

const CartItem: React.FC = () => {
  const { cart } = useCartSelector((state) => state);
  const dispatch = useAppDispatch();
  const { user } = useUser();
  const { allProducts } = useProductsSelector((state) => state);

  const productForLink = (prod: ICartProduct) =>
    allProducts.find((p: ProductT) => p.name === prod.name);

  return (
    <div className={styles['cart-item-container']}>
      {Object.values(cart).map((product) => {
        return (
          <div className={styles['cart-item']} key={product.id}>
            <div className={styles['first-row']}>
              <Button
                onClick={() => {
                  dispatch(
                    removeFromCart({
                      itemId: product.id,
                      userId: user?.id as string,
                    }),
                  );
                }}
                className={styles['close-icon']}
                title=""
                type="secondary"
                icon={Icons.CLOSE}
              />
              <div className={styles['phone-container']}>
                <img
                  className={styles['image']}
                  src={product.image}
                  alt={product.name}
                />
              </div>
              <Link
                to={`/${productForLink(product)?.category}/${productForLink(product)?.itemId}`}
                className={styles['name']}
              >
                {product.name}
              </Link>
            </div>
            <div className={styles['second-row']}>
              <div className={styles['counter']}>
                <Button
                  onClick={() => {
                    dispatch(
                      patchCartItemCount({
                        itemId: product.id,
                        userId: user?.id as string,
                        newCount: product.count - 1,
                      }),
                    );
                  }}
                  type="secondary"
                  className={styles['minus-button']}
                  icon={Icons.MINUS}
                />
                <div className={styles['count']}>{product.count}</div>
                <Button
                  onClick={() => {
                    dispatch(
                      patchCartItemCount({
                        itemId: product.id,
                        userId: user?.id as string,
                        newCount: product.count + 1,
                      }),
                    );
                  }}
                  type="secondary"
                  className={styles['plus-button']}
                  icon={Icons.PLUS}
                />
              </div>
              <div className={styles['price']}>
                ${product.price * product.count}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CartItem;
