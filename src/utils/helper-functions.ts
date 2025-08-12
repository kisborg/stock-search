import { TimeSeriesData } from '@/types/ChartDataResponse';

export const stripNumberingFromKeys = (obj: { [key: string]: string }) => {
  const newObj: { [key: string]: string } = {};
  for (const key in obj) {
    // Remove leading number and dot-space using regex
    const newKey = key.replace(/^\d+\.\s*/, '');
    newObj[newKey] = obj[key];
  }
  return newObj;
};

export type HistoricalPricePoint = {
  date: string;
  close: number;
};

export const transformTimeSeries = (
  rawData: TimeSeriesData
): HistoricalPricePoint[] => {
  return Object.entries(rawData)
    .map(([date, values]) => ({
      date,
      close: parseFloat(values['4. close']),
    }))
    .sort((a, b) => a.date.localeCompare(b.date));
};
