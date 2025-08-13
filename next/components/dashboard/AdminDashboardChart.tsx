"use client";

import React, { useEffect } from "react";
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
  data?: {
    month: string;
    count: number;
  }[];
}

const AdminDashboardChart: React.FC<AdminDashboardChartProps> = ({ data }) => {
  if (!data)
    return (
      <div className="w-full flex-1 h-full flex-center">
        <div className="w-20 h-20 rounded-full aspect-square border-y-secondary border-x-primary border-[40px] flex-0 animate-spin transition-[1s]" />
      </div>
    );

  const analyticsLabels: string[] = [];
  const analyticsData: number[] = [];

  for (let index = 0; index < data.length; index++) {
    analyticsData.push(data[index].count);
    analyticsLabels.push(data[index].month);
  }

  useEffect(() => {
    if (analyticsData.length === data.length)
      console.log("analytics data: ", analyticsData);
    if (analyticsLabels.length === data.length)
      console.log("analytics lebels: ", analyticsLabels);
  }, [analyticsData, analyticsLabels]);

  const chartData = {
    labels: analyticsLabels,
    datasets: [
      {
        label: "Courses Created",
        data: analyticsData,
        backgroundColor: "rgba(37, 99, 235, 0.7)", // blue color
        borderRadius: 2,
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
        font: { size: 12 },
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
//   );
// };

// export default AdminLandingPage;
