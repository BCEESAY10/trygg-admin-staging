// export interface RevenueData {
//   month: string;
//   revenue: number;
// }

// export interface RevenueChartProps {
//   data: RevenueData[];
//   title: string;
// }

export interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    name: string;
    color: string;
  }>;
  label?: string;
}
