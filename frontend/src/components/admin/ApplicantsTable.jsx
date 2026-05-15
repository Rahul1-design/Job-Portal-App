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
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";

const shortListingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);
  return (
    <div>
      <Table>
        <TableCaption> A list of your recent applied user</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>FullName</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className={`text-right`}>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants.length < 0 ? (
            <div>There are no applicants yet.</div>
          ) : (
            applicants?.applications?.map((item) => {
              return (
                <TableRow key={item._id}>
                  <TableCell>{item?.applicant?.fullname}</TableCell>
                  <TableCell>{item?.applicant?.email}</TableCell>
                  <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                  <TableCell>
                    <a
                      className="cursor-pointer italic text-blue-600"
                      href={`https://docs.google.com/viewer?url=${encodeURIComponent(item?.applicant?.profile?.resume)}&embedded=true`}
                      target="_blank"
                    >
                      {item?.applicant?.profile?.resumeOriginalName}
                    </a>
                  </TableCell>
                  <TableCell>
                    {new Date(item?.createdAt).toLocaleDateString("en-Us", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </TableCell>
                  <TableCell className={`text-right `}>
                    <Popover>
                      <PopoverTrigger>
                        <MoreHorizontal className="w-5 cursor-pointer" />
                      </PopoverTrigger>
                      <PopoverContent className={`w-32`}>
                        {shortListingStatus.map((status, index) => {
                          return (
                            <div className="cursor-pointer" key={index}>
                              {status}
                            </div>
                          );
                        })}
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;
