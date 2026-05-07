import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarGroup, AvatarImage } from "./ui/avatar";

const Hero = () => {
  return (
    <section
      className="
  flex 
  min-h-[calc(100vh-80px)] 
  mt-20
  flex-col 
  items-center 
  justify-center 
  font-sans 
  gap-10 
  px-4
"
    >
      {/* text */}
      <div className="flex flex-col items-center gap-6">
        <div className="text-center flex flex-col space-y-4 max-w-xl">
          <div className="flex justify-center gap-4 items-center">
            <AvatarGroup className="grayscale">
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarImage
                  src="https://github.com/maxleiter.png"
                  alt="@maxleiter"
                />
                <AvatarFallback>LR</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarImage
                  src="https://github.com/evilrabbit.png"
                  alt="@evilrabbit"
                />
                <AvatarFallback>ER</AvatarFallback>
              </Avatar>
            </AvatarGroup>
            <p> Legal services made simple</p>
          </div>

          <h1 className=" font-heading tracking-wide  font-semibold text-5xl">
            Hire lawyers, submit your case online, and manage your legal process
            in one secure platform.
          </h1>

          <p>
            A complete legal service platform designed to connect you with
            experienced lawyers who handle your case from start to resolution
            entirely online
          </p>
        </div>

        <button className="h-12 bg-black text-white rounded-full cursor-pointer px-8">
          Get Started
        </button>
      </div>

      {/* images */}
      <div className="w-full max-w-5xl">
        <div className="flex gap-4 w-full">
          <div className="relative w-[60%] h-45 md:h-80 rounded-md overflow-hidden">
            <Image
              src="/law-image.jpg"
              alt="Law"
              fill
              className="object-cover"
            />
          </div>

          <div className="relative w-[40%] h-45 md:h-80 rounded-md overflow-hidden">
            <Image
              src="/image.png"
              alt="Platform"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
