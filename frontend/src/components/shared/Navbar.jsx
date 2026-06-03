import { Link, useNavigate } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { LogOut, User2, Menu, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";
import { persistor } from "@/redux/store";
import { useState } from "react";

function Navbar() {
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [mobileOpen, setMobileOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        await persistor.purge();
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const recruiterLinks = [
    { to: "/admin/companies", label: "Companies" },
    { to: "/admin/jobs", label: "Jobs" },
  ];

  const studentLinks = [
    { to: "/", label: "Home" },
    { to: "/jobs", label: "Jobs" },
    { to: "/browse", label: "Browse" },
  ];

  const navLinks = user && user.role === "recruiter" ? recruiterLinks : studentLinks;

  const handleNavClick = (to) => {
    setMobileOpen(false);
    navigate(to);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center justify-between h-16 px-4 mx-auto max-w-7xl">
        <div>
          <h1
            onClick={() => navigate("/")}
            className="text-2xl font-bold cursor-pointer"
          >
            Job<span className="text-[#F83002]">Portal</span>
          </h1>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          <ul className="flex font-medium items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#6A38C2] hover:bg-[#5a2ea8] text-white">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user?.profile?.profilePhoto} />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-72 p-4">
                <div className="flex gap-3 mb-3">
                  <Avatar>
                    <AvatarImage src={user?.profile?.profilePhoto} />
                  </Avatar>
                  <div className={user?.role === "recruiter" ? "flex items-center" : ""}>
                    <h4 className="font-medium text-[16px]">{user.fullname}</h4>
                    <p className="text-sm text-muted-foreground">
                      {user?.profile?.bio}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  {user && user.role === "student" && (
                    <div
                      onClick={() => navigate("/profile")}
                      className="cursor-pointer flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-muted transition-colors"
                    >
                      <User2 className="w-4 h-4" />
                      <span className="text-sm font-medium">View Profile</span>
                    </div>
                  )}
                  <div
                    onClick={logoutHandler}
                    className="cursor-pointer flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-muted transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="text-sm font-medium">Logout</span>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 text-muted-foreground hover:text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-72 bg-background border-l shadow-xl transform transition-transform duration-300 ease-in-out md:hidden ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h1 className="text-xl font-bold">
            Job<span className="text-[#F83002]">Portal</span>
          </h1>
          <button
            onClick={() => setMobileOpen(false)}
            className="p-1 text-muted-foreground hover:text-foreground"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex flex-col p-4 gap-2">
          {navLinks.map((link) => (
            <button
              key={link.to}
              onClick={() => handleNavClick(link.to)}
              className="text-left px-3 py-2.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors font-medium"
            >
              {link.label}
            </button>
          ))}

          <hr className="my-2" />

          {!user ? (
            <div className="flex flex-col gap-2 mt-2">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => handleNavClick("/login")}
              >
                Login
              </Button>
              <Button
                className="w-full bg-[#6A38C2] hover:bg-[#5a2ea8] text-white"
                onClick={() => handleNavClick("/signup")}
              >
                Signup
              </Button>
            </div>
          ) : (
            <div className="flex flex-col gap-2 mt-2">
              <div className="flex items-center gap-3 px-3 py-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={user?.profile?.profilePhoto} />
                </Avatar>
                <div>
                  <p className="font-medium text-sm">{user.fullname}</p>
                  <p className="text-xs text-muted-foreground">{user?.profile?.bio}</p>
                </div>
              </div>
              {user.role === "student" && (
                <button
                  onClick={() => handleNavClick("/profile")}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                >
                  <User2 className="w-4 h-4" />
                  <span className="font-medium">View Profile</span>
                </button>
              )}
              <button
                onClick={() => {
                  setMobileOpen(false);
                  logoutHandler();
                }}
                className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
