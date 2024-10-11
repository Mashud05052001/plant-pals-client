"use client";
import { aboutCarouselData } from "@/src/constant/about.constant";
import Image from "next/image";
import { useEffect, useState } from "react";

const AboutCarousel = () => {
  const [currentSlider, setCurrentSlider] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(
      () =>
        setCurrentSlider(
          currentSlider === aboutCarouselData.length - 1 ? 0 : currentSlider + 1
        ),
      5000
    );
    return () => clearInterval(intervalId);
  }, [currentSlider]);
  return (
    <div className="my-20  w-[100%]  lg:w-full mx-auto">
      <div className="flex flex-row-reverse justify-between">
        <div className=" w-full transform overflow-hidden rounded-lg before:bg-black/50 h-96 md:h-[540px] lg:gap-10">
          {aboutCarouselData.map((slide, index) => {
            const { img, title, des } = slide;
            return (
              <div
                className={`${
                  index === currentSlider
                    ? "visible opacity-100"
                    : "invisible opacity-0"
                } absolute inset-0 duration-500 ease-linear`}
                key={`index_${index}`}
              >
                <Image
                  src={img}
                  height={1200}
                  width={1200}
                  alt={title}
                  className={`h-full w-full object-cover duration-500 ease-linear ${
                    index === currentSlider ? "scale-100" : "scale-105"
                  }`}
                />

                <div className="absolute inset-0 flex flex-col bg-black/40 p-5 md:p-10 text-center text-white drop-shadow-lg">
                  <div className="my-auto rounded-md bg-black p-3 bg-opacity-60">
                    <div className="mb-3 overflow-hidden font-bold text-3xl">
                      <h1
                        className={`${
                          index === currentSlider ? "" : "translate-y-12"
                        } duration-500 ease-linear text-common-500`}
                      >
                        {title}
                      </h1>
                    </div>
                    <div className="overflow-hidden text-sm md:text-base lg:text-lg">
                      <p
                        className={`${
                          index === currentSlider ? "" : "-translate-y-12"
                        } duration-500 ease-linear`}
                      >
                        {des}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AboutCarousel;
