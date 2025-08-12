import { CompanyOverview } from '@/types/DetailResponse';
import styles from './AnalystRatings.module.scss';

export default function AnalystRatings({ data }: { data: CompanyOverview }) {
  return (
    <div className={styles.ratings}>
      <h3>Analyst Ratings</h3>
      <ul>
        <li>
          <strong>Strong Buy:</strong> {data.AnalystRatingStrongBuy}
        </li>
        <li>
          <strong>Buy:</strong> {data.AnalystRatingBuy}
        </li>
        <li>
          <strong>Hold:</strong> {data.AnalystRatingHold}
        </li>
        <li>
          <strong>Sell:</strong> {data.AnalystRatingSell}
        </li>
        <li>
          <strong>Strong Sell:</strong> {data.AnalystRatingStrongSell}
        </li>
        <li>
          <strong>Target Price:</strong> ${data.AnalystTargetPrice}
        </li>
      </ul>
    </div>
  );
}
