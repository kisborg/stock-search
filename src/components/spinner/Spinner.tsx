import styles from './Spinner.module.scss';

type SpinnerProps = {
  toCenter?: boolean;
};
export default function Spinner({ toCenter }: SpinnerProps) {
  return (
    <span
      className={`${styles.spinnerStyle} ${toCenter ? styles.toCenter : ''}`}
    />
  );
}
