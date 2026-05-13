import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import AdminJobsTable from "./AdminJobsTable";
import useGetAllAdminJobs from "../hooks/useGetAllAdminJobs";
import { setSearchJobByText } from "@/redux/jobSlice";

const AdminJobs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useGetAllAdminJobs();
  return (
    <div>
      <Navbar />
      <div className=" max-w-6xl mx-auto my-10">
        <div className="flex justify-between items-center">
          <Input
            type={`text`}
            className={`w-fit`}
            placeholder="Filter by name"
            onChange={(e) => {
              dispatch(setSearchJobByText(e.target.value));
              console.log(e.target.value);
            }}
          />
          <Button
            className={`cursor-pointer hover:bg-gray-500`}
            onClick={() => navigate("/admin/companies/create")}
          >
            Add New Jobs
          </Button>
        </div>
        <div>
          <AdminJobsTable />
        </div>
      </div>
    </div>
  );
};

export default AdminJobs;
