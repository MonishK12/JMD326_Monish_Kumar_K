// PieChart.tsx
"use client";

import { Card } from "@/components/ui/card";
import {
  PieChart as RechartsPieChart,
  Pie,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from "recharts";

interface PieChartProps {
  data: {
    name: string;
    total: number;
  }[];
}

const PieChart = ({ data }: PieChartProps) => {
  return (
    <Card className="w-full max-w-5xl mx-auto">
      <ResponsiveContainer width="100%" height={500}>
        <RechartsPieChart>
          <Pie
            data={data}
            dataKey="total"
            nameKey="name"
            outerRadius={150}
            fill="#8884d8"
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={`#${(Math.random() * 0xFFFFFF << 0).toString(16)}`} />
            ))}
          </Pie>
          <Tooltip />
        </RechartsPieChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default PieChart;
