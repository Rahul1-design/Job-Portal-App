import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Mail, Pen, Phone } from "lucide-react";
import { useSelector } from "react-redux";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";

// const skills = ["HTML", "CSS", "Javascript", "React", "Git", "MongoDB"];

const isResume = true;

const Profile = () => {
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);
  return (
    <div>
      <Navbar />
      <div className="max-md:container max-w-4xl  mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <Avatar className={`w-20 h-20`}>
              <AvatarImage
                src="https://images-platform.99static.com//WnnxETQYaEVDQZxa1ZVZVZjtO-4=/317x274:817x774/fit-in/590x590/99designs-contests-attachments/67/67571/attachment_67571500"
                alt="profile"
              />
            </Avatar>
            <div>
              <h2 className="font-medium text-xl">{user?.fullname}</h2>
              <p>{user?.profile?.bio}</p>
            </div>
          </div>
          <Button
            onClick={() => setOpen(true)}
            variant="outline"
            className="text-right cursor-pointer"
          >
            <Pen />
          </Button>
        </div>
        <div className="my-5">
          <div className="flex gap-4 my-2">
            <Mail />
            <span>{user?.email}</span>
          </div>
          <div className="flex gap-4 my-2">
            <Phone />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>
        <div className="my-5">
          <h2>Skills</h2>
          <div className="flex gap-2">
            {user?.profile?.skills.length <= 0 ? (
              <span>NA</span>
            ) : (
              user?.profile?.skills.map((item, index) => (
                <Badge key={index}>{item}</Badge>
              ))
            )}
          </div>
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label className={`text-md font-bold`}>Resume</Label>
          {isResume ? (
            <a
              onClick={() => console.log(user?.profile?.resume)}
              className="text-blue-400 w-full hover:underline italic"
              href={`https://docs.google.com/viewer?url=${encodeURIComponent(user?.profile?.resume)}&embedded=true`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {user?.profile?.resumeOriginalName}
            </a>
          ) : (
            <span>NA</span>
          )}
        </div>
      </div>
      <div className="max-md:container max-w-4xl  mx-auto bg-white rounded-2xl ">
        <h3 className="font-bold text-lg my-5">Applied Jobs</h3>

        {/* Application Table Component */}
        <AppliedJobTable />
      </div>
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
