'use client';

import React, { useEffect, useState } from 'react';
import styles from './Favorites.module.scss'; // see below for styles
import StartFilled from '../../icons/filled-star.svg';
import StarEmpty from '../../icons/empty-star.svg';
import type { CompanyOverview } from '@/types/DetailResponse';

type FavoriteStock = {
  symbol: string;
  name: string;
  currency: string;
};

const LOCALSTORAGE_KEY = 'favorite_stocks';

export default function FavoriteStar({
  company,
}: {
  company: CompanyOverview;
}) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const updateFavoriteFromStorage = () => {
      const stored = localStorage.getItem(LOCALSTORAGE_KEY);
      const favorites: FavoriteStock[] = stored ? JSON.parse(stored) : [];
      setIsFavorite(favorites.some((f) => f.symbol === company.Symbol));
    };
    updateFavoriteFromStorage();

    const onStorageChange = () => {
      updateFavoriteFromStorage();
    };
    window.addEventListener('favorite_stocks_updated', onStorageChange);

    return () => {
      window.removeEventListener('favorite_stocks_updated', onStorageChange);
    };
  }, [company.Symbol]);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    let favorites: FavoriteStock[] = [];

    const stored = localStorage.getItem(LOCALSTORAGE_KEY);
    favorites = stored ? JSON.parse(stored) : [];
    if (favorites.some((f) => f.symbol === company.Symbol)) {
      favorites = favorites.filter((f) => f.symbol !== company.Symbol);
      setIsFavorite(false);
    } else {
      favorites.push({
        symbol: company.Symbol,
        name: company.Name,
        currency: company.Currency,
      });
      setIsFavorite(true);
    }
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(favorites));
    window.dispatchEvent(new Event('favorite_stocks_updated'));
  };

  return (
    <div
      className={styles.starButton}
      onClick={toggleFavorite}
      title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      {isFavorite ? <StartFilled /> : <StarEmpty />}
    </div>
  );
}
