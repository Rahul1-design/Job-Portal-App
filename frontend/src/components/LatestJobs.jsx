import React from "react";
import LatestJobCards from "./LatestJobCards";
import { useSelector } from "react-redux";
import SkeletonJob from "./SkeletonJob";

const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  // const [loading, setLoading] = useState(true);
  const loading = allJobs.length === 0;

  return (
    <div className="max-w-7xl mx-auto my-20">
      <h1 className="text-4xl font-bold">
        <span className="text-[#6A38C2]">Latest & Top</span> Job Openings
      </h1>
      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 max-lg:m-4 lg:grid-cols-3 gap-4 my-5">
        {!user && (
          <div className="text-2xl font-medium">User not logged in</div>
        )}
        {loading
          ? Array(2)
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
