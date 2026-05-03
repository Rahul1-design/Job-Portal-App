import React from "react";
import { Badge } from "./ui/badge";

const LatestJobCards = ({ job }) => {
  return (
    <div className="p-5 rounded-xl border border-gray-100 shadow-xl ">
      <div>
        <h1 className="font-medium text-lg">{job?.company?.name}</h1>
        <p className="text-sm text-gray-500">Nepal</p>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">{job?.title}</h1>
        <p className="text-sm text-gray-600">{job.description}</p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Badge
          className={`text-blue-700 font-bold cursor-pointer`}
          variant="ghost"
        >
          {job?.position} positions
        </Badge>
        <Badge
          className={`text-[#f83802] font-bold cursor-pointer`}
          variant="ghost"
        >
          {job?.jobType}
        </Badge>
        <Badge
          className={`text-[#7209b7] font-bold cursor-pointer`}
          variant="ghost"
        >
          {job?.salary}LPA
        </Badge>
      </div>
    </div>
  );
};

export default LatestJobCards;
