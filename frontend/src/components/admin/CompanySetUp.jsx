import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const CompanySetUp = () => {
  const [input, setInput] = useState({
    name: "",
    description: "",
    location: "",
    website: "",
    file: null,
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const params = useParams();
  const companyId = params.id;

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("location", input.location);
    formData.append("website", input.website);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      setLoading(true);
      const res = await axios.put(
        `${COMPANY_API_END_POINT}/update/${companyId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        },
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(
          `${COMPANY_API_END_POINT}/get/${companyId}`,
          { withCredentials: true },
        );
        if (res.data.success) {
          const company = res.data.company;
          setInput({
            name: company?.name || "",
            description: company?.description || "",
            website: company?.website || "",
            location: company?.location || "",
            file: company?.file || null,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchSingleJob();
  }, [companyId]);

  return (
    <div>
      <Navbar />
      <div className="lg:max-w-xl container mx-auto -10">
        <form onSubmit={submitHandler}>
          <div className="flex items-center gap-5 p-8">
            <Button
              onClick={() => navigate("/admin/companies")}
              variant="outline"
              className={`flex items-center gap-2 text-gray-500 font-semibold cursor-pointer`}
            >
              <ArrowLeft />
              <span>Back</span>
            </Button>
            <h1 className="font-bold text-xl">Company Setup</h1>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className={`font-bold my-1`}>Company Name</Label>
              <Input
                type={`text`}
                name="name"
                value={input.name}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label className={`font-bold my-1`}>Description</Label>
              <Input
                type={`text`}
                name="description"
                value={input.description}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label className={`font-bold my-1`}>Website</Label>
              <Input
                type={`text`}
                name="website"
                value={input.website}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label className={`font-bold my-1`}>Location</Label>
              <Input
                type={`text`}
                name="location"
                value={input.location}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label className={`font-bold my-1`}>Logo</Label>
              <Input
                type={`file`}
                accept="image/*"
                onChange={changeFileHandler}
              />
            </div>
          </div>
          {loading ? (
            <Button
              className={`cursor-pointer w-full my-4 hover:bg-gray-700 p-5 `}
            >
              <Loader2 className="animate-spin mr-2 h-4 w-4" />
              Please wait
            </Button>
          ) : (
            <Button
              type="submit"
              className={`cursor-pointer w-full my-4 hover:bg-gray-700 p-5`}
            >
              Update
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default CompanySetUp;
