import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, Eye, MoreHorizontal, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Job from "../Job";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { setAllAdminJobs } from "@/redux/jobSlice";

const AdminJobsTable = () => {
  const navigate = useNavigate();

  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);

  const filteredJobs = searchJobByText
    ? allAdminJobs.filter(
        (job) =>
          job?.title.toLowerCase().includes(searchJobByText.toLowerCase()) ||
          job?.company?.name
            .toLowerCase()
            .includes(searchJobByText.toLowerCase()),
      )
    : allAdminJobs;

  const dispatch = useDispatch();
  const deleteHandler = async (jobId) => {
    try {
      const res = await axios(`${JOB_API_END_POINT}/delete/${jobId}`, {
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(
          setAllAdminJobs(allAdminJobs.filter((item) => item._id !== jobId)),
        );
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div>
      <Table>
        <TableCaption>A list of your recent posted jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className={`text-right`}>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredJobs?.length <= 0 ? (
            <TableRow>
              <TableCell className={` text-lg text-bold`}>
                You haven't registered the job yet.
              </TableCell>
            </TableRow>
          ) : (
            <>
              {filteredJobs?.map((item) => {
                return (
                  <TableRow key={item._id}>
                    <TableCell>{item?.company?.name}</TableCell>
                    <TableCell>{item?.title}</TableCell>
                    <TableCell>
                      {new Date(item?.createdAt).toLocaleString("en-Us", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </TableCell>
                    <TableCell className={`text-right`}>
                      <Popover>
                        <PopoverTrigger>
                          <MoreHorizontal className="cursor-pointer" />
                        </PopoverTrigger>
                        <PopoverContent className={`w-32 `}>
                          <div
                            onClick={() =>
                              navigate(`/admin/companies/${item._id}`)
                            }
                            className="flex items-center gap-2 cursor-pointer px-1 py-2 hover:bg-purple-500 rounded-lg "
                          >
                            <Edit2 className="w-5" />
                            <span className="font-medium cursor-pointer">
                              Edit
                            </span>
                          </div>
                          <div
                            onClick={() =>
                              navigate(`/admin/jobs/${item._id}/applicants`)
                            }
                            className="flex items-center gap-2 cursor-pointer px-1 py-2 hover:text-white hover:bg-gray-500 rounded-lg"
                          >
                            <Eye className="w-5" />
                            <span className="cursor-pointer font-medium">
                              Applicants
                            </span>
                          </div>
                          <div
                            onClick={() => deleteHandler(item._id)}
                            className="flex gap-2 items-center cursor-pointer hover:bg-red-500 py-2 rounded-lg px-1"
                          >
                            <Trash2 />
                            <span className="font-medium ">Delete</span>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </TableCell>
                  </TableRow>
                );
              })}
            </>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminJobsTable;
