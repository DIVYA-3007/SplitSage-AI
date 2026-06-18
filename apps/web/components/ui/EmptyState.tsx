import { ReactNode } from "react";
import Card from "./Card";

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
  className?: string;
}

export default function EmptyState({
  icon = "📭",
  title,
  description,
  action,
  className = "",
}: EmptyStateProps) {
  return (
    <Card
      hover={false}
      className={`flex flex-col items-center justify-center text-center py-16 px-8 ${className}`}
    >
      {/* Icon */}

      <div className="w-24 h-24 rounded-full bg-slate-800 flex items-center justify-center text-5xl mb-6">

        {icon}

      </div>

      {/* Title */}

      <h2 className="text-3xl font-bold text-white mb-4">

        {title}

      </h2>

      {/* Description */}

      <p className="text-slate-400 text-lg max-w-xl leading-8">

        {description}

      </p>

      {/* Action */}

      {action && (

        <div className="mt-8">

          {action}

        </div>

      )}

    </Card>
  );
}