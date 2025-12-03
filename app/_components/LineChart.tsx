"use client";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type LineChartProps = {
  data: Array<{
    name: string;
    [key: string]: string | number;
  }>;
  dataKey: string;
  title?: string;
  height?: number;
};

export default function LineChartComponent({ data, dataKey, title, height = 300 }: LineChartProps) {
  return (
    <div className="bg-bg rounded-lg shadow p-4">
      {title && <h3 className="text-2lg font-semibold mb-5">{title}</h3>}
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" tick={{ fill: "#f5f5f5" }} stroke="#f5f5f5" />
          <YAxis tick={{ fill: "#f5f5f5" }} stroke="#f5f5f5" />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey={dataKey}
            stroke="#487D66"
            dot={{ fill: "#E6E29E", r: 5 }}
            activeDot={{ r: 7 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
