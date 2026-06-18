import { ReactNode } from "react";
import Card from "./Card";

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  subtitle?: string;
  trend?: string;
  trendType?: "positive" | "negative" | "neutral";
  progress?: number;
  className?: string;
}

export default function StatCard({
  title,
  value,
  icon,
  subtitle,
  trend,
  trendType = "neutral",
  progress,
  className = "",
}: StatCardProps) {
  const trendColor = {
    positive: "text-green-400",
    negative: "text-red-400",
    neutral: "text-blue-400",
  };

  return (
    <Card
      className={`overflow-hidden relative ${className}`}
    >
      {/* Background Glow */}

      <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-3xl" />

      <div className="relative z-10">

        <div className="flex justify-between items-start">

          <div>

            <p className="text-slate-400 text-sm font-medium uppercase tracking-wide">

              {title}

            </p>

            <h2 className="text-4xl font-bold mt-3 text-white break-words">

              {value}

            </h2>

            {subtitle && (

              <p className="text-slate-500 mt-3 text-sm">

                {subtitle}

              </p>

            )}

          </div>

          {icon && (

            <div className="w-14 h-14 rounded-2xl bg-slate-800 flex items-center justify-center text-3xl shadow-lg">

              {icon}

            </div>

          )}

        </div>

        {trend && (

          <div className="mt-6">

            <span
              className={`text-sm font-semibold ${trendColor[trendType]}`}
            >

              {trend}

            </span>

          </div>

        )}

        {progress !== undefined && (

          <div className="mt-6">

            <div className="flex justify-between mb-2 text-sm">

              <span className="text-slate-400">

                Progress

              </span>

              <span className="text-white font-semibold">

                {Math.round(progress)}%

              </span>

            </div>

            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">

              <div
                className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 rounded-full transition-all duration-700"
                style={{
                  width: `${Math.min(
                    progress,
                    100
                  )}%`,
                }}
              />

            </div>

          </div>

        )}

      </div>

    </Card>
  );
}