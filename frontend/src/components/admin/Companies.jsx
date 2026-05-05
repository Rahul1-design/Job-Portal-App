import React from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const Companies = () => {
  return (
    <div>
      <Navbar />
      <div className=" max-w-6xl mx-auto my-10">
        <div className="flex justify-between items-center">
          <Input
            type={`text`}
            className={`w-fit`}
            placeholder="Filter by name"
          />
          <Button>New Company</Button>
        </div>
      </div>
    </div>
  );
};

export default Companies;
