import SearchBar from './components/search-bar/SearchBar';
import styles from './SearchPage.module.scss';

export default function Page() {
  return (
    <div className={styles.background}>
      <div className={styles.inner}>
        <h2>Stock-search App</h2>
        <SearchBar />
      </div>
    </div>
  );
}
