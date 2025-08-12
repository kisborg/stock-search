import type { CompanyOverview } from '@/types/DetailResponse';
import styles from './FinancialHighlights.module.scss';

export default function FinancialHighlights({
  data,
}: {
  data: CompanyOverview;
}) {
  return (
    <div className={styles.financials}>
      <h3>Financials</h3>
      <ul>
        <li>
          <strong>Market Cap:</strong> $
          {Number(data.MarketCapitalization).toLocaleString()}
        </li>
        <li>
          <strong>EBITDA:</strong> ${Number(data.EBITDA).toLocaleString()}
        </li>
        <li>
          <strong>Revenue (TTM):</strong> $
          {Number(data.RevenueTTM).toLocaleString()}
        </li>
        <li>
          <strong>EPS:</strong> ${data.EPS}
        </li>
        <li>
          <strong>Dividend Per Share:</strong> ${data.DividendPerShare}
        </li>
      </ul>
    </div>
  );
}
