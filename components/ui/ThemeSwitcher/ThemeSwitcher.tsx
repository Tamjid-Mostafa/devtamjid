"use client";
import { useState } from "react";
import { ChevronRight, Cross } from "@/components/icons";
import { useToggleTheme } from "@/lib/hooks/useToggleTheme";
import { cn } from "@/lib/utils";
import ClickOutside from "@/lib/click-outside";
import ThemeIcon from "./ThemeIcon";

const ThemeSwitcher = () => {
  const [display, setDisplay] = useState(false);
  const { theme, themes, setTheme } = useToggleTheme();

  return (
    <ClickOutside active={display} onClick={() => setDisplay(false)}>
      <div className="relative">
        <div
          className="relative flex items-center"
          onClick={() => setDisplay(!display)}>
          <button
            className={
              "border-accent-2 hover:border-accent-3 flex h-10 w-[125px] items-center justify-between rounded-md border pl-2 pr-1 transition-colors ease-linear hover:shadow-sm"
            }
            aria-label="Theme Switcher">
            <span className="flex flex-shrink items-center">
              <ThemeIcon width={20} height={20} theme={theme} />
              <span className={cn("ml-2 capitalize leading-none")}>
                {theme}
              </span>
            </span>
            <span className="cursor-pointer">
              <ChevronRight
                className={cn("transition duration-300", {
                  ["rotate-90"]: display
                })}
              />
            </span>
          </button>
        </div>
        <div className="absolute right-0 top-0">
          {themes.length && display ? (
            <div
              className={
                "bg-accent-0 lg:border-accent-1 fixed right-0 top-12 z-40 mt-2 h-full w-full origin-top-right shadow-lg outline-none lg:absolute lg:h-auto lg:w-56 lg:border lg:shadow-lg"
              }>
              <div className="flex flex-row justify-end px-6">
                <button
                  className="md:hidden"
                  onClick={() => setDisplay(false)}
                  aria-label="Close panel">
                  <Cross className="h-6 w-6" />
                </button>
              </div>
              <ul>
                {themes.map((t: string) => (
                  <li key={t}>
                    <button
                      className="text-primary hover:bg-accent-1 flex w-full cursor-pointer items-center px-6 py-3 font-medium capitalize leading-6 transition duration-150 ease-in-out"
                      role={"link"}
                      onClick={() => {
                        setTheme(t);
                        setDisplay(false);
                      }}>
                      {t}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    </ClickOutside>
  );
};

export default ThemeSwitcher;
