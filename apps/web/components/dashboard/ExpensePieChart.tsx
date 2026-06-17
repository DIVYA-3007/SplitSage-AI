"use client";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

type Props = {
  data: any[];
};

const COLORS = [
  "#2563eb",
  "#16a34a",
  "#9333ea",
  "#f97316",
  "#dc2626",
];

export default function ExpensePieChart({
  data,
}: Props) {
  return (
    <div className="bg-slate-900 rounded-xl p-6 h-96">
      <h2 className="text-2xl font-bold mb-6">
        Expense Categories
      </h2>

      <ResponsiveContainer
        width="100%"
        height="80%"
      >
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={120}
            label
          >
            {data.map((_, index) => (
              <Cell
                key={index}
                fill={
                  COLORS[index % COLORS.length]
                }
              />
            ))}
          </Pie>

          <Tooltip />

          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}