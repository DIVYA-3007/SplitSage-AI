"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

type Props = {
  data: any[];
};

export default function ExpenseBarChart({
  data,
}: Props) {
  return (
    <div className="bg-slate-900 rounded-xl p-6 h-96">
      <h2 className="text-2xl font-bold mb-6">
        Monthly Expenses
      </h2>

      <ResponsiveContainer
        width="100%"
        height="80%"
      >
        <BarChart data={data}>
          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="amount"
            fill="#2563eb"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}