'use client';

import { useRouter } from 'next/navigation';
import styles from './BackButton.module.scss';

export default function BackButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push('/search')}
      className={styles.backButton}
    >
      ← Back to Search
    </button>
  );
}
