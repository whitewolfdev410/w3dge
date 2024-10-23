import React, { useState, useEffect } from "react";
import "./LoadingScreen.css"; // Import the CSS as a separate file

const LoadingScreen = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const loadingPhrases = [
    "Establishing secure connection...",
    "Connecting to database...",
    "Validating integrity...",
    "Preparing display data...",
  ];

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (loading) {
      intervalId = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + 25;
          if (newProgress >= 100) {
            clearInterval(intervalId);
            setLoading(false);
          }
          return newProgress;
        });
      }, 1500);
    }

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [loading]);

  return (
    <div className={`wdt-loading-screen ${loading ? "" : "hidden"}`}>
      <div className="wdt-loading-phrases">
        <div className="wdt-loading-phrase-category" data-category="default">
          {loadingPhrases.map((phrase, index) => (
            <div
              key={index}
              className={`wdt-loading-phrase ${
                progress >= (index + 1) * 25 ? "wdt-checked" : ""
              }`}
            >
              {phrase}
            </div>
          ))}
        </div>
      </div>
      <div className="wdt-loading-bar-wrap">
        <div className="wdt-loading-bar">
          <div className="progress" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
