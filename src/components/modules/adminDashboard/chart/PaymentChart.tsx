"use client";
import { TDashboardData } from "@/src/types";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const DashboardPaymentChart = ({
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
            dataKey="countPayments"
            fill="#2196f3"
            name="Count of payment"
            cursor={"pointer"}
          />

          {/* Bar for Total Collection */}
          <Bar
            dataKey="totalPaymentsCollection"
            fill="#ff5722"
            name="Total Collection"
            cursor={"pointer"}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DashboardPaymentChart;
