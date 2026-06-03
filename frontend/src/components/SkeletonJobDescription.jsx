import { Skeleton } from "./ui/skeleton";

const SkeletonJobDescription = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      <Skeleton className="h-9 w-24 mb-6" />
      <div className="bg-card border border-border rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
          <div className="space-y-3 w-full">
            <Skeleton className="h-9 w-64 sm:w-96" />
            <div className="flex gap-2 mt-3">
              <Skeleton className="h-6 w-24 rounded-full" />
              <Skeleton className="h-6 w-24 rounded-full" />
              <Skeleton className="h-6 w-24 rounded-full" />
            </div>
          </div>
          <Skeleton className="h-10 w-28 rounded-lg shrink-0" />
        </div>
        <Skeleton className="h-px w-full my-6" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <Skeleton key={i} className="h-16 w-full rounded-lg" />
            ))}
        </div>
        <Skeleton className="h-px w-full my-6" />
        <Skeleton className="h-7 w-40 mb-3" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-5/6 mb-2" />
        <Skeleton className="h-4 w-4/6" />
      </div>
    </div>
  );
};

export default SkeletonJobDescription;
