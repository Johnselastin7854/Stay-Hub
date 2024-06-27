"use client";

import { UserButton, useAuth } from "@clerk/nextjs";
import Container from "./Container";
import Image from "next/image";
import SearchInput from "../SearchInput";
import { DarkMode } from "../DarkMode";
import NavMenu from "./NavMenu";
import { Button } from "../ui/button";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const { userId } = useAuth();
  const [toggleDarkMode, setToggleDarkMode] = useState("");

  return (
    <header className="sticky top-0 border border-b-primary/10 bg-secondary z-10">
      <Container>
        <nav className="flex items-center justify-between">
          <Link href={"/"}>
            <Image
              src={
                toggleDarkMode === "dark" ? "/logo-white.png" : "/logo-dark.png"
              }
              alt="Stay_Hub_Logo"
              width={130}
              height={130}
              sizes="100vw"
              priority
            />
          </Link>
          <SearchInput />
          <div className="flex items-center gap-3">
            <DarkMode handleToggleMode={setToggleDarkMode} />
            <NavMenu />
            {!userId && (
              <div className="space-x-2">
                <Button
                  onClick={() => router.push("/sign-in")}
                  variant={"outline"}
                  size={"sm"}
                >
                  Sign In
                </Button>
                <Button onClick={() => router.push("/sign-in")} size={"sm"}>
                  Sign up
                </Button>
              </div>
            )}
            <UserButton afterSignOutUrl="/" />
          </div>
        </nav>
      </Container>
    </header>
  );
};

export default Navbar;
