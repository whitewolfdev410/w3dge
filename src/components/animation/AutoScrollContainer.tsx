import React, { useEffect, useRef } from "react";

const AutoScrollContainer: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  let isResetting = false; // A flag to indicate if we're resetting the scroll

  useEffect(() => {
    const container: HTMLDivElement | null = containerRef.current;

    const scroll = () => {
      if (container && !isResetting) {
        container.scrollTop += 1; // Scroll down by 1px

        // If it reaches the bottom, reset to top smoothly
        if (
          container.scrollTop >=
          container.scrollHeight - container.clientHeight
        ) {
          isResetting = true; // Pause normal scrolling during the reset

          // Smooth scroll back to the top
          container.scrollTo({
            top: 0,
            behavior: "smooth", // Smooth scrolling effect
          });

          // Estimate the time for the smooth scroll to finish, based on the content height
          const smoothScrollDuration = 2000; // Adjust for a longer smoother transition

          // Wait for the smooth scroll to complete before resuming the scroll loop
          setTimeout(() => {
            isResetting = false; // Resume normal scrolling after reset
          }, smoothScrollDuration); // Adjust the timing for a smoother reset
        }
      }
    };

    const interval = setInterval(scroll, 45); // Adjust the interval for scroll speed

    return () => clearInterval(interval); // Clean up interval on unmount
  }, []);

  return (
    <div
      className="scroll-container max-h-80 overflow-y-auto mt-4 mb-16"
      ref={containerRef}
      style={{
        scrollbarWidth: "none", // Hide scrollbar for Firefox
        msOverflowStyle: "none", // Hide scrollbar for IE/Edge
        overflow: "hidden", // Hide scrollbar for other browsers
      }}
    >
      <div className="scroll-content">{children}</div>
    </div>
  );
};

export default AutoScrollContainer;
