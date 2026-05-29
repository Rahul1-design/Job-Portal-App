import { Skeleton } from "./ui/skeleton";

const SkeletonJob = () => {
  return (
    <div className="shadow-xl p-5 border border-gray-200 rounded-md">
      {/* top row — date and bookmark */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>

      {/* company logo and name */}
      <div className="flex items-center gap-2 my-2">
        <Skeleton className="h-12 w-12 rounded-md" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>

      {/* job title and description */}
      <div className="space-y-2 my-2">
        <Skeleton className="h-5 w-48" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-3/4" />
      </div>

      {/* badges */}
      <div className="flex gap-2 mt-4">
        <Skeleton className="h-6 w-20 rounded-full" />
        <Skeleton className="h-6 w-20 rounded-full" />
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>

      {/* buttons */}
      <div className="flex gap-4 mt-4">
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-8 w-28" />
      </div>
    </div>
  );
};

export default SkeletonJob;
