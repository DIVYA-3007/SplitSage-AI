interface SkeletonProps {
  className?: string;
}

function Skeleton({
  className = "",
}: SkeletonProps) {
  return (
    <div
      className={`
        animate-pulse
        rounded-xl
        bg-slate-800
        ${className}
      `}
    />
  );
}

// =====================================
// Stat Card Skeleton
// =====================================

export function StatCardSkeleton() {
  return (
    <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6">

      <div className="flex justify-between items-start">

        <div className="flex-1">

          <Skeleton className="h-4 w-24 mb-4" />

          <Skeleton className="h-10 w-36 mb-4" />

          <Skeleton className="h-3 w-28" />

        </div>

        <Skeleton className="h-14 w-14 rounded-2xl" />

      </div>

      <Skeleton className="h-2 w-full mt-8 rounded-full" />

    </div>
  );
}

// =====================================
// Card Skeleton
// =====================================

export function CardSkeleton() {
  return (
    <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6">

      <Skeleton className="h-6 w-44 mb-6" />

      <Skeleton className="h-4 w-full mb-3" />

      <Skeleton className="h-4 w-11/12 mb-3" />

      <Skeleton className="h-4 w-10/12 mb-6" />

      <Skeleton className="h-10 w-36 rounded-xl" />

    </div>
  );
}

// =====================================
// List Skeleton
// =====================================

export function ListSkeleton({
  rows = 5,
}: {
  rows?: number;
}) {
  return (
    <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6">

      <Skeleton className="h-8 w-48 mb-8" />

      <div className="space-y-5">

        {Array.from({
          length: rows,
        }).map((_, index) => (

          <div
            key={index}
            className="flex justify-between items-center"
          >

            <div>

              <Skeleton className="h-5 w-48 mb-3" />

              <Skeleton className="h-4 w-32" />

            </div>

            <Skeleton className="h-8 w-24 rounded-full" />

          </div>

        ))}

      </div>

    </div>
  );
}

// =====================================
// Table Skeleton
// =====================================

export function TableSkeleton({
  rows = 6,
}: {
  rows?: number;
}) {
  return (
    <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 overflow-hidden">

      <Skeleton className="h-8 w-56 mb-8" />

      <div className="space-y-5">

        {Array.from({
          length: rows,
        }).map((_, index) => (

          <div
            key={index}
            className="grid grid-cols-5 gap-4"
          >

            <Skeleton className="h-5 w-full" />

            <Skeleton className="h-5 w-full" />

            <Skeleton className="h-5 w-full" />

            <Skeleton className="h-5 w-full" />

            <Skeleton className="h-5 w-full" />

          </div>

        ))}

      </div>

    </div>
  );
}

// =====================================
// Dashboard Skeleton
// =====================================

export function DashboardSkeleton() {
  return (
    <div className="space-y-8">

      <div>

        <Skeleton className="h-10 w-72 mb-4" />

        <Skeleton className="h-5 w-96" />

      </div>

      <div className="grid lg:grid-cols-4 gap-6">

        <StatCardSkeleton />

        <StatCardSkeleton />

        <StatCardSkeleton />

        <StatCardSkeleton />

      </div>

      <div className="grid lg:grid-cols-2 gap-6">

        <CardSkeleton />

        <CardSkeleton />

      </div>

      <TableSkeleton rows={5} />

    </div>
  );
}

// =====================================
// Page Skeleton
// =====================================

export default function LoadingSkeleton() {
  return (
    <div className="p-8">

      <DashboardSkeleton />

    </div>
  );
}