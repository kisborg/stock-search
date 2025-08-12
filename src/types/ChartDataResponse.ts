export type TimeSeriesData = {
  [date: string]: TimeSeriesEntry;
};

export type TimeSeriesEntry = {
  '1. open': string;
  '2. high': string;
  '3. low': string;
  '4. close': string;
  '5. adjusted close': string;
  '6. volume': string;
  '7. dividend amount': string;
};
