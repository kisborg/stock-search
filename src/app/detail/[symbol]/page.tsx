import Spinner from '@/components/spinner/Spinner';
import { CompanyOverview } from '@/types/DetailResponse';
import { Suspense } from 'react';
import Dashboard from '../components/dashboard/Dashboard';
import styles from './DetailPage.module.scss';
import BackButton from '../components/back-button/BackButton';
import { ERROR_API_RATE_LIMIT } from '@/contants/error-strings';
import { notFound } from 'next/navigation';

export default async function Page({
  params,
}: {
  params: Promise<{ symbol: string }>;
}) {
  const { symbol } = await params;
  const fetchCompanyInfo = async (symbol: string): Promise<CompanyOverview> => {
    const url = `${process.env.API_URL}/query?function=OVERVIEW&symbol=${symbol}&apikey=${process.env.TOKEN}`;

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

      return data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.message === '404') {
        notFound();
      }
      throw new Error(error.message || 'Unknown error');
    }
  };

  const companyOverview = await fetchCompanyInfo(symbol);

  return (
    <div className={styles.container}>
      <BackButton />
      <Suspense fallback={<Spinner />}>
        <Dashboard data={companyOverview} />
      </Suspense>
      <Suspense></Suspense>
    </div>
  );
}
