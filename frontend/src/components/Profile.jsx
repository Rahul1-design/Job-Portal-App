import { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Mail, Pen, Phone, Briefcase, FileText } from "lucide-react";
import { useSelector } from "react-redux";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import useGetAppliedJobs from "./hooks/useGetAppliedJobs";

const Profile = () => {
  useGetAppliedJobs();

  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  return (
    <div className="min-h-screen bg-muted/30">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {/* Profile Card */}
        <div className="bg-card border border-border rounded-2xl shadow-sm p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16 sm:w-20 sm:h-20">
                <AvatarImage src={user?.profile?.profilePhoto} alt="profile" />
              </Avatar>
              <div>
                <h2 className="font-semibold text-xl sm:text-2xl">{user?.fullname}</h2>
                <p className="text-sm text-muted-foreground">{user?.profile?.bio}</p>
              </div>
            </div>
            <Button
              onClick={() => setOpen(true)}
              variant="outline"
              className="gap-2 shrink-0 cursor-pointer"
            >
              <Pen className="w-4 h-4" />
              Edit
            </Button>
          </div>

          <div className="border-b border-border my-6" />

          <div className="space-y-4">
            <div className="flex items-center gap-3 text-sm">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <span>{user?.email}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Phone className="w-4 h-4 text-muted-foreground" />
              <span>{user?.phoneNumber}</span>
            </div>
          </div>

          <div className="border-b border-border my-6" />

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-muted-foreground" />
              <h3 className="font-semibold">Skills</h3>
            </div>
            <div className="flex gap-2 flex-wrap">
              {user?.profile?.skills?.length <= 0 ? (
                <span className="text-sm text-muted-foreground">NA</span>
              ) : (
                user?.profile?.skills?.map((item, index) => (
                  <Badge key={index} variant="secondary">
                    {item}
                  </Badge>
                ))
              )}
            </div>
          </div>

          <div className="border-b border-border my-6" />

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-muted-foreground" />
              <Label className="font-semibold">Resume</Label>
            </div>
            {user?.profile?.resume ? (
              <a
                className="text-primary hover:underline text-sm inline-flex items-center gap-1"
                href={`https://docs.google.com/viewer?url=${encodeURIComponent(user?.profile?.resume)}&embedded=true`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FileText className="w-4 h-4" />
                {user?.profile?.resumeOriginalName}
              </a>
            ) : (
              <span className="text-sm text-muted-foreground">No resume uploaded</span>
            )}
          </div>
        </div>

        {/* Applied Jobs */}
        <div className="mt-8">
          <h3 className="font-bold text-xl mb-4">Applied Jobs</h3>
          <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
            <AppliedJobTable />
          </div>
        </div>

        <UpdateProfileDialog open={open} setOpen={setOpen} />
      </div>
    </div>
  );
};

export default Profile;
