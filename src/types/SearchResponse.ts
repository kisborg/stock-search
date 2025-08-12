export type SearchResponse =
  | { result: 'success'; symbols: SearchItem[] }
  | { result: 'error'; error: string };

export type SearchItem = {
  symbol: string;
  name: string;
  type: string;
  region: string;
  marketOpen: string;
  marketClose: string;
  timezone: string;
  currency: string;
  matchScore: string;
};
