import React from 'react';
import styles from './Loader.module.scss';

export const Loader: React.FC = () => (
  <div className={styles['loader']}>
    <div className={styles['loader-circle']}></div>
  </div>
);

export default Loader;
