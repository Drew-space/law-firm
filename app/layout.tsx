// import type { Metadata } from "next";
// import { Geist, Geist_Mono, Inter, Mona_Sans } from "next/font/google";

// import { cn } from "@/lib/utils";

// export const metadata: Metadata = {
//   title: "law firm",
//   description: "find a lawyer online.",
// };

// export default function MainLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <div className={cn("h-full antialiased font-sans")}>
//       <main className="">{children}</main>
//     </div>
//   );
// }

import { Bebas_Neue, Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import "@/app/globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-heading",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={cn("h-full antialiased", inter.variable, bebas.variable)}
      >
        <body className="min-h-full flex flex-col">{children}</body>
      </html>
    </ClerkProvider>
  );
}
