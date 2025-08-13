'use client';

import React, { useState, useEffect } from 'react';
import styles from './Favorites.module.scss';
import Link from 'next/link';
import FavoriteStockRow from './FavoriteStockRow';

export type FavoriteStock = {
  symbol: string;
  name: string;
  currency: string;
};

const LOCALSTORAGE_KEY = 'favorite_stocks';

export default function Favorites() {
  const [open, setOpen] = useState(false);
  const [favorites, setFavorites] = useState<FavoriteStock[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const updateFavorites = () => {
      const stored = localStorage.getItem(LOCALSTORAGE_KEY);
      setFavorites(stored ? JSON.parse(stored) : []);
    };

    updateFavorites();

    window.addEventListener('favorite_stocks_updated', updateFavorites);

    return () => {
      window.removeEventListener('favorite_stocks_updated', updateFavorites);
    };
  }, []);

  const removeFavorite = (symbol: string) => {
    const filtered = favorites.filter((item) => item.symbol !== symbol);
    setFavorites(filtered);
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(filtered));
    window.dispatchEvent(new Event('favorite_stocks_updated'));
  };

  return (
    <div className={styles.favorites}>
      <button className={styles.favButton} onClick={() => setOpen((o) => !o)}>
        ★ Favorites
      </button>
      {open && (
        <div className={styles.dropdown}>
          {favorites.length === 0 ? (
            <div className={styles.emptyText}>No favorites yet.</div>
          ) : (
            favorites.map((item) => (
              <FavoriteStockRow
                item={item}
                onRemove={removeFavorite}
                key={item.symbol}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}
