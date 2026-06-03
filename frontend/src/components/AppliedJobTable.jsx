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

const AppliedJobTable = () => {
  const { appliedJobs } = useSelector((store) => store.job);
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableCaption>List of your applied jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {appliedJobs.length <= 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="font-medium text-lg text-center py-8 text-muted-foreground">
                No job applied yet.
              </TableCell>
            </TableRow>
          ) : (
            appliedJobs
              .filter((job) => job.job !== null)
              .map((item) => (
                <TableRow key={item._id}>
                  <TableCell className="whitespace-nowrap">
                    {new Date(item.createdAt).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">{item?.job?.title}</TableCell>
                  <TableCell className="whitespace-nowrap">{item?.job?.company?.name}</TableCell>
                  <TableCell className="text-right">
                    <Badge
                      className={
                        item?.status === "rejected"
                          ? "bg-red-600 hover:bg-red-600 text-white"
                          : item?.status === "pending"
                            ? "bg-yellow-600 hover:bg-yellow-600 text-white"
                            : "bg-green-600 hover:bg-green-600 text-white"
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
