'use client';

import BackButton from '../components/back-button/BackButton';
import styles from './DetailPage.module.scss';

export default function NotFound() {
  return (
    <div className={styles.error}>
      <h2>Not Found</h2>
      <p>The company stock you are looking for could not be found.</p>
      <BackButton />
    </div>
  );
}
