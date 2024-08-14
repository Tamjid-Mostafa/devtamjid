"use client"
import { useEffect, useCallback } from 'react';

const useScrollToNextSection = (scrollPosition: number) => {
  const handleScrollToNextSection = useCallback(() => {
    // Get the current scroll position to determine the next section
    const scrollY = window.scrollY;

    // Determine if the current scroll position is less than the specified scroll position
    if (scrollY < scrollPosition) {
      // Scroll to the next section
      window.scrollTo({
        top: scrollPosition,
        behavior: 'smooth',
      });
    }
  }, [scrollPosition]);

  return handleScrollToNextSection; // Return the function to be used by the component
};

export default useScrollToNextSection;
