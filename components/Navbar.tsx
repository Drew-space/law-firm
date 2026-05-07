import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { navLinks } from "@/constants/data";

const Navbar = () => {
  return (
    <header className="fixed h-16 top-0 w-full border-b  bg-background/80 backdrop-blur-md z-10 supports-backdrop-filter:bg-background/60">
      <nav className="px-4 mx-auto h-16 flex items-center justify-between">
        <Link href={"/"}>
          <Image
            className="h-10 w-auto object-contain"
            src={"/law.png"}
            alt="logo"
            height={60}
            width={200}
          />
        </Link>
        <div className="hidden md:flex   items-center gap-12">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-md   hover:text-foreground transition"
            >
              {link.name}
            </Link>
          ))}
        </div>

        <Show when="signed-out">
          <SignUpButton>
            <Button variant={"outline"}>Sign Up</Button>
          </SignUpButton>
        </Show>
        <Show when="signed-in">
          <Link href={"/dashboard"}>
            <Button variant={"outline"}>Dashboard</Button>
          </Link>

          {/* <UserButton /> */}
        </Show>
      </nav>
    </header>
  );
};

export default Navbar;
