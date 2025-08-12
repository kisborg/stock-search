import Spinner from '@/components/spinner/Spinner';
import { CompanyOverview } from '@/types/DetailResponse';
import { Suspense } from 'react';
import Dashboard from '../components/dashboard/Dashboard';
import styles from './DetailPage.module.scss';
import BackButton from '../components/back-button/BackButton';

export default async function Page({
  params,
}: {
  params: Promise<{ symbol: string }>;
}) {
  const { symbol } = await params;
  const fetchCompanyInfo = async (symbol: string): Promise<CompanyOverview> => {
    const url = `${process.env.API_URL}/query?function=OVERVIEW&symbol=${symbol}&apikey=${process.env.TOKEN}`;
    const res = await fetch(url, { next: { revalidate: 300 } });
    const data = res.json();
    return data;
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
