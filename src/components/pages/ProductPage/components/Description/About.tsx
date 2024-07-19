import { IProductDetails } from '../../../../../types';
import styles from './Description.module.scss';

interface Props {
  product: IProductDetails | null;
}

const About: React.FC<Props> = ({ product }) => {
  return (
    <>
      {product && (
        <div className={styles['about']}>
          <h2 title="About" className={styles['title']}>
            About
          </h2>
          <ul className={styles['tech-list']}>
            {product.description.map(({ title, text }) => (
              <li key={title} className={styles['about-item']}>
                <h3 className={styles['about-item-title']}>{title}</h3>
                <p className={styles['about-item-text']}>{text}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default About;
