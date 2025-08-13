import type { CompanyOverview } from '@/types/DetailResponse';
import styles from './DashboardHeader.module.scss';
import FavoriteStar from '@/components/favorites/FavoriteStar';

export default function DashboardHeader({ data }: { data: CompanyOverview }) {
  return (
    <header className={styles.header}>
      <FavoriteStar company={data} />
      <h1>
        {data.Name} <small className={styles.symbol}>({data.Symbol})</small>
      </h1>
      <p className={styles.subinfo}>
        <span>
          <strong>Asset:</strong> {data.AssetType}
        </span>
        <span>
          <strong>Exchange:</strong> {data.Exchange}
        </span>
        <span>
          <strong>Website:</strong>{' '}
          <a href={data.OfficialSite} target="_blank" rel="noopener noreferrer">
            {data.OfficialSite}
          </a>
        </span>
      </p>
    </header>
  );
}
