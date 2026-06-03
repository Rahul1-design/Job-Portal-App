import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CompaniesTables from "./CompaniesTables";
import { useNavigate } from "react-router-dom";
import useGetAllCompany from "../hooks/useGetAllCompany";
import { useDispatch } from "react-redux";
import { setSearchCompanyByText } from "@/redux/companySlice";
import { Search, Plus } from "lucide-react";

const Companies = () => {
  useGetAllCompany();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 my-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 my-5">
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              className="w-full sm:w-64 pl-9"
              placeholder="Filter by name"
              onChange={(e) => {
                dispatch(setSearchCompanyByText(e.target.value));
              }}
            />
          </div>
          <Button
            className="cursor-pointer gap-2 shrink-0"
            onClick={() => navigate("/admin/companies/create")}
          >
            <Plus className="w-4 h-4" />
            New Company
          </Button>
        </div>
        <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
          <CompaniesTables />
        </div>
      </div>
    </div>
  );
};

export default Companies;
