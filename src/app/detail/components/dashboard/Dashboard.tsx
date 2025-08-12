'use client';
import type { CompanyOverview } from '@/types/DetailResponse';
import DashboardHeader from '../dashboard-header/DashboardHeader';
import CompanyInfo from '../company-info/CompanyInfo';
import FinancialHighlights from '../financial-highlights/FinancialHighlights';
import ValuationSummary from '../valuation-summary/ValuationSummary';
import PerformanceSummary from '../performance-summary/PerformanceSummary';
import AnalystRatings from '../analyst-ratings/AnalystRatings';
import styles from './Dashboard.module.scss';
import { use } from 'react';

export interface DashboardProps {
  data: Promise<CompanyOverview>;
}

export default function Dashboard({ data }: DashboardProps) {
  const companyData = use(data);
  return (
    <div className={styles.dashboard}>
      <DashboardHeader data={companyData} />
      <CompanyInfo data={companyData} />
      <div className={styles.flexRow}>
        <FinancialHighlights data={companyData} />
        <ValuationSummary data={companyData} />
      </div>
      <div className={styles.flexRow}>
        <PerformanceSummary data={companyData} />
        <AnalystRatings data={companyData} />
      </div>
    </div>
  );
}
