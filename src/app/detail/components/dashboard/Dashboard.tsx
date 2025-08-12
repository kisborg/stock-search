import type { CompanyOverview } from '@/types/DetailResponse';
import DashboardHeader from '../dashboard-header/DashboardHeader';
import CompanyInfo from '../company-info/CompanyInfo';
import FinancialHighlights from '../financial-highlights/FinancialHighlights';
import ValuationSummary from '../valuation-summary/ValuationSummary';
import PerformanceSummary from '../performance-summary/PerformanceSummary';
import AnalystRatings from '../analyst-ratings/AnalystRatings';
import styles from './Dashboard.module.scss';

export interface DashboardProps {
  data: CompanyOverview;
}

export default function Dashboard({ data }: DashboardProps) {
  return (
    <div className={styles.dashboard}>
      <DashboardHeader data={data} />
      <CompanyInfo data={data} />
      <div className={styles.flexRow}>
        <FinancialHighlights data={data} />
        <ValuationSummary data={data} />
      </div>
      <div className={styles.flexRow}>
        <PerformanceSummary data={data} />
        <AnalystRatings data={data} />
      </div>
    </div>
  );
}
