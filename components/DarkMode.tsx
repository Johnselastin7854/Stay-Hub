"use client";

import * as React from "react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoonIcon, SunIcon } from "lucide-react";

type Props = {
  handleToggleMode: React.Dispatch<React.SetStateAction<string>>;
};

export function DarkMode({ handleToggleMode }: Props) {
  const { setTheme, resolvedTheme } = useTheme();

  React.useEffect(() => {
    const currentTheme = resolvedTheme ?? "light";
    handleToggleMode(currentTheme);
    const htmlElement = document.documentElement;
    htmlElement.className = currentTheme;
  }, [resolvedTheme, handleToggleMode]);

  const toggleDarkMode = (newTheme: string) => {
    const htmlElement = document.documentElement;
    htmlElement.className = newTheme;
    handleToggleMode(newTheme);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <SunIcon className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => {
            setTheme("light");
            toggleDarkMode("light");
          }}
        >
          Light
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setTheme("dark");
            toggleDarkMode("dark");
          }}
        >
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setTheme("system");
          }}
        >
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
