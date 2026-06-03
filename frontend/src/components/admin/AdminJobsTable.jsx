import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, Eye, MoreHorizontal, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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
    <div className="overflow-x-auto">
      <Table>
        <TableCaption>A list of your recent posted jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredJobs?.length <= 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="font-medium text-lg text-center py-8 text-muted-foreground">
                You haven't registered a job yet.
              </TableCell>
            </TableRow>
          ) : (
            filteredJobs?.map((item) => (
              <TableRow key={item._id}>
                <TableCell className="font-medium whitespace-nowrap">{item?.company?.name}</TableCell>
                <TableCell className="whitespace-nowrap">{item?.title}</TableCell>
                <TableCell className="whitespace-nowrap">
                  {new Date(item?.createdAt).toLocaleString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal className="cursor-pointer w-5 h-5" />
                    </PopoverTrigger>
                    <PopoverContent className="w-36">
                      <div
                        onClick={() =>
                          navigate(`/admin/companies/${item._id}`)
                        }
                        className="flex items-center gap-2 cursor-pointer px-2 py-2 hover:bg-muted rounded-lg transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                        <span className="font-medium text-sm">Edit</span>
                      </div>
                      <div
                        onClick={() =>
                          navigate(`/admin/jobs/${item._id}/applicants`)
                        }
                        className="flex items-center gap-2 cursor-pointer px-2 py-2 hover:bg-muted rounded-lg transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                        <span className="font-medium text-sm">Applicants</span>
                      </div>
                      <div
                        onClick={() => deleteHandler(item._id)}
                        className="flex items-center gap-2 cursor-pointer px-2 py-2 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span className="font-medium text-sm">Delete</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminJobsTable;
