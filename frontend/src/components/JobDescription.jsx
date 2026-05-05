import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setSingleJob } from "@/redux/jobSlice";
import { toast } from "sonner";

const JobDescription = () => {
  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);

  // returns true if the job is already applied
  const isInitiallyApplied =
    singleJob?.applications?.some(
      (application) => application.applicant === user?._id,
    ) || false;

  const [isApplied, setisApplied] = useState(isInitiallyApplied);

  const applyJobHandler = async () => {
    try {
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        {},
        {
          withCredentials: true,
        },
      );
      console.log(res.data);
      if (res.data.success) {
        setisApplied(true); //Update the local state

        // Helps us to update the UI in real time
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setisApplied(
            res.data.job.applications.some(
              (application) => application.applicant === user?._id,
            ),
          ); // ensures it is synced with fetched data
        }
      } catch (error) {
        console.log(error.response.data.message);
      }
    };
    fetchSingleJob();
  }, [dispatch, jobId, user?._id]);

  return (
    <div className="container mx-auto my-10">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-bold text-4xl">{singleJob?.title}</h2>
          <div className="flex items-center gap-2 mt-4">
            <Badge
              className={`text-blue-700 font-bold cursor-pointer`}
              variant="ghost"
            >
              {singleJob?.position} positions
            </Badge>
            <Badge
              className={`text-[#f83802] font-bold cursor-pointer`}
              variant="ghost"
            >
              {singleJob?.jobType}
            </Badge>
            <Badge
              className={`text-[#7209b7] font-bold cursor-pointer`}
              variant="ghost"
            >
              {singleJob?.salary}LPA
            </Badge>
          </div>
        </div>
        <Button
          onClick={isApplied ? null : applyJobHandler}
          disabled={isApplied}
          className={`rounded-lg ${isApplied ? "bg-gray-600 cursor-not-allowed" : "bg-[#7209b7] hover:brightness-85 cursor-pointer"} `}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </Button>
      </div>
      <h2 className="border-b-2 text-3xl border-b-gray-300 font-medium py-4">
        Job Description
      </h2>
      <div className="my-4">
        <h3 className="font-bold my-1">
          Role:
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.title}
          </span>
        </h3>
        <h3 className="font-bold my-1">
          Location:
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.location}
          </span>
        </h3>
        <h3 className="font-bold my-1">
          Description:
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.description}
          </span>
        </h3>
        <h3 className="font-bold my-1">
          Experience:
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.experienceLevel} yrs
          </span>
        </h3>
        <h3 className="font-bold my-1">
          Salary:
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.salary}LPA
          </span>
        </h3>
        <h3 className="font-bold my-1">
          Total Applicants:
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.applications?.length}
          </span>
        </h3>
        <h3 className="font-bold my-1">
          Posted Date:
          <span className="pl-4 font-normal text-gray-800">
            {new Date(singleJob?.createdAt).toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
        </h3>
      </div>
    </div>
  );
};

export default JobDescription;
