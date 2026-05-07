import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const CompanySetUp = () => {
  const [input, setInput] = useState({
    name: "",
    description: "",
    location: "",
    website: "",
    file: null,
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("location", input.location);
    formData.append("website", input.website);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Navbar />
      <div className="lg:max-w-xl container mx-auto -10">
        <form onSubmit={submitHandler}>
          <div className="flex items-center gap-5 p-8">
            <Button
              variant="outline"
              className={`flex items-center gap-2 text-gray-500 font-semibold cursor-pointer`}
            >
              <ArrowLeft />
              <span>Back</span>
            </Button>
            <h1 className="font-bold text-xl">Company Setup</h1>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className={`font-bold my-1`}>Company Name</Label>
              <Input
                type={`text`}
                name="name"
                value={input.name}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label className={`font-bold my-1`}>Description</Label>
              <Input
                type={`text`}
                name="description"
                value={input.description}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label className={`font-bold my-1`}>Website</Label>
              <Input
                type={`text`}
                name="website"
                value={input.website}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label className={`font-bold my-1`}>Location</Label>
              <Input
                type={`text`}
                name="location"
                value={input.location}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label className={`font-bold my-1`}>Logo</Label>
              <Input
                type={`file`}
                accept="image/*"
                onChange={changeFileHandler}
              />
            </div>
          </div>
          <Button
            type={"submit"}
            className={`w-full mt-8 cursor-pointer hover:bg-gray-800 p-5`}
          >
            Update
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CompanySetUp;
