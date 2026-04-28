import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { testimonials } from "@/constants/data";
import { Badge } from "./ui/badge";

const Testimonial = () => {
  return (
    <section id="testimonials" className="py-15 mt-20 bg-muted/30 ">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge
            variant={"outline"}
            className="bg-muted px-4 py-1 text-sm font-medium mb-4"
          >
            Success Stories
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our Users Say
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Here from users who use our platform
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => {
            return (
              <Card key={index}>
                <CardContent>
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mr-4">
                      <span>{testimonial.initials} </span>
                    </div>
                    <div className="">
                      <h4 className="font-bold"> {testimonial.name} </h4>
                      <p className=""> {testimonial.role} </p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    &quot;{testimonial.quote}&quot;
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

export default Testimonial;
