import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { useSelector } from "react-redux";

// const jobApplications = [
//   {
//     date: "2026-04-10",
//     jobRole: "Frontend Developer",
//     companyName: "TechNova Pvt Ltd",
//     status: "Accepted",
//   },
//   {
//     date: "2026-04-08",
//     jobRole: "Backend Developer",
//     companyName: "CodeCraft Solutions",
//     status: "Rejected",
//   },
//   {
//     date: "2026-04-05",
//     jobRole: "MERN Stack Developer",
//     companyName: "InnovateX",
//     status: "Pending",
//   },
//   {
//     date: "2026-04-02",
//     jobRole: "React Developer",
//     companyName: "SoftEdge Technologies",
//     status: "Accepted",
//   },
//   {
//     date: "2026-03-30",
//     jobRole: "Next.js Developer",
//     companyName: "FutureStack Labs",
//     status: "Rejected",
//   },
// ];
const AppliedJobTable = () => {
  const { appliedJobs } = useSelector((store) => store.job);
  return (
    <div>
      <Table>
        <TableCaption>List of your applied jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className={`text-right`}>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {appliedJobs.length <= 0 ? (
            <TableRow>
              <TableCell className="font-bold  text-lg">
                No job applied yet.
              </TableCell>
            </TableRow>
          ) : (
            appliedJobs
              .filter((job) => job.job !== null)
              .map((item) => (
                <TableRow key={item._id}>
                  <TableCell>
                    {new Date(item.createdAt).toLocaleDateString("en-Us", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </TableCell>
                  <TableCell>{item?.job?.title}</TableCell>
                  <TableCell>{item?.job?.company?.name}</TableCell>
                  <TableCell className={`text-right`}>
                    <Badge
                      className={
                        item?.status === "rejected"
                          ? "bg-red-600 h-7 w-20"
                          : item?.status === "pending"
                            ? "bg-gray-600 h-7 w-20"
                            : "bg-green-600 h-7 w-20"
                      }
                    >
                      {item?.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobTable;
