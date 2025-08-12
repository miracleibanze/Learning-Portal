"use client";

import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface AdminDashboardChartProps {
  labels: string[];
  data: number[];
}

const AdminDashboardChart: React.FC<AdminDashboardChartProps> = ({
  labels,
  data,
}) => {
  const chartData = {
    labels,
    datasets: [
      {
        label: "Courses Created",
        data,
        backgroundColor: "rgba(37, 99, 235, 0.7)", // blue color
        borderRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Monthly Course Creation",
        font: { size: 18 },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default AdminDashboardChart;

// import React from "react";
// import AdminDashboardChart from "./AdminDashboardChart";

// const AdminLandingPage = () => {
//   // Example static data, you can fetch this from your analytics API
//   const labels = ["Mar", "Apr", "May", "Jun", "Jul", "Aug"];
//   const courseCreationCounts = [4, 7, 3, 5, 8, 6];

//   return (
//     <div className="p-6 bg-white rounded shadow-md max-w-3xl mx-auto">
//       <h1 className="text-2xl font-bold mb-6">Admin Dashboard Overview</h1>
//       <AdminDashboardChart labels={labels} data={courseCreationCounts} />
//     </div>
//   );
// };

// export default AdminLandingPage;
