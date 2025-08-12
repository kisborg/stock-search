import styles from './CompanyInfo.module.scss';
import { DashboardProps } from '../dashboard/Dashboard';

export default function CompanyInfo({ data }: DashboardProps) {
  return (
    <section className={styles.info}>
      <h2>About</h2>
      <p className={styles.description}>{data.Description}</p>
      <p className={styles.meta}>
        <strong>Sector:</strong> {data.Sector}, <strong>Industry:</strong>{' '}
        {data.Industry}
        <br />
        <strong>Country:</strong> {data.Country}, <strong>Address:</strong>{' '}
        {data.Address}
      </p>
    </section>
  );
}
