import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Check, Scale } from "lucide-react";
import { creditBenefits } from "@/constants/data";

const PricingSection = () => {
  return (
    <section className="py-20 font-inter ">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {" "}
            Legal Service Plans{" "}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Choose the legal service plan that fits your needs.
          </p>
        </div>
        <Card className="mt-12 bg-muted/20 ">
          <CardHeader>
            <CardTitle>
              <div className=" w-fit rounded-sm  text-white bg-black p-3">
                <Scale className="w-6 h-6 " />
              </div>
              <p className="mt-2"> How Our Platform Works</p>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {creditBenefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <div className="mr-3 mt-1 p-1 rounded-full bg-black ">
                    <Check className="h-4 w-4 text-white " />
                  </div>
                  <p className="text-muted-foreground">{benefit} </p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default PricingSection;
