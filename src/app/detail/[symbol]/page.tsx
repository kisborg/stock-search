import Spinner from '@/components/spinner/Spinner';
import { CompanyOverview } from '@/types/DetailResponse';
import { Suspense } from 'react';
import Dashboard from '../components/dashboard/Dashboard';
import styles from './DetailPage.module.scss';
import BackButton from '../components/back-button/BackButton';
import { ERROR_API_RATE_LIMIT } from '@/contants/error-strings';
import { notFound } from 'next/navigation';
import Graph from '../components/graph/Graph';
import { TimeSeriesData } from '@/types/ChartDataResponse';

export default async function Page({
  params,
}: {
  params: Promise<{ symbol: string }>;
}) {
  const { symbol } = await params;
  const fetchCompanyInfo = async (symbol: string): Promise<CompanyOverview> => {
    const url = `${process.env.API_URL}/query?function=OVERVIEW&symbol=${symbol}&apikey=${process.env.API_TOKEN}`;

    try {
      const res = await fetch(url, { next: { revalidate: 300 } });
      if (res.status === 404) {
        throw new Error('404');
      }

      if (!res.ok) {
        throw new Error('Something went wrong. Please try again.');
      }

      const data = await res.json();

      if (data.Information?.match(ERROR_API_RATE_LIMIT)) {
        throw new Error('Too many requests');
      }

      if (data && typeof data === 'object' && Object.keys(data).length === 0) {
        throw new Error('404');
      }
      return data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.message === '404') {
        notFound();
      }
      throw new Error(error.message || 'Unknown error');
    }
  };

  const fetchHistoricalPrice = async (
    symbol: string
  ): Promise<TimeSeriesData> => {
    const url = `${process.env.API_URL}/query?function=TIME_SERIES_MONTHLY_ADJUSTED&symbol=${symbol}&apikey=${process.env.API_TOKEN}`;
    const res = await fetch(url, { next: { revalidate: 300 } });
    try {
      const res = await fetch(url, { next: { revalidate: 300 } });
      if (res.status === 404) {
        throw new Error('404');
      }

      if (!res.ok) {
        throw new Error('Something went wrong. Please try again.');
      }

      const data = await res.json();

      if (data.Information?.match(ERROR_API_RATE_LIMIT)) {
        throw new Error('Too many requests');
      }

      if (data && typeof data === 'object' && Object.keys(data).length === 0) {
        throw new Error('404');
      }

      return data['Monthly Adjusted Time Series'];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.message === '404') {
        notFound();
      }
      throw new Error(error.message || 'Unknown error');
    }
  };

  const companyOverview = fetchCompanyInfo(symbol);
  const graphData = fetchHistoricalPrice(symbol);

  return (
    <div className={styles.container}>
      <BackButton />
      <Suspense fallback={<Spinner toCenter />}>
        <Dashboard data={companyOverview} />

        <Graph data={graphData} />
      </Suspense>
    </div>
  );
}
