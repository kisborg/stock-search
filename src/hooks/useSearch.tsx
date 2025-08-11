import { SearchItem } from '@/types/SearchResponse';

export default function useSearch() {
  const getStockList = async (searchString: string): Promise<SearchItem[]> => {
    const res = await fetch(
      `/api/search?q=${encodeURIComponent(searchString)}`
    );
    const json = (await res.json()) as SearchItem[];

    return json;
  };

  return { getStockList };
}
