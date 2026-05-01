import React from 'react';
import styles from './SkeletonDetail.module.scss';

const SkeletonDetail: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.backButton}></div>
      <div className={styles.content}>
        <div className={styles.coverSection}>
          <div className={styles.cover}></div>
          <div className={styles.favButton}></div>
        </div>
        <div className={styles.infoSection}>
          <div className={styles.title}></div>
          <div className={styles.line}></div>
          <div className={styles.line}></div>
          <div className={styles.lineWide}></div>
          <div className={styles.description}>
            <div className={styles.line}></div>
            <div className={styles.line}></div>
            <div className={styles.lineShort}></div>
          </div>
          <div className={styles.subjects}>
            <div className={styles.tag}></div>
            <div className={styles.tag}></div>
            <div className={styles.tag}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonDetail;