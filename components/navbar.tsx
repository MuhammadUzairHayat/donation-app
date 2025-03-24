"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { Cross, Home, MenuIcon, PlusCircle } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2 font-bold text-xl text-primary">
          <Home className="h-5 w-5" />
          <span className="hidden md:block lg:block">Donation System</span>
        </div>

        <nav className="hidden md:flex lg:flex items-center gap-6">
          <Link
            href="/"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary relative",
              pathname === "/" ? "text-primary" : "text-muted-foreground"
            )}
          >
            <span>Home</span>
            {pathname === "/" && (
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"></span>
            )}
          </Link>

          <Link
            href="/donations"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary relative",
              pathname === "/donations" || pathname.startsWith("/donations/")
                ? "text-primary"
                : "text-muted-foreground"
            )}
          >
            <span>View All</span>
            {(pathname === "/donations" ||
              pathname.startsWith("/donations/")) && (
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"></span>
            )}
          </Link>
        </nav>

        {/* ---sideNav */}
        <div className={`bg-[#00000085] block md:hidden lg:hidden absolute top-0 right-0 left-0 bottom-0 h-[100vh]  ${isOpen ? "translate-x-0": "translate-x-full opacity-0"}`}>
          <nav className={`absolute right-1 top-[13.2vh] max-w-80 w-full min-h-40 justify-center gap-6 flex md:hidden lg:hidden flex-col border-[1px] border-secondary/30 bg-orange-100  dark:bg-[#09090e] p-4 rounded-md shadow-md duration-500 ${isOpen ? "translate-x-0": "translate-x-full"}`}>
            <Cross className="rotate-45 ml-2 text-primary" onClick={()=> setIsOpen(false)}/>
            <Link
              href="/"
              className={cn(
                "text-sm font-medium transition-colors hover:text-orange-600j relative py-2",
                pathname === "/"
                  ? "text-orange-600 border-[1px] border-primary/30 rounded-t-md"
                  : "text-orange-400"
              )}
            >
              <span className="px-2">Home</span>
              {pathname === "/" && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-orange-600 rounded-full"></span>
              )}
            </Link>
            <Link
              href="/donations"
              className={cn(
                "text-sm font-medium py-2 transition-colors mb-10 hover:text-orange-600 relative",
                pathname === "/donations" || pathname.startsWith("/donations/")
                  ? "text-orange-600 border-[1px] border-primary/30 rounded-t-md"
                  : "text-orange-400"
              )}
            >
              <span className="px-2">View All</span>
              {(pathname === "/donations" ||
                pathname.startsWith("/donations/")) && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-orange-600 rounded-full"></span>
              )}
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <Button
            asChild
            size="sm"
            className=" bg-secondary hover:bg-secondary hover:opacity-90 border-secondary/50 "
          >
            <Link href="/new">
              <PlusCircle className="h-4 w-4 text-white" />
              <span className="hidden md:block lg:block ml-2  transition-all duration-150">
                New Entry
              </span>
            </Link>
          </Button>
          <ModeToggle />
          <MenuIcon className="cursor-pointer block md:hidden  lg:hidden"  onClick={()=> setIsOpen(true)}/>
        </div>
      </div>
    </header>
  );
}
