import React from "react";
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
  return (
    <div className="w-full bg-white p-3 rounded-md">
      <h2 className="text-xl font-bold">Filter Jobs</h2>
      <hr className="mt-3" />
      {filterData.map((data, index) => (
        <div key={index}>
          <h2 className="font-bold text-lg">{data.filterType}</h2>
          <RadioGroup>
            {data.array.map((item, index) => {
              return (
                <div
                  key={index}
                  className="flex gap-3 items-center my-0.5 space-x-2 ml-5"
                >
                  <RadioGroupItem value={item} />
                  <Label>{item}</Label>
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
