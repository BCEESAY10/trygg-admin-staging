import { TrendingUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

import styles from '@/src/styles/charts/TransactionLineChart.module.css';
import type {
  TransactionLineChartProps,
  TransactionTooltipProps,
} from '@/types/interfaces/transactions';

const TransactionLineChart = ({ data, title }: TransactionLineChartProps) => {
  const { t } = useTranslation('translation');
  const formatRevenue = (value: number) => {
    return `SEK${(value / 1000).toFixed(0)}k`;
  };

  const CustomTooltip = ({
    active,
    payload,
    label,
  }: TransactionTooltipProps) => {
    if (active && payload?.length) {
      return (
        <div className={styles.tooltip}>
          <p className={styles.tooltip__label}>{`${label}`}</p>
          <p className={styles.tooltip__value}>
            {t('transactions.revenue')}:{' '}
            <span>SEK{payload[0]?.value.toLocaleString()}</span>
          </p>
          <p className={styles.tooltip__value}>
            {t('transactions.transactions')}: <span>{payload[1]?.value}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={styles.chart__container}>
      {/*==================== Chart Header ====================*/}
      <div className={styles.chart__header}>
        <h3 className={styles.chart__title}>{title}</h3>
        <TrendingUp size={20} color="#fbbf24" />
      </div>
      {/*==================== End of Chart Header ====================*/}

      {/*==================== Chart Content ====================*/}
      <div className={styles.chart__wrapper}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
            <XAxis
              dataKey="day"
              stroke="#6b7280"
              fontSize={12}
              fontWeight={500}
            />
            <YAxis
              yAxisId="revenue"
              orientation="left"
              tickFormatter={formatRevenue}
              stroke="#6b7280"
              fontSize={12}
              fontWeight={500}
            />
            <YAxis
              yAxisId="transactions"
              orientation="right"
              stroke="#6b7280"
              fontSize={12}
              fontWeight={500}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              yAxisId="revenue"
              type="monotone"
              dataKey="revenue"
              stroke="#fbbf24"
              strokeWidth={3}
              dot={{ fill: '#fbbf24', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#fbbf24', strokeWidth: 2 }}
            />
            <Line
              yAxisId="transactions"
              type="monotone"
              dataKey="transactionCount"
              stroke="#059669"
              strokeWidth={3}
              dot={{ fill: '#059669', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#059669', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      {/*==================== End of Chart Content ====================*/}
    </div>
  );
};

export default TransactionLineChart;
