import Banner from './components/Banner/Banner';
import { Link } from 'react-router-dom';
import ProductsSlider from '../../generic/ProductsSlider/ProductsSlider';
import SearchBar from './components/SearchBar/SearchBar';
import styles from './HomePage.module.scss';
import { useProductsSelector } from '../../../hooks/reduxHooks';
import { useUser } from '@clerk/clerk-react';
import Loader from '../../generic/Loader/Loader';

const HomePage: React.FC = () => {
  const { phones, tablets, accessories, newModels, hotPrices } =
    useProductsSelector(state => state);
  const { user } = useUser();

  const isLoading = useProductsSelector(state => state.isLoading);

  if (isLoading) {
    return <Loader />;
  }

  const categories = [
    { title: 'Mobile phones', type: 'phones', count: phones.length },
    { title: 'Tablets', type: 'tablets', count: tablets.length },
    { title: 'Accessories', type: 'accessories', count: accessories.length },
  ];

  return (
    <main className={styles['home-page']}>
      <SearchBar />
      <h1 className={styles['title']}>
        Hey{user?.firstName && ' '}
        {user?.firstName}, welcome to Nice Gadgets store!
      </h1>
      <div className={styles['slider']}>
        <Banner />
      </div>
      <div className={styles['new-models']}>
        <ProductsSlider title="Brand new models" products={newModels} />
      </div>
      <div className={styles['categories']}>
        <h2 className={styles['categories-title']}>Shop by category</h2>
        {categories[0].count !== 0 &&
          categories.map(({ title, type, count }) => (
            <div className={styles['category-container']} key={type}>
              <Link
                to={type}
                onClick={() => {
                  window.scroll(0, 0);
                }}
              >
                <div className={styles['category-img-container']}>
                  <img
                    className={styles['category-img']}
                    src={`https://storage.googleapis.com/group_project_images/img/category-${type}.png`}
                    alt="category"
                  />
                </div>
                <h4 className={styles['category-title']}>{title}</h4>
                <p className={styles['category-count']}>{count} models</p>
              </Link>
            </div>
          ))}
      </div>
      <div className={styles['hot-prices']}>
        <ProductsSlider products={hotPrices} title="Hot prices" />
      </div>
    </main>
  );
};

export default HomePage;
