import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function XYChart() {
  const toMonthName = (subtractedMonths: any) => {
    const date = new Date();
    date.setMonth(date.getMonth() - subtractedMonths);

    return date.toLocaleString('en-US', {
      month: 'long',
    });
  }
  const lastOrders = useSelector((state: any) => state.lastOrders)
  const labels = [toMonthName(4), toMonthName(3), toMonthName(2), toMonthName(1), toMonthName(0)]
  const { t } = useTranslation()
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: t('ordersSummary'),
      },
    },
  };
  const [data, setData] = useState({
    labels,
    datasets: [
      {
        label: t('ordersSummary'),
        data: lastOrders,
        backgroundColor: 'rgba(255, 99, 132, 1)',
      },
    ],
  })
  useEffect(() => {
    data.datasets[0].data = lastOrders
    setData(data)
  }, [lastOrders.length === 0])
  return (
    <div className='w-full'>
      {lastOrders.length > 0 && <Bar options={options} data={data} />}
    </div>
  )
}
