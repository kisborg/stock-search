import type { CompanyOverview } from '@/types/DetailResponse';
import styles from './ValuationSummary.module.scss';

export default function ValuationSummary({ data }: { data: CompanyOverview }) {
  return (
    <div className={styles.valuation}>
      <h3>Valuation</h3>
      <ul>
        <li>
          <strong>P/E Ratio:</strong> {data.PERatio}
        </li>
        <li>
          <strong>PEG Ratio:</strong> {data.PEGRatio}
        </li>
        <li>
          <strong>Price/Sales:</strong> {data.PriceToSalesRatioTTM}
        </li>
        <li>
          <strong>Price/Book:</strong> {data.PriceToBookRatio}
        </li>
      </ul>
    </div>
  );
}
