import { Search } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";

const HeroSection = () => {
  return (
    <div className="text-center">
      <div className="flex flex-col gap-5 my-10">
        <span className="mx-auto text-[#F83002] rounded-full font-medium px-4 py-2 bg-gray-100">
          No. 1 Job Hunt Website
        </span>
        <h1 className="text-5xl font-bold ">
          Search, Apply & <br /> Get your{" "}
          <span className="text-[#6A38C2]">Dream Jobs</span>
        </h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
          obcaecati ea amet odit et dolore delectus accusantium ipsam fugiat!
        </p>
        <div className="max-md:w-[50%] w-[40%] flex  border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto shadow-lg">
          <input
            type="text"
            className="outline-none border-none w-full "
            placeholder="Find your dream jobs"
          />
          <Button
            className={`rounded-r-full bg-[#6A38C2] cursor-pointer hover:brightness-90 h-full py-3 `}
          >
            <Search className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
