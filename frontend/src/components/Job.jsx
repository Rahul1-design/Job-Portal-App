import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const Job = ({ job }) => {
  const navigate = useNavigate();
  return (
    <div className="shadow-sm hover:shadow-md transition-shadow duration-300 p-5 border border-border rounded-xl bg-card">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {new Date(job?.createdAt).toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark className="w-4 h-4" />
        </Button>
      </div>
      <div className="flex items-center gap-3 my-3">
        <Avatar className="h-12 w-12 rounded-lg">
          <AvatarImage src={job?.company?.logo} alt="Company Logo" />
        </Avatar>
        <div>
          <h2 className="font-semibold text-lg">{job?.company?.name}</h2>
          <p className="text-sm text-muted-foreground">Nepal</p>
        </div>
      </div>
      <div>
        <h2 className="font-bold text-lg my-2">{job?.title}</h2>
        <p className="text-sm text-muted-foreground line-clamp-2">{job?.description}</p>
      </div>
      <div className="flex items-center gap-2 mt-4 flex-wrap">
        <Badge className="text-blue-700 font-bold" variant="ghost">
          {job?.position} positions
        </Badge>
        <Badge className="text-[#f83802] font-bold" variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className="text-[#7209b7] font-bold" variant="ghost">
          {job?.salary}LPA
        </Badge>
      </div>
      <div className="flex items-center gap-3 mt-5">
        <Button
          onClick={() => navigate(`/description/${job?._id}`)}
          variant="outline"
          className="flex-1 cursor-pointer"
        >
          Details
        </Button>
        <Button className="flex-1 bg-[#7209b7] hover:bg-[#5a08a0] text-white cursor-pointer">
          Save For Later
        </Button>
      </div>
    </div>
  );
};

export default Job;
