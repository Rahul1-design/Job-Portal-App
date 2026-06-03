import { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { SlidersHorizontal, X } from "lucide-react";
import { Button } from "./ui/button";

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  useEffect(() => {
    if (searchedQuery) {
      const filteredJob = allJobs.filter(
        (job) =>
          job?.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job?.description
            .toLowerCase()
            .includes(searchedQuery.toLowerCase()) ||
          job?.location.toLowerCase().includes(searchedQuery.toLowerCase()),
      );
      setFilterJobs(filteredJob);
    } else {
      setFilterJobs(allJobs);
    }
  }, [allJobs, searchedQuery]);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-5">
        <div className="flex gap-6">
          {/* Desktop filter sidebar */}
          <div className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-20">
              <FilterCard />
            </div>
          </div>

          {/* Mobile filter button */}
          <button
            className="lg:hidden flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground mb-4"
            onClick={() => setMobileFilterOpen(true)}
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
          </button>

          {/* Mobile filter overlay */}
          {mobileFilterOpen && (
            <div
              className="fixed inset-0 z-40 bg-black/50 lg:hidden"
              onClick={() => setMobileFilterOpen(false)}
            />
          )}

          {/* Mobile filter drawer */}
          <div
            className={`fixed top-0 left-0 z-50 h-full w-72 bg-background border-r shadow-xl transform transition-transform duration-300 ease-in-out lg:hidden ${
              mobileFilterOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="font-bold">Filters</h2>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-1 text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4">
              <FilterCard />
            </div>
          </div>

          {/* Job Cards */}
          <div className="flex-1 min-w-0">
            {filterJobs.length <= 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <p className="text-lg font-medium text-muted-foreground">
                  No jobs found matching your criteria.
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Try adjusting your filters or search terms.
                </p>
              </div>
            ) : (
              <div className="h-[88vh] overflow-y-auto pb-5">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {filterJobs.map((job) => (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      key={job?._id}
                    >
                      <Job job={job} />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
