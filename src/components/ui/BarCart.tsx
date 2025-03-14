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

type Props = {
  label: string[];
  data: number[];
};

const MyBarChart = ({ label, data }: Props) => {
  const chartData = {
    labels: label, // Menggunakan label yang diterima
    datasets: [
      {
        label: 'Total attandance',
        data: data, // Menggunakan data yang diterima
        backgroundColor: 'rgba(77, 171, 245, 0.2)',
        borderColor: 'rgba(77, 171, 245, 1)',
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
        text: 'Attendance Graph by Hour',
      },
    },
    scales: {
      y: {
        beginAtZero: true, // Memastikan sumbu Y mulai dari 0
        ticks: {
          stepSize: 1, // Menentukan langkah untuk tidak menampilkan desimal
          callback: function(value: number) {
            return Number.isInteger(value) ? value : ''; // Hanya kembalikan integer
          },
        },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default MyBarChart;