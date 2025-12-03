"use client";

import { useEffect, useState } from "react";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

type PieChartProps = {
  data: Array<{
    name: string;
    value: number;
  }>;
  title?: string;
  height?: number;
  colors?: string[];
  radius?: number;
};

const defaultColors = ["#2D5F5C", "#5A9BA3", "#8B9FA0", "#A89C7E", "#6FA8A8"];

export default function PieChartComponent({
  data,
  title,
  height = 300,
  colors = defaultColors,
  radius = 100,
}: PieChartProps) {
  const [responsiveRadius, setResponsiveRadius] = useState(radius);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      // 화면 너비에 따라 반지름 조정
      if (width < 640) {
        setResponsiveRadius(40);
      } else if (width < 1024) {
        setResponsiveRadius(60);
      } else {
        setResponsiveRadius(radius);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [radius]);

  return (
    <div className="bg-bg rounded-lg shadow p-4">
      {title && <h3 className="text-lg font-semibold mb-4">{title}</h3>}
      <ResponsiveContainer width="100%" height={height}>
        <PieChart margin={{ left: 20, right: 20, top: 20, bottom: 20 }}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={responsiveRadius}
            fill="#8884d8"
            dataKey="value"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
