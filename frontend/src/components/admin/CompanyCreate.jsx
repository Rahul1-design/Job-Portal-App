import React, { useState } from "react";
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

const CompanyCreate = () => {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState();
  const onChangeHandler = (e) => {
    setCompanyName({ ...companyName, [e.target.name]: e.target.value });
  };
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
    }
  };
  return (
    <div>
      <Navbar />
      <div className="lg:max-w-4xl container mx-auto">
        <div className="my-10">
          <h1 className="font-bold text-2xl">Your Company Name</h1>
          <p className="text-gray-500">
            What would you like to give your company name? you can change this
            later.
          </p>
        </div>
        <Label htmlFor="1" className={`font-medium text-lg cursor-pointer`}>
          Company Name
        </Label>
        <Input
          name="CompanyName"
          onChange={onChangeHandler}
          id="1"
          type={`text`}
          className={`my-2 p-5`}
          placeholder="Esewa, Microsoft, Pathao etc..."
        />
        <div className="flex items-center gap-2 my-10">
          <Button
            className={`cursor-pointer`}
            variant="outline"
            onClick={() => navigate("/admin/companies")}
          >
            Cancel
          </Button>
          <Button
            onClick={() => registerNewCompany()}
            className={`hover:bg-gray-600 cursor-pointer`}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CompanyCreate;
