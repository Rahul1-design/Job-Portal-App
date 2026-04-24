import React from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";

const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8];

const Jobs = () => {
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-5">
          {/* filter Page */}
          <div className="w-[20%]">
            <FilterCard />
          </div>

          {/* Job Card */}
          {jobsArray.length <= 0 ? (
            <span>Job not found.</span>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              <div className="grid max-lg:mr-3 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {jobsArray.map((item, index) => (
                  <div key={index}>
                    <Job />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
