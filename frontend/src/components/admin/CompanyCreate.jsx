import { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/companySlice";
import { ArrowLeft } from "lucide-react";

const CompanyCreate = () => {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState("");
  const dispatch = useDispatch();

  const registerNewCompany = async () => {
    try {
      const res = await axios.post(
        `${COMPANY_API_END_POINT}/register`,
        { companyName },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );
      if (res.data.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message);
        const companyId = res?.data?.company?._id;
        navigate(`/admin/companies/${companyId}`);
      } else {
        console.log(
          "Check in CompanyCreate.jsx . Data is not being received successfully",
        );
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div>
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 my-10">
        <Button
          onClick={() => navigate("/admin/companies")}
          variant="ghost"
          className="mb-6 gap-2 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>

        <div className="bg-card border border-border rounded-xl shadow-sm p-6 sm:p-8">
          <div className="mb-6">
            <h1 className="font-bold text-2xl">Your Company Name</h1>
            <p className="text-muted-foreground text-sm mt-1">
              What would you like to give your company name? You can change this
              later.
            </p>
          </div>
          <Label htmlFor="company" className="font-medium text-base">
            Company Name
          </Label>
          <Input
            id="company"
            name="CompanyName"
            onChange={(e) => setCompanyName(e.target.value)}
            type="text"
            className="my-2 py-5"
            placeholder="Esewa, Microsoft, Pathao etc..."
          />
          <div className="flex items-center gap-3 mt-8">
            <Button
              variant="outline"
              onClick={() => navigate("/admin/companies")}
              className="cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              onClick={() => registerNewCompany()}
              className="cursor-pointer"
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyCreate;
