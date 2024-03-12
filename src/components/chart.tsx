import React from "react";
import { Doughnut } from "react-chartjs-2";
import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';


interface ChartData {
  labels: string[];
  datasets:
    {
      data: number[];
      backgroundColor: string[];
    }[];
}

interface DoughnutChartProps {
  chartData: ChartData;
}

export const DoughnutChart: React.FC<DoughnutChartProps> = ({ chartData }) => {
  return <Doughnut data={chartData} />;
};
