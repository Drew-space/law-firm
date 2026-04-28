import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center font-sans gap-10 px-4">
      {/* text */}
      <div className="flex flex-col items-center gap-6">
        <div className="text-center flex flex-col space-y-4 max-w-xl">
          <p>Legal services made simple</p>

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

        <button className="h-12 bg-black text-white rounded-full px-8">
          Get Started
        </button>
      </div>

      {/* images */}
      <div className="w-full max-w-5xl">
        <div className="flex gap-4 w-full">
          <div className="relative w-[60%] h-80 rounded-md overflow-hidden">
            <Image
              src="/law-image.jpg"
              alt="Law"
              fill
              className="object-cover"
            />
          </div>

          <div className="relative w-[40%] h-80 rounded-md overflow-hidden">
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
