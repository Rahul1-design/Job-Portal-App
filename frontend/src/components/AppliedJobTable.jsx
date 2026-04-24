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

const jobApplications = [
  {
    date: "2026-04-10",
    jobRole: "Frontend Developer",
    companyName: "TechNova Pvt Ltd",
    status: "Accepted",
  },
  {
    date: "2026-04-08",
    jobRole: "Backend Developer",
    companyName: "CodeCraft Solutions",
    status: "Rejected",
  },
  {
    date: "2026-04-05",
    jobRole: "MERN Stack Developer",
    companyName: "InnovateX",
    status: "Pending",
  },
  {
    date: "2026-04-02",
    jobRole: "React Developer",
    companyName: "SoftEdge Technologies",
    status: "Accepted",
  },
  {
    date: "2026-03-30",
    jobRole: "Next.js Developer",
    companyName: "FutureStack Labs",
    status: "Rejected",
  },
];
const AppliedJobTable = () => {
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
          {jobApplications.length <= 0 ? (
            <span className="font-bold  text-lg">No job applied yet.</span>
          ) : (
            jobApplications.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.date}</TableCell>
                <TableCell>{item.jobRole}</TableCell>
                <TableCell>{item.companyName}</TableCell>
                <TableCell className={`text-right`}>
                  <Badge>{item.status}</Badge>
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
