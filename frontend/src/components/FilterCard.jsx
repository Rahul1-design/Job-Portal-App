import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";

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

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const changeHandler = (value) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    console.log(selectedValue);
  }, [selectedValue]);

  return (
    <div className="w-full bg-white p-3 rounded-md">
      <h2 className="text-xl font-bold">Filter Jobs</h2>
      <hr className="mt-3" />
      {filterData.map((data, index) => (
        <div key={index}>
          <h2 className="font-bold text-lg">{data.filterType}</h2>
          <RadioGroup value={selectedValue} onValueChange={changeHandler}>
            {data.array.map((item, indx) => {
              const newId = `r${index} - ${indx}`;
              return (
                <div
                  key={indx}
                  className="flex space-y-2 gap-3 items-center my-0.5 space-x-1 ml-5"
                >
                  <RadioGroupItem
                    className={`cursor-pointer`}
                    id={newId}
                    value={item}
                  />
                  <Label className={`cursor-pointer`} htmlFor={newId}>
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
