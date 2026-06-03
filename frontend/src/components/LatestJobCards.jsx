import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();
  const searchHandler = () => {
    navigate(`/description/${job._id}`);
  };
  return (
    <div
      onClick={searchHandler}
      className="p-5 rounded-xl border border-border shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer bg-card hover:border-primary/20 group"
    >
      <div>
        <h1 className="font-medium text-lg">{job?.company?.name}</h1>
        <p className="text-sm text-muted-foreground">Nepal</p>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2 group-hover:text-[#6A38C2] transition-colors">
          {job?.title}
        </h1>
        <p className="text-sm text-muted-foreground line-clamp-2">{job.description}</p>
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
    </div>
  );
};

export default LatestJobCards;
