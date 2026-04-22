import React from "react";
import { Badge } from "./ui/badge";

const LatestJobCards = () => {
  return (
    <div className="p-5 rounded-xl border border-gray-100 shadow-xl ">
      <div>
        <h1 className="font-medium text-lg">Company Name</h1>
        <p className="text-sm text-gray-500">Nepal</p>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">Job Title</h1>
        <p className="text-sm text-gray-600">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consectetur
          provident labore repellendus!
        </p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Badge
          className={`text-blue-700 font-bold cursor-pointer`}
          variant="ghost"
        >
          12 positions
        </Badge>
        <Badge
          className={`text-[#f83802] font-bold cursor-pointer`}
          variant="ghost"
        >
          Part time
        </Badge>
        <Badge
          className={`text-[#7209b7] font-bold cursor-pointer`}
          variant="ghost"
        >
          24LPA
        </Badge>
      </div>
    </div>
  );
};

export default LatestJobCards;
