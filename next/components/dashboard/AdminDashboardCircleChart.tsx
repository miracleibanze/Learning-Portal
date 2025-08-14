import {
  Legend,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const AdminDashboardCircleChart = ({
  data,
}: {
  data: { month: string; count: number }[];
}) => {
  // Optional: normalize data for better visual scaling
  const maxValue = Math.max(...data.map((d) => d.count));
  const chartData = data.map((item) => ({
    ...item,
    fill: "#4ade80", // Tailwind emerald-400
    // Adding a label-friendly value
    pv: item.count,
  }));

  return (
    <ResponsiveContainer width="100%" height={350}>
      <RadialBarChart
        cx="50%"
        cy="50%"
        innerRadius="20%"
        outerRadius="90%"
        barSize={15}
        data={chartData}
      >
        <RadialBar
          minAngle={15}
          label={{ position: "insideStart", fill: "#fff" }}
          background
          clockWise
          dataKey="pv"
        />
        <Legend
          iconSize={10}
          layout="vertical"
          verticalAlign="middle"
          wrapperStyle={{
            right: 0,
            top: "50%",
            transform: "translateY(-50%)",
          }}
        />
        <Tooltip />
      </RadialBarChart>
    </ResponsiveContainer>
  );
};

export default AdminDashboardCircleChart;
