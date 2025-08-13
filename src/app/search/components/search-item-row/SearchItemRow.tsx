'use client';

import Link from 'next/link';
import styles from './SearchItemRow.module.scss';
import type { SearchItem } from '@/types/SearchResponse';

interface SearchItemRowProps {
  item: SearchItem;
}

export default function SearchItemRow({ item }: SearchItemRowProps) {
  return (
    <Link
      href={`/detail/${item.symbol}`}
      className={styles.rowLink}
      tabIndex={0}
    >
      <div className={styles.itemContent}>
        <span className={styles.symbol}>{item.symbol}</span>
        <span className={styles.currency}>{item.currency}</span>
        <span className={styles.name} title={item.name}>
          {item.name}
        </span>
      </div>
    </Link>
  );
}
