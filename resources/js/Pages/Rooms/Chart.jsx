import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// ลงทะเบียนการใช้ Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function PriceGraph({ prices }) {
  // เตรียมข้อมูลสำหรับกราฟ
  const data = {
    labels: prices.map((price) => price.date), // วันที่
    datasets: [
      {
        label: 'ราคาที่พัก',
        data: prices.map((price) => price.price), // ราคาที่พัก
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}: ฿${context.raw}`,
        },
      },
    },
  };

  return (
    <div className="container mx-auto p-8 max-w-3xl bg-white shadow-lg rounded-xl">
      <h2 className="text-3xl font-bold text-black-700 mb-6 text-center">กราฟราคาที่พัก</h2>
      <Line data={data} options={options} />
    </div>
  );
}
