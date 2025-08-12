import type { CompanyOverview } from '@/types/DetailResponse';
import styles from './PerformanceSummary.module.scss';
import { DashboardProps } from '../dashboard/Dashboard';

export default function PerformanceSummary({ data }: DashboardProps) {
  return (
    <div className={styles.performance}>
      <h3>Stock Performance</h3>
      <ul>
        <li>
          <strong>52-Week High:</strong> ${data['52WeekHigh']}
        </li>
        <li>
          <strong>52-Week Low:</strong> ${data['52WeekLow']}
        </li>
        <li>
          <strong>50-Day AVG:</strong> ${data['50DayMovingAverage']}
        </li>
        <li>
          <strong>200-Day AVG:</strong> ${data['200DayMovingAverage']}
        </li>
        <li>
          <strong>Beta:</strong> {data.Beta}
        </li>
      </ul>
    </div>
  );
}
