'use client';

import React, { use, useMemo, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import styles from './Graph.module.scss';
import {
  HistoricalPricePoint,
  transformTimeSeries,
} from '@/utils/helper-functions';
import { TimeSeriesData } from '@/types/ChartDataResponse';

const intervals = [
  { label: '3M', months: 3 },
  { label: '6M', months: 6 },
  { label: 'YTD', months: 'ytd' as const },
  { label: '1Y', months: 12 },
  { label: '5Y', months: 60 },
];

type IntervalType = number | 'ytd';

interface GraphProps {
  data: Promise<TimeSeriesData>;
}

const filterByInterval = (
  data: HistoricalPricePoint[],
  interval: IntervalType
): HistoricalPricePoint[] => {
  const now = new Date();
  if (interval === 'ytd') {
    const ytdStart = new Date(now.getFullYear(), 0, 1);
    return data.filter(
      (d) => new Date(d.date) >= ytdStart && new Date(d.date) <= now
    );
  }
  const startDate = new Date(
    now.getFullYear(),
    now.getMonth() - (interval as number),
    now.getDate()
  );
  return data.filter(
    (d) => new Date(d.date) >= startDate && new Date(d.date) <= now
  );
};

export default function Graph({ data }: GraphProps) {
  const timeSeries = use(data);
  const transformedData = useMemo(
    () => transformTimeSeries(timeSeries),
    [timeSeries]
  );
  const [interval, setInterval] = useState<IntervalType>(6);
  console.log(data);
  const filteredData = useMemo(
    () => filterByInterval(transformedData, interval),
    [transformedData, interval]
  );

  return (
    <section className={styles.graphSection}>
      <div className={styles.graphHeader}>
        <h2>Historical Close Price</h2>
        <div className={styles.intervalSelector}>
          {intervals.map((int) => (
            <button
              key={int.label}
              className={interval === int.months ? styles.active : ''}
              onClick={() => setInterval(int.months)}
              type="button"
            >
              {int.label}
            </button>
          ))}
        </div>
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={filteredData}>
          <CartesianGrid stroke="#eee" strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tickFormatter={(d) => d.slice(2)}
            minTickGap={20}
          />
          <YAxis domain={['auto', 'auto']} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="close"
            name="Close Price"
            stroke="#2294f2"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </section>
  );
}
