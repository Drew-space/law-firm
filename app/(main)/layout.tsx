import type { Metadata } from "next";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "law firm",
  description: "find a lawyer online.",
};

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TooltipProvider>
      <Navbar />
      <main className="flex-1">{children}</main>
      <footer>
        <div className="container mx-auto px-4 text-center">
          <p>made with love by Drew</p>
        </div>
      </footer>
    </TooltipProvider>
  );
}
