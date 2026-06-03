import { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import { Loader2, Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, user } = useSelector((store) => store.auth);

  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-4 py-10">
        <form
          onSubmit={submitHandler}
          className="w-full max-w-md border border-border rounded-xl p-6 sm:p-8 shadow-sm bg-card"
        >
          <h1 className="font-bold text-2xl mb-6">Welcome Back</h1>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                onChange={changeEventHandler}
                value={input.email}
                type="email"
                placeholder="abc@gmail.com"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  value={input.password}
                  onChange={changeEventHandler}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label>Role</Label>
              <div className="flex gap-6 pt-1">
                <div className="flex items-center gap-2">
                  <Input
                    name="role"
                    onChange={changeEventHandler}
                    type="radio"
                    value="student"
                    checked={input.role === "student"}
                    className="w-4 h-4 cursor-pointer"
                    id="r1"
                  />
                  <Label className="cursor-pointer font-normal" htmlFor="r1">
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
                    className="w-4 h-4 cursor-pointer"
                    id="r2"
                  />
                  <Label className="cursor-pointer font-normal" htmlFor="r2">
                    Recruiter
                  </Label>
                </div>
              </div>
            </div>
          </div>

          {loading ? (
            <Button disabled className="w-full mt-6 py-5 cursor-pointer">
              <Loader2 className="animate-spin mr-2 h-4 w-4" />
              Please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full mt-6 py-5 cursor-pointer">
              Login
            </Button>
          )}

          <p className="text-center mt-4 text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              className="text-primary hover:text-primary/80 hover:underline font-medium"
              to="/signup"
            >
              Signup
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
