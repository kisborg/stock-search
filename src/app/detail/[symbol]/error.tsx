'use client';

import styles from './DetailPage.module.scss';
import BackButton from '../components/back-button/BackButton';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // Custom error messaging
  const message =
    error.message || 'Something went wrong. Please try again later.';

  return (
    <div className={styles.error}>
      <h2>Error</h2>
      <p>{message}</p>
      <BackButton />
    </div>
  );
}
