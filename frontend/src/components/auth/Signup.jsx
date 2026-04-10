import React from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Button } from "../ui/button";

const Signup = () => {
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form className="w-1/2 border border-gray-200 rounded-md p-4 my-10 shadow-md">
          <h1 className="font-bold text-xl mb-5">Sign Up</h1>
          <div className="my-3 space-y-1">
            <Label>Full Name</Label>
            <Input type="text" placeholder="Enter your full name" />
          </div>
          <div className="my-3 space-y-1">
            <Label>Email</Label>
            <Input type="text" placeholder="abc@gmail.com" />
          </div>
          <div className="my-3 space-y-1">
            <Label>Phone Number</Label>
            <Input type="text" placeholder="Enter your phone number" />
          </div>
          <div className="my-3 space-y-1">
            <Label>Password</Label>
            <Input type="password" placeholder="Enter your password" />
          </div>

          <div className="flex items-center justify-between">
            <RadioGroup className="w-fit flex items-center gap-4 my-5">
              <div className="flex items-center gap-3">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  className="cursor-pointer"
                  id="r1"
                />
                <Label className={`cursor-pointer`} htmlFor="r1">
                  Student
                </Label>
              </div>
              <div className="flex items-center gap-3">
                <Input
                  type="radio"
                  name="role"
                  value="Recruiter"
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
              <Input type="file" accept="image/*" className="cursor-pointer" />
            </div>
          </div>
          <Button
            type="submit"
            className={`cursor-pointer w-full my-4 hover:bg-gray-700 p-5`}
          >
            Sign Up
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
