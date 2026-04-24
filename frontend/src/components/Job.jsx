import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const Job = () => {
  const navigate = useNavigate();
  const jobId = "aksjdaskjasc";
  return (
    <div className="shadow-xl p-5 border border-gray-200 rounded-md">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">2 days ago</p>
        <Button variant="outline" className={`rounded-full`} size="icon">
          <Bookmark />
        </Button>
      </div>
      <div className="flex items-center gap-2 my-2">
        <Button variant="outline" className={`p-6`} size="icon">
          <Avatar className="h-10 w-10">
            <AvatarImage
              src="https://images-platform.99static.com//WnnxETQYaEVDQZxa1ZVZVZjtO-4=/317x274:817x774/fit-in/590x590/99designs-contests-attachments/67/67571/attachment_67571500"
              alt="Company Logo"
            />
          </Avatar>
        </Button>
        <div>
          <h2 className="font-medium text-lg">Company Name</h2>
          <p className="text-sm text-gray-500">Nepal</p>
        </div>
      </div>
      <div>
        <h2 className="font-bold text-lg my-2">Job Title</h2>
        <p className="text-sm text-gray-600">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laudantium
          qui ab voluptatem adipisci consequuntur? Lorem ipsum dolor sit amet
          consectetur, adipisicing elit. Accusantium, at.
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
      <div className="flex items-center gap-4 mt-4 ">
        <Button
          onClick={() => navigate(`/description/${jobId}`)}
          variant="outline"
          className={`cursor-pointer`}
        >
          Details
        </Button>
        <Button className={`bg-[#7209b7] hover:brightness-85 cursor-pointer`}>
          Save For Later
        </Button>
      </div>
    </div>
  );
};

export default Job;
