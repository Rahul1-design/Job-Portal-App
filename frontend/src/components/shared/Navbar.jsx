import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { LogOut, User2 } from "lucide-react";

function Navbar() {
  const [user, setuser] = useState(false);
  return (
    <div className=" bg-white">
      <div className="flex items-center mx-auto justify-between max-w-7xl h-16">
        <div>
          <h1 className="text-2xl ">
            Job<span className="text-[#F83002]">Portal</span>
          </h1>
        </div>
        <div className="flex items-center gap-12">
          <ul className="flex font-medium items-center gap-5">
            <Link to="/">Home</Link>
            <Link>Jobs</Link>
            <Link>Browse</Link>
          </ul>

          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button
                  className={`cursor-pointer hover:brightness-90`}
                  variant="outline"
                >
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button
                  className={`cursor-pointer bg-[#6A38C2] hover:bg-[#4e209e]`}
                >
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger>
                <Avatar className={`cursor-pointer`}>
                  <AvatarImage src="https://github.com/shadcn.png" />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className={`w-80`}>
                <div className="flex gap-4 space-y-2">
                  <Avatar className={`cursor-pointer`}>
                    <AvatarImage src="https://github.com/shadcn.png" />
                  </Avatar>
                  <div>
                    <h4 className="font-medium">Rahul Shrestha</h4>
                    <p className="text-sm text-muted-foreground">
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="cursor-pointer flex items-center gap-2">
                    <User2 />
                    <Button className={`cursor-pointer`} variant="link">
                      View Profile
                    </Button>
                  </div>
                  <div className="cursor-pointer flex items-center gap-2">
                    <LogOut />
                    <Button className={`cursor-pointer`} variant="link">
                      Logout
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
