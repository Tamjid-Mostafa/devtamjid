"use client";
import React, { useEffect } from "react";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import s from "./MouseScrollIcon.module.css";
import {
  fadeIn,
  scrollVariants,
  staggerContainer
} from "@/lib/useAnimation";
import useScrollToNextSection from "@/lib/hooks/useScrollToNextSection";
import { cn } from "@/lib/utils";

const MouseScrollIcon = () => {
  const [isVisible, setIsVisible] = React.useState("hidden");
  React.useEffect(() => {
    const handleScrollAnimation = () => {
      // Show/hide the scroll icon based on the scroll position or any other conditions
      // For example, you can check if the user has scrolled to a certain section and hide the icon
      const scrollY = window.scrollY;
      if (scrollY > 580) {
        setIsVisible("hidden");
      } else {
        setIsVisible("visible");
      }
    };

    // Start the animation immediately when the component mounts
    handleScrollAnimation();

    // Add the scroll event listener
    window.addEventListener("scroll", handleScrollAnimation);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScrollAnimation);
    };
  }, []);
  const scrollToNextSection = useScrollToNextSection(800);
  const handleScrollToNextSection = () => {
    scrollToNextSection();
  };
  return (
    <AnimatePresence mode="wait">
      {isVisible === "visible" && (
        <motion.div
          initial="hidden"
          whileInView="show"
          exit="exit"
          variants={fadeIn("down", "spring", 0.2, 2)}
          viewport={{ once: false, amount: 0.25 }}
          className={cn(s.mouse_scroll_icon)}
          onClick={handleScrollToNextSection}>
          <div className={s.mouse}>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={scrollVariants}
              className={s.wheel}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MouseScrollIcon;
