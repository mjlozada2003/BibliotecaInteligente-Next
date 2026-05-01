import React from 'react';
import styles from './Loading.module.scss';

interface LoadingProps {
  size?: 'small' | 'medium' | 'large';
  text?: string;
  fullScreen?: boolean;
}

export const Loading: React.FC<LoadingProps> = ({
  size = 'medium',
  text = 'Cargando...',
  fullScreen = false,
}) => {
  const spinnerClassName = `${styles.spinner} ${styles[`spinner--${size}`]}`;

  const content = (
    <div className={styles.container}>
      <div className={spinnerClassName}></div>
      {text && <p className={styles.text}>{text}</p>}
    </div>
  );

  if (fullScreen) {
    return <div className={styles.fullscreen}>{content}</div>;
  }

  return content;
};