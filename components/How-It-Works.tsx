import { features } from "@/constants/data";
import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

const HowItWorks = () => {
  return (
    <section className="py-15 mt-20 bg-muted/30 ">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4"> How It Works</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Our platform brings legal support online in just a few clicks.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <Card key={index}>
                <CardHeader>
                  <div className="bg-black/90 rounded-lg w-fit p-3 mb-4">
                    <Icon className="h-6 w-6 text-white " />
                  </div>

                  <CardTitle className="text-xl font-semibold ">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {feature.description}{" "}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
