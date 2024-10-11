"use client";
import { TDashboardData } from "@/src/types";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const DashboardPostUserChart = ({
  records: chartData,
}: {
  records: TDashboardData[];
}) => {
  return (
    <div>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="newUsers"
            fill="#00b800"
            name="New Users"
            cursor={"pointer"}
            activeBar={<Rectangle stroke="#008000" />}
          />
          <Bar
            dataKey="newPosts"
            fill="#607d8b"
            name="New Posts"
            cursor={"pointer"}
            activeBar={<Rectangle stroke="#1E90FF" />}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DashboardPostUserChart;
