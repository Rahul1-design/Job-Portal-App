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

const CompaniesTables = () => {
  const navigate = useNavigate();
  const { companies } = useSelector((store) => store.company);

  return (
    <div>
      <Table>
        <TableCaption>A List of your recent registered companies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className={`text-right`}>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {companies?.length <= 0 ? (
            <TableRow>
              <TableCell>you haven't register the company yet.</TableCell>
            </TableRow>
          ) : (
            <>
              {companies?.map((item) => {
                return (
                  <TableRow key={item._id}>
                    <TableCell>
                      <Avatar>
                        <AvatarImage
                          className={`w-8 h-7`}
                          src={item?.logo}
                          alt="Company Logo"
                        />
                      </Avatar>
                    </TableCell>
                    <TableCell>{item?.name}</TableCell>
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

export default CompaniesTables;
