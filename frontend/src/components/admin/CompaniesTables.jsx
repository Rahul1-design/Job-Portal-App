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
  const { companies, searchCompanyByText } = useSelector(
    (store) => store.company,
  );

  const filteredCompany = searchCompanyByText
    ? companies.filter((company) =>
        company?.name
          ?.toLowerCase()
          .includes(searchCompanyByText.toLowerCase()),
      )
    : companies;

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableCaption>A List of your recent registered companies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredCompany?.length <= 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="font-medium text-lg text-center py-8 text-muted-foreground">
                You haven't registered a company yet.
              </TableCell>
            </TableRow>
          ) : (
            filteredCompany?.map((item) => (
              <TableRow key={item._id}>
                <TableCell>
                  <Avatar>
                    <AvatarImage
                      className="w-8 h-8 object-cover"
                      src={item?.logo}
                      alt="Company Logo"
                    />
                  </Avatar>
                </TableCell>
                <TableCell className="font-medium whitespace-nowrap">{item?.name}</TableCell>
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
                    <PopoverContent className="w-32">
                      <div
                        onClick={() =>
                          navigate(`/admin/companies/${item._id}`)
                        }
                        className="flex items-center gap-2 hover:bg-muted px-2 py-2 rounded-lg cursor-pointer transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                        <span className="font-medium text-sm">Edit</span>
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

export default CompaniesTables;
