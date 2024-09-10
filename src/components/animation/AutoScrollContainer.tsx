import React, { useEffect, useRef } from "react";

const AutoScrollContainer: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container: any = containerRef.current;

    const scroll = () => {
      if (container) {
        container.scrollTop += 1; // Scroll down by 1px
        if (
          container.scrollTop >=
          container.scrollHeight - container.clientHeight
        ) {
          container.scrollTo({
            top: 0,
            behavior: "smooth",
          }); // Reset to top if reached the bottom
        }
      }
    };

    const interval = setInterval(scroll, 30); // Adjust the interval as needed

    return () => clearInterval(interval); // Clean up the interval on unmount
  }, []);

  return (
    <div
      className="scroll-container max-h-80 overflow-y-auto mt-4 mb-16"
      ref={containerRef}
    >
      <div className="scroll-content">{children}</div>
    </div>
  );
};

export default AutoScrollContainer;
