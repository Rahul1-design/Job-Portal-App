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
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constant";

const shortListingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
  const statusHandler = async (status, id) => {
    try {
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status },
        { withCredentials: true },
      );

      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const { applicants } = useSelector((store) => store.application);
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableCaption>A list of your recent applied users</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>FullName</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!applicants?.applications || applicants?.applications?.length <= 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="font-medium text-lg text-center py-8 text-muted-foreground">
                There are no applicants yet.
              </TableCell>
            </TableRow>
          ) : (
            applicants?.applications
              ?.filter((item) => item?.applicant !== null)
              .map((item) => (
                <TableRow key={item._id}>
                  <TableCell className="font-medium whitespace-nowrap">{item?.applicant?.fullname}</TableCell>
                  <TableCell className="whitespace-nowrap">{item?.applicant?.email}</TableCell>
                  <TableCell className="whitespace-nowrap">{item?.applicant?.phoneNumber}</TableCell>
                  <TableCell>
                    {item?.applicant?.profile?.resumeOriginalName ? (
                      <a
                        className="cursor-pointer italic text-primary hover:underline text-sm"
                        rel="noopener noreferrer"
                        href={`https://docs.google.com/viewer?url=${encodeURIComponent(item?.applicant?.profile?.resume)}&embedded=true`}
                        target="_blank"
                      >
                        {item?.applicant?.profile?.resumeOriginalName}
                      </a>
                    ) : (
                      <span
                        onClick={() => toast.error("No Resume")}
                        className="cursor-pointer font-medium text-destructive text-sm"
                      >
                        NA
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {new Date(item?.createdAt).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </TableCell>
                  <TableCell className="text-right">
                    <Popover>
                      <PopoverTrigger>
                        <MoreHorizontal className="w-5 h-5 cursor-pointer" />
                      </PopoverTrigger>
                      <PopoverContent className="w-32">
                        {shortListingStatus.map((status, index) => (
                          <div
                            key={index}
                            onClick={() => statusHandler(status, item._id)}
                            className={`cursor-pointer px-2 py-2 rounded-lg text-sm font-medium hover:bg-muted transition-colors ${
                              status === "Accepted"
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {status}
                          </div>
                        ))}
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

export default ApplicantsTable;
