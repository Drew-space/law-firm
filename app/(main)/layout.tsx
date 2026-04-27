import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Mona_Sans } from "next/font/google";

import { cn } from "@/lib/utils";

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
    <div className={cn("h-full antialiased font-sans")}>
      <main className="">{children}</main>
    </div>
  );
}
