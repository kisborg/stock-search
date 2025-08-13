import Link from 'next/link';
import styles from './Favorites.module.scss';
import { FavoriteStock } from './Favorites';

interface FavoriteStockRowProps {
  item: FavoriteStock;
  onRemove: (symbol: string) => void;
}

export default function FavoriteStockRow({
  item,
  onRemove,
}: FavoriteStockRowProps) {
  return (
    <div className={styles.stockRow}>
      <Link
        href={`/detail/${item.symbol}`}
        className={styles.stockLink}
        tabIndex={0}
      >
        <div className={styles.itemContent}>
          <span className={styles.symbol}>{item.symbol}</span>
          <span className={styles.name} title={item.name}>
            {item.name}
          </span>
          <span className={styles.currency}>{item.currency}</span>
        </div>
      </Link>
      <button
        className={styles.removeButton}
        onClick={() => onRemove(item.symbol)}
      >
        Remove
      </button>
    </div>
  );
}
