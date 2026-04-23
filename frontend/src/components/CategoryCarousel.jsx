import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Button } from "./ui/button";

const category = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Graphic Designer",
  "FullStack Developer",
];

const CategoryCarousel = () => {
  return (
    <div>
      <Carousel className={`w-full max-w-xl max-md:max-w-sm mx-auto my-20`}>
        <CarouselContent className={``}>
          {category.map((cat, index) => (
            <CarouselItem
              className={`md:basis-1/2 lg:basis-1/3 flex justify-center md:justify-around `}
            >
              <Button
                className={`rounded-full cursor-pointer`}
                variant="outline"
              >
                {cat}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
