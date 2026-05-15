import React, { useState } from "react";
import { Label } from "../ui/label";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import useGetAllCompany from "../hooks/useGetAllCompany";

const PostJob = () => {
  useGetAllCompany();
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: "",
  });

  const { companies } = useSelector((store) => store.company);

  const navigate = useNavigate();

  const changeEvenetHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
    console.log({ ...input, [e.target.name]: e.target.value });
  };

  const [loading, setLoading] = useState(false);

  // const selectChangeHandler = (value) => {
  //   const selectedCompany = companies.find(
  //     (company) => company?.name.toLowerCase() === value,
  //   );
  //   setInput({ ...input, companyId: value });
  // };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center w-screen my-5 ">
        <form
          onSubmit={submitHandler}
          className="p-8 max-w-4xl w-full border border-gray-200 shadow-lg rounded-md"
        >
          <div className="grid grid-cols-2 gap-5 ">
            <div>
              <Label>Title</Label>
              <Input
                type={`text`}
                name="title"
                value={input.title}
                onChange={changeEvenetHandler}
                className={`focus-visible:ring-offset-0 focus-visible:ring-0 my-1 w-full `}
              />
            </div>
            <div>
              <Label>Description</Label>
              <Input
                type={`text`}
                name="description"
                value={input.description}
                onChange={changeEvenetHandler}
                className={`focus-visible:ring-offset-0 focus-visible:ring-0 my-1 w-full`}
              />
            </div>
            <div>
              <Label>Requirements</Label>
              <Input
                type={`text`}
                name="requirements"
                value={input.requirements}
                onChange={changeEvenetHandler}
                className={`focus-visible:ring-offset-0 focus-visible:ring-0 my-1 w-full`}
              />
            </div>
            <div>
              <Label>Salary</Label>
              <Input
                type={`text`}
                name="salary"
                value={input.salary}
                onChange={changeEvenetHandler}
                className={`focus-visible:ring-offset-0 focus-visible:ring-0 my-1 w-full`}
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                type={`text`}
                name="location"
                value={input.location}
                onChange={changeEvenetHandler}
                className={`focus-visible:ring-offset-0 focus-visible:ring-0 my-1 w-full`}
              />
            </div>
            <div>
              <Label>Job Type</Label>
              <Input
                type={`text`}
                name="jobType"
                value={input.jobType}
                onChange={changeEvenetHandler}
                className={`focus-visible:ring-offset-0 focus-visible:ring-0 my-1 w-full`}
              />
            </div>
            <div>
              <Label>Experience Level</Label>
              <Input
                type={`text`}
                name="experience"
                value={input.experience}
                onChange={changeEvenetHandler}
                className={`focus-visible:ring-offset-0 focus-visible:ring-0 my-1 w-full`}
              />
            </div>
            <div>
              <Label>No of Position</Label>
              <Input
                type={`number`}
                name="position"
                value={input.position}
                onChange={changeEvenetHandler}
                className={`focus-visible:ring-offset-0 focus-visible:ring-0 my-1 w-full`}
              />
            </div>
            <div>
              {companies.length > 0 && (
                <Select
                  onValueChange={(value) =>
                    setInput({ ...input, companyId: value })
                  }
                >
                  <SelectTrigger className={`w-full max-w-48 `}>
                    <SelectValue placeholder="Select a company" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {companies.map((company) => {
                        return (
                          <SelectItem className={`p-3`} value={company?._id}>
                            {company?.name}
                          </SelectItem>
                        );
                      })}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            </div>
          </div>
          {loading ? (
            <Button
              className={`cursor-pointer w-full my-4 hover:bg-gray-700 p-5 `}
            >
              <Loader2 className="animate-spin mr-2 h-4 w-4" />
              Please wait
            </Button>
          ) : (
            <Button
              type="submit"
              className={`cursor-pointer w-full my-4 hover:bg-gray-700 p-5`}
            >
              Post a New Job
            </Button>
          )}
          {companies.length === 0 && (
            <p className="text-xs font-bold text-red-600 text-center my-3 ">
              *Please register a company first, before posting a job{" "}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default PostJob;
