'use client';

import { useRouter } from 'next/navigation';
import styles from './BackButton.module.scss';

export default function BackButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push('/search')}
      className={styles.backButton}
      aria-label="Go Back"
    >
      ← Back to Search
    </button>
  );
}
