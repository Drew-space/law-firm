import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <header className="fixed top-0 w-full border-b  bg-background/80 backdrop-blur-md z-10 supports-backdrop-filter:bg-background/60">
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

        <Show when="signed-out">
          <SignUpButton>
            <Button variant={"outline"}>Sign Up</Button>
          </SignUpButton>
        </Show>
        <Show when="signed-in">
          <UserButton />
        </Show>
      </nav>
    </header>
  );
};

export default Navbar;
