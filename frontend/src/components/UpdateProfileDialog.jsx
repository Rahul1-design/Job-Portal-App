import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";

const UpdateProfileDialog = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);

  const dispatch = useDispatch();

  const [input, setInput] = useState({
    fullname: user?.fullname,
    email: user?.email,
    phoneNumber: user?.phoneNumber,
    bio: user?.profile?.bio,
    skills: user?.profile?.skills?.map((skill) => skill),
    file: user?.profile?.resume,
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);
    if (input?.file) {
      formData.append("file", input.file);
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `${USER_API_END_POINT}/profile/update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        },
      );
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.data.message);
    } finally {
      setLoading(false);
    }
    setOpen(false);
    console.log(input);
  };

  const fileEvenHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className={`sm:max-w-106.25`}
          onInteractOutside={() => setOpen(false)}
          showCloseButton={true}
        >
          <DialogHeader>
            <DialogTitle>Update Profile</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Update your personal information and resume here.
          </DialogDescription>
          <form onSubmit={submitHandler}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-1">
                <Label htmlFor="name" className={`text-right`}>
                  Name
                </Label>
                <Input
                  type="text"
                  onChange={changeEventHandler}
                  value={input.fullname}
                  id="name"
                  name="fullname"
                  className={`col-span-3`}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-1">
                <Label htmlFor="email" className={`text-right`}>
                  Email
                </Label>
                <Input
                  type="email"
                  onChange={changeEventHandler}
                  value={input.email}
                  id="email"
                  name="email"
                  className={`col-span-3`}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-1">
                <Label htmlFor="number" className={`text-right`}>
                  Number
                </Label>
                <Input
                  type="text"
                  onChange={changeEventHandler}
                  value={input.phoneNumber}
                  id="number"
                  name="phoneNumber"
                  className={`col-span-3`}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-1">
                <Label htmlFor="bio" className={`text-right`}>
                  Bio
                </Label>
                <Input
                  type="text"
                  onChange={changeEventHandler}
                  value={input.bio}
                  id="bio"
                  name="bio"
                  className={`col-span-3`}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-1">
                <Label htmlFor="skills" className={`text-right`}>
                  Skills
                </Label>
                <Input
                  type="text"
                  onChange={changeEventHandler}
                  value={input.skills}
                  id="skills"
                  name="skills"
                  className={`col-span-3`}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-1">
                <Label htmlFor="file" className={`text-right`}>
                  Resume
                </Label>
                <Input
                  id="file"
                  onChange={fileEvenHandler}
                  type={`file`}
                  accept="application/pdf"
                  name="file"
                  className={`col-span-3`}
                />
              </div>
            </div>
            <DialogFooter className={``}>
              {loading ? (
                <Button
                  disabled={loading}
                  className={`w-full my-4  cursor-pointer hover:bg-gray-800`}
                >
                  <Loader2 className="animate-spin w-4 h-4 mr-2" />
                  Please wait
                </Button>
              ) : (
                <Button
                  type="submit"
                  className={`w-full my-4 cursor-pointer hover:bg-gray-800`}
                >
                  Update
                </Button>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateProfileDialog;
