"use client";
import { useEffect, useState } from "react";

interface WindowSize {
  width?: number;
  height?: number;
}

interface WindowSizeProps {
  windowSize: WindowSize;
  isMobile: boolean;
  isDesktop: boolean;
}

export default function useWindowSize(): WindowSizeProps {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: undefined,
    height: undefined
  });

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    }

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount

  return {
    windowSize,
    isMobile:
      typeof windowSize?.width === "number" &&
      windowSize?.width < 1024,
    isDesktop:
      typeof windowSize?.width === "number" &&
      windowSize?.width >= 1024
  };
}
