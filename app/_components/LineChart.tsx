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

type LineConfig = {
  dataKey: string;
  stroke: string;
  name?: string;
  yAxisId?: "left" | "right";
};

type LineChartProps = {
  data: Array<{
    name: string;
    [key: string]: string | number;
  }>;
  dataKey?: string;
  lines?: LineConfig[];
  title?: string;
  height?: number;
  dualAxis?: boolean;
};

const defaultColors = ["#487D66", "#E6E29E", "#8B9FA0", "#A89C7E", "#6FA8A8"];

export default function LineChartComponent({
  data,
  dataKey,
  lines,
  title,
  height = 300,
  dualAxis = false,
}: LineChartProps) {
  // dataKey가 있으면 단일 라인, lines가 있으면 여러 라인
  let lineConfigs: LineConfig[] = lines
    ? lines
    : dataKey
    ? [{ dataKey, stroke: defaultColors[0] }]
    : [];

  // dualAxis가 true면 첫 번째는 왼쪽, 두 번째는 오른쪽 축
  if (dualAxis && lineConfigs.length > 1) {
    lineConfigs = lineConfigs.map((config, index) => ({
      ...config,
      yAxisId: index === 0 ? "left" : "right",
    }));
  }

  return (
    <div className="bg-bg rounded-lg shadow p-4">
      {title && <h3 className="text-lg font-semibold mb-5">{title}</h3>}
      <div className="overflow-x-auto md:overflow-x-hidden">
        <div className="min-w-max md:min-w-0 md:w-full" style={{ minWidth: "600px" }}>
          <ResponsiveContainer width="100%" height={height}>
            <LineChart data={data} margin={{ left: 20, right: 20, top: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" tick={{ fill: "#f5f5f5" }} stroke="#f5f5f5" />
              <YAxis yAxisId="left" tick={{ fill: "#f5f5f5" }} stroke="#f5f5f5" />
              {dualAxis && lineConfigs.length > 1 && (
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  tick={{ fill: "#f5f5f5" }}
                  stroke="#f5f5f5"
                />
              )}
              <Tooltip />
              <Legend />
              {lineConfigs.map((config) => (
                <Line
                  key={config.dataKey}
                  type="monotone"
                  dataKey={config.dataKey}
                  stroke={config.stroke}
                  name={config.name || config.dataKey}
                  yAxisId={config.yAxisId || "left"}
                  dot={{ fill: "#E6E29E", r: 5 }}
                  activeDot={{ r: 7 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
