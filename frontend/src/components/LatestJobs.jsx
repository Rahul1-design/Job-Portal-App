import LatestJobCards from "./LatestJobCards";
import { useSelector } from "react-redux";
import SkeletonJob from "./SkeletonJob";

const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job);
  const loading = allJobs.length === 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-16 sm:my-20">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center sm:text-left">
        <span className="text-[#6A38C2]">Latest & Top</span> Job Openings
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 my-8">
        {loading
          ? Array(3)
              .fill(0)
              .map((_, i) => <SkeletonJob key={i} />)
          : allJobs
              .slice(0, 6)
              .map((job) => <LatestJobCards job={job} key={job._id} />)}
      </div>
    </div>
  );
};

export default LatestJobs;
