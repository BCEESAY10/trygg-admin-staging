import { TrendingUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

import styles from '@/src/styles/charts/RevenueChart.module.css';
import type { TooltipProps } from '@/types/interfaces/chart';
import type { MonthlyRevenueProps } from '@/types/interfaces/transactions';

const RevenueChart = ({ data, title }: MonthlyRevenueProps) => {
  const { t } = useTranslation('translation');
  const chartData = Array.isArray(data.data)
    ? data.data.map(d => ({
        ...d,
        revenue: parseFloat(d.revenue.replace(/[^\d.-]/g, '')) || 0,
        label: `${d.month}`,
      }))
    : [];

  const formatRevenue = (value: number) => `SEK${(value / 1000).toFixed(0)}k`;

  const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
    if (active && payload && payload.length > 0 && payload[0]?.value != null) {
      return (
        <div className={styles.tooltip}>
          <p
            className={styles.tooltip__label}
          >{`${label} ${chartData[0]?.year ?? ''}`}</p>
          <p className={styles.tooltip__value}>
            {t('transactions.revenue')}:{' '}
            <span>SEK {Number(payload[0].value).toLocaleString()}</span>
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
          <BarChart
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
            <XAxis
              dataKey="label"
              stroke="#6b7280"
              fontSize={12}
              fontWeight={500}
            />
            <YAxis
              tickFormatter={formatRevenue}
              stroke="#6b7280"
              fontSize={12}
              fontWeight={500}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              name="Revenue"
              fill="#fbbf24"
              dataKey="revenue"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      {/*==================== End of Chart Content ====================*/}
    </div>
  );
};

export default RevenueChart;
