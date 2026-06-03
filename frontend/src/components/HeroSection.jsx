import { Search } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchHandler = () => {
    if (!query.trim()) return;
    dispatch(setSearchedQuery(query.trim()));
    navigate("/browse");
  };

  return (
    <section className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6 py-16 sm:py-20 lg:py-24 text-center">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-muted text-[#F83002]">
            No. 1 Job Hunt Website
          </span>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
            Search, Apply & <br className="hidden sm:block" /> Get your{" "}
            <span className="text-[#6A38C2]">Dream Jobs</span>
          </h1>

          <p className="max-w-2xl text-base sm:text-lg md:text-xl text-muted-foreground">
            Explore top career opportunities from leading companies and apply to
            jobs that match your skills and passion.
          </p>

          <div className="flex w-full max-w-md sm:max-w-lg items-center border border-border rounded-full pl-4 pr-1 py-1 shadow-sm bg-background">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="text"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  searchHandler();
                }
              }}
              className="flex-1 outline-none border-none bg-transparent placeholder:text-muted-foreground text-sm sm:text-base py-2"
              placeholder="Find your dream jobs"
            />
            <Button
              onClick={searchHandler}
              size="icon"
              className="rounded-full bg-[#6A38C2] hover:bg-[#5a2ea8] text-white h-10 w-10 shrink-0"
            >
              <Search className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
