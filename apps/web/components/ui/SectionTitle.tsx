import { ReactNode } from "react";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  className?: string;
}

export default function SectionTitle({
  title,
  subtitle,
  action,
  className = "",
}: SectionTitleProps) {
  return (
    <div
      className={`flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8 ${className}`}
    >
      <div>

        <h2 className="text-4xl lg:text-5xl font-bold text-white">

          {title}

        </h2>

        {subtitle && (

          <p className="text-slate-400 text-lg mt-2 max-w-3xl leading-7">

            {subtitle}

          </p>

        )}

      </div>

      {action && (

        <div className="flex items-center">

          {action}

        </div>

      )}

    </div>
  );
}