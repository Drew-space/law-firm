import React from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import Link from "next/link";

const CTA = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 ">
        <Card className="bg-muted/30 border border-white/10">
          <CardContent className="p-8 md:p-12 lg:p-16 relative overflow-hidden">
            <div className="max-w-2xl relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold  mb-6">
                Ready to take control of your legal journey?
              </h2>

              <p className="text-lg  mb-8">
                Join users who are simplifying how they access legal support.
                Submit your case, connect with lawyers, and manage everything
                from one secure platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-foreground text-background hover:bg-foreground/90"
                >
                  <Link href="/sign-up">Sign Up Now</Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-border text-muted-foreground hover:bg-muted"
                >
                  <Link href="#pricing">View Pricing</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default CTA;
