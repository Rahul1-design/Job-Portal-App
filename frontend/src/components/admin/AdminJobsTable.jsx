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
import { Edit2, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminJobsTable = () => {
  const navigate = useNavigate();
  // const { companies, searchCompanyByText } = useSelector(
  //   (store) => store.company,
  // );

  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);

  const filteredJobs = searchJobByText
    ? allAdminJobs.filter((job) =>
        job.title.toLowerCase().includes(searchJobByText.toLowerCase()),
      )
    : allAdminJobs;

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
                You haven't registered the company yet.
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
                          <div className="flex items-center gap-2 w-fit">
                            <Edit2 className="w-5" />
                            <span
                              onClick={() =>
                                navigate(`/admin/companies/${item._id}`)
                              }
                              className="font-medium cursor-pointer"
                            >
                              Edit
                            </span>
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
