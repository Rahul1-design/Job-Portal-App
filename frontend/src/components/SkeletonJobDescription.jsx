import { Skeleton } from "./ui/skeleton";

const SkeletonJobDescription = () => {
  return (
    <div className="max-w-7xl mx-auto my-10">
      {/* title and button row */}
      <div className="flex justify-between items-center">
        <div className="space-y-3">
          <Skeleton className="h-10 w-64" />
          <div className="flex gap-2 mt-4">
            <Skeleton className="h-6 w-24 rounded-full" />
            <Skeleton className="h-6 w-24 rounded-full" />
            <Skeleton className="h-6 w-24 rounded-full" />
          </div>
        </div>
        <Skeleton className="h-9 w-28 rounded-lg" />
      </div>

      {/* Job Description heading */}
      <Skeleton className="h-8 w-48 mt-6 mb-4" />

      {/* details rows */}
      <div className="space-y-4 my-4">
        <Skeleton className="h-5 w-72" />
        <Skeleton className="h-5 w-60" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-48" />
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-5 w-36" />
        <Skeleton className="h-5 w-52" />
      </div>
    </div>
  );
};

export default SkeletonJobDescription;
