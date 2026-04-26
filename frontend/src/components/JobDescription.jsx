import React from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

const JobDescription = () => {
  const isApplied = true;
  return (
    <div className="container mx-auto my-10">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-bold text-2xl">Frontend Developer</h2>
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
        <Button
          disabled={isApplied}
          className={`rounded-lg ${isApplied ? "bg-gray-600 cursor-not-allowed" : "bg-[#7209b7] hover:brightness-85 cursor-pointer"} `}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </Button>
      </div>
      <h2 className="border-b-2 border-b-gray-300 font-medium py-4">
        Job Description
      </h2>
      <div className="my-4">
        <h3 className="font-bold my-1">
          Role:{" "}
          <span className="pl-4 font-normal text-gray-800">
            Frontend Developer
          </span>{" "}
        </h3>
        <h3 className="font-bold my-1">
          Location:{" "}
          <span className="pl-4 font-normal text-gray-800">Kathmandu</span>{" "}
        </h3>
        <h3 className="font-bold my-1">
          Description:{" "}
          <span className="pl-4 font-normal text-gray-800">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Perspiciatis, dicta excepturi. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Quaerat, magni?
          </span>{" "}
        </h3>
        <h3 className="font-bold my-1">
          Experience:{" "}
          <span className="pl-4 font-normal text-gray-800">2 yrs</span>{" "}
        </h3>
        <h3 className="font-bold my-1">
          Salary:{" "}
          <span className="pl-4 font-normal text-gray-800">12LPA</span>{" "}
        </h3>
        <h3 className="font-bold my-1">
          Total Applicants:{" "}
          <span className="pl-4 font-normal text-gray-800">4</span>{" "}
        </h3>
        <h3 className="font-bold my-1">
          Posted Date:{" "}
          <span className="pl-4 font-normal text-gray-800">
            17-10-2025
          </span>{" "}
        </h3>
      </div>
    </div>
  );
};

export default JobDescription;
