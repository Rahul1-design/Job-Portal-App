import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const Signup = () => {
  const [open, setOpen] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((store) => store.auth);

  const changeIcon = () => {
    setOpen(!open);
  };
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
    // console.log({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-1/2 border border-gray-200 rounded-md p-4 my-10 shadow-md"
        >
          <h1 className="font-bold text-xl mb-5">Sign Up</h1>
          <div className="my-3 space-y-1">
            <Label>Full Name</Label>
            <Input
              value={input.fullname}
              name="fullname"
              onChange={changeEventHandler}
              type="text"
              placeholder="Enter your full name"
            />
          </div>
          <div className="my-3 space-y-1">
            <Label>Email</Label>
            <Input
              name="email"
              value={input.email}
              onChange={changeEventHandler}
              type="text"
              placeholder="abc@gmail.com"
            />
          </div>
          <div className="my-3 space-y-1">
            <Label>Phone Number</Label>
            <Input
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={changeEventHandler}
              type="text"
              placeholder="Enter your phone number"
            />
          </div>
          <div className="my-3 space-y-1">
            <Label>Password</Label>
            <div className="flex relative items-center ">
              <Input
                name="password"
                value={input.password}
                onChange={changeEventHandler}
                type={open ? "password" : "text"}
                placeholder="Enter your password"
              />
              <span className="absolute right-3">
                {open ? (
                  <div>
                    <img
                      className="hover:cursor-pointer z-1"
                      width={20}
                      onClick={changeIcon}
                      src="/eye-password-hide.svg"
                      alt="Hide_Icon"
                    />
                  </div>
                ) : (
                  <div>
                    <img
                      className="hover:cursor-pointer z-2"
                      onClick={changeIcon}
                      width={20}
                      src="/openeye.png"
                      alt="Show_Icon"
                    />
                  </div>
                )}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between gap-5">
            <RadioGroup className="w-fit flex items-center gap-4 my-5">
              <div className="flex items-center gap-3">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                  id="r1"
                />
                <Label className={`cursor-pointer`} htmlFor="r1">
                  Student
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  onChange={changeEventHandler}
                  checked={input.role === "recruiter"}
                  className="cursor-pointer"
                  id="r2"
                />
                <Label className={`cursor-pointer`} htmlFor="r2">
                  Recruiter
                </Label>
              </div>
            </RadioGroup>
            <div className="flex items-center gap-2">
              <Label>Profile</Label>
              <Input
                onChange={changeFileHandler}
                type="file"
                accept="image/*"
                className="cursor-pointer"
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
              Signup
            </Button>
          )}

          <span className="flex justify-center">
            Already have an account?{" "}
            <Link
              className=" text-blue-600 hover:text-blue-800 hover:underline"
              to="/login"
            >
              Login
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
