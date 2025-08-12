'use client';
import styles from './SearchBar.module.scss';
import Spinner from '@/components/spinner/Spinner';
import { useState, useRef } from 'react';
import { SearchItem, SearchResponse } from '@/types/SearchResponse';

import Link from 'next/link';
import ToastNotification from '@/components/toast-notification/ToastNotification';

export default function SearchBar() {
  const [input, setInput] = useState('');
  const [results, setResults] = useState<SearchItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [toastMessage, setToastMessage] = useState('');
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const getStockList = async (searchString: string): Promise<void> => {
    try {
      const res = await fetch(
        `/api/search?q=${encodeURIComponent(searchString)}`
      );

      const data = (await res.json()) as SearchResponse;

      if (data.result === 'success') {
        setResults(data.symbols);
      } else {
        setToastMessage(data.error);
      }
    } catch (error) {
      setToastMessage('Something went wrong, please try again...');
    }
  };

  const handleToastClose = () => {
    setToastMessage('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    if (value === '') {
      setResults([]);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      setIsLoading(true);
      await getStockList(value);
      setIsLoading(false);
    }, 400);
  };

  return (
    <div className={styles.wrapper}>
      <ToastNotification
        open={!!toastMessage}
        message={toastMessage}
        type={'error'}
        handleClose={handleToastClose}
      />
      <div className={styles.container}>
        <input
          type="text"
          placeholder="Type to search..."
          value={input}
          onChange={handleChange}
          className={styles.inputStyle}
        />
        {isLoading && (
          <div className={styles.resultsLoading}>
            <Spinner />
          </div>
        )}
        <div className={styles.resultList}>
          {!isLoading &&
            results.map((item) => (
              <Link key={item.symbol} href={`/detail/${item.symbol}`}>
                <div className={styles.resultItem}>
                  <div className={styles.symbolCurrency}>
                    <span className={styles.symbol}>{item.symbol}</span>
                    <span className={styles.currency}>{item.currency}</span>
                  </div>
                  <span className={styles.name} title={item.name}>
                    {item.name}
                  </span>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
