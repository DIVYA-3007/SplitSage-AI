"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Props {
  data: any[];
}

export default function MemberBarChart({
  data,
}: Props) {
  return (
    <div className="bg-slate-900 rounded-xl p-6 h-[350px]">
      <h2 className="text-2xl font-bold mb-5">
        Member Expenses
      </h2>

      <ResponsiveContainer width="100%" height="80%">
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />

          <Bar
            dataKey="value"
            fill="#3b82f6"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}