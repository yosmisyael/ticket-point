'use client';

import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const MyBarChart = () => {

  const data = {
    labels: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni'],
    datasets: [
      {
        label: 'Penjualan',
        data: [65, 59, 80, 81, 56, 55],
        backgroundColor: [
          'rgb(77, 171, 245, 0.2)',
        ],
        borderColor: [
          'rgb(77, 171, 245, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };


  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Grafik Penjualan 2023',
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default MyBarChart;