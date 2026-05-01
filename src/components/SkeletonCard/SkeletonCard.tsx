import React from 'react';
import styles from './SkeletonCard.module.scss';

const SkeletonCard: React.FC = () => {
  return (
    <div className={styles.card}>
      <div className={styles.cover}></div>
      <div className={styles.content}>
        <div className={styles.title}></div>
        <div className={styles.author}></div>
        <div className={styles.year}></div>
        <div className={styles.actions}>
          <div className={styles.button}></div>
          <div className={styles.button}></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;