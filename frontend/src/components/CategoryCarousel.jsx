import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/jobSlice";

const category = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Graphic Designer",
  "FullStack Developer",
];

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchHandler = (item) => {
    navigate("/browse");
    dispatch(setSearchedQuery(item));
  };
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-16 sm:my-20">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">
        Browse by <span className="text-[#6A38C2]">Category</span>
      </h2>
      <Carousel className="w-full max-w-xs sm:max-w-sm md:max-w-xl lg:max-w-2xl mx-auto">
        <CarouselContent>
          {category.map((cat, index) => (
            <CarouselItem
              key={index}
              className="basis-1/2 md:basis-1/3 lg:basis-1/3 flex justify-center"
            >
              <Button
                onClick={() => searchHandler(cat)}
                className="rounded-full cursor-pointer px-6"
                variant="outline"
              >
                {cat}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex" />
        <CarouselNext className="hidden sm:flex" />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
