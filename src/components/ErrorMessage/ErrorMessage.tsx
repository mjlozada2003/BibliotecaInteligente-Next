import React from 'react';
import styles from './ErrorMessage.module.scss';

interface ErrorMessageProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  error?: Error | null; // opcional, para mostrar detalles
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  title = 'Ocurrió un error',
  message = 'No pudimos cargar los datos. Por favor, intenta nuevamente.',
  onRetry,
  error,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.icon}>⚠️</div>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.message}>{message}</p>
      {error && process.env.NODE_ENV === 'development' && (
        <details className={styles.details}>
          <summary>Detalles técnicos</summary>
          <pre>{error.message}</pre>
        </details>
      )}
      {onRetry && (
        <button onClick={onRetry} className={styles.retryButton}>
          Reintentar
        </button>
      )}
    </div>
  );
};