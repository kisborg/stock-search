'use client';
import styles from './SearchBar.module.scss';
import Spinner from '@/components/spinner/Spinner';
import { useState, useRef } from 'react';
import { SearchItem, SearchResponse } from '@/types/SearchResponse';
import ToastNotification from '@/components/toast-notification/ToastNotification';
import SearchItemRow from '../search-item-row/SearchItemRow';

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
          className={styles.searchBarInput}
        />
        {isLoading && (
          <div className={styles.resultsLoading}>
            <Spinner />
          </div>
        )}
        <div className={styles.resultList}>
          {!isLoading &&
            results.map((item) => (
              <SearchItemRow key={item.symbol} item={item} />
            ))}
        </div>
      </div>
    </div>
  );
}
