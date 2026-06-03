import { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { X } from "lucide-react";

const filterData = [
  {
    filterType: "Location",
    array: ["Kathmandu", "Biratnagar", "Pokhara", "Chitwan", "Bhaktapur"],
  },
  {
    filterType: "Industry",
    array: [
      "Frontend Developer",
      "Backend Developer",
      "React Developer",
      "MERN Stack Developer",
      "Nextjs Developer",
    ],
  },
  {
    filterType: "Salary",
    array: ["0-40k", "42k-1Lakh", "1lakh-3lakh", "3lakh-5lakh"],
  },
];

const FilterCard = ({ className = "" }) => {
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();

  const changeHandler = (value) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [dispatch, selectedValue]);

  const clearFilter = () => {
    setSelectedValue("");
  };

  return (
    <div className={`w-full bg-card p-4 rounded-xl border border-border shadow-sm ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-bold">Filter Jobs</h2>
        {selectedValue && (
          <button
            onClick={clearFilter}
            className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
          >
            <X className="w-3 h-3" />
            Clear
          </button>
        )}
      </div>
      <hr className="mb-4" />
      {filterData.map((data, index) => (
        <div key={index} className="mb-4">
          <h2 className="font-semibold text-sm mb-2 text-muted-foreground uppercase tracking-wide">
            {data.filterType}
          </h2>
          <RadioGroup value={selectedValue} onValueChange={changeHandler}>
            {data.array.map((item, indx) => {
              const newId = `r${index}-${indx}`;
              return (
                <div
                  key={indx}
                  className="flex items-center gap-3 py-1"
                >
                  <RadioGroupItem
                    className="cursor-pointer"
                    id={newId}
                    value={item}
                  />
                  <Label className="cursor-pointer text-sm font-normal" htmlFor={newId}>
                    {item}
                  </Label>
                </div>
              );
            })}
          </RadioGroup>
        </div>
      ))}
    </div>
  );
};

export default FilterCard;
