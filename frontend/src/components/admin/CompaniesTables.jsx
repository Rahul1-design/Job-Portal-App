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

const CompaniesTables = () => {
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
          <TableCell>
            <Avatar>
              <AvatarImage
                src="https://images-platform.99static.com//WnnxETQYaEVDQZxa1ZVZVZjtO-4=/317x274:817x774/fit-in/590x590/99designs-contests-attachments/67/67571/attachment_67571500"
                alt="Company Logo"
              />
            </Avatar>
          </TableCell>
          <TableCell>Company Name</TableCell>
          <TableCell>5-6-2026</TableCell>
          <TableCell className={`text-right cursor-pointer`}>
            <Popover>
              <PopoverTrigger>
                <MoreHorizontal />
              </PopoverTrigger>
              <PopoverContent className={`w-32 `}>
                <div className="flex items-center gap-2 cursor-pointer w-fit">
                  <Edit2 className="w-5" />
                  <span className="font-medium">Edit</span>
                </div>
              </PopoverContent>
            </Popover>
          </TableCell>
        </TableBody>
      </Table>
    </div>
  );
};

export default CompaniesTables;
