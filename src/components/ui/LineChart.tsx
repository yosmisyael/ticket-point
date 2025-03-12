'use client';

import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const MyLineChart = () => {

    const data = {
        labels: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni'],
        datasets: [
            {
                label: 'Penjualan',
                data: [65, 59, 80, 81, 56, 55],
                backgroundColor: 'rgba(77, 171, 245, 0.2)',
                borderColor: 'rgb(77, 171, 245)',
                borderWidth: 2,
                pointBackgroundColor: 'rgb(77, 171, 245)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(77, 171, 245)',
                fill: true,
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
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return <Line data={data} options={options} />;
};

export default MyLineChart;