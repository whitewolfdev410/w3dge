import React, { useEffect } from "react";
import "./LoadingScreen.css";
interface LoadingScreenOptions {
  speed?: number;
}

const LoadingScreen: React.FC = () => {
  const start = (options: LoadingScreenOptions = {}) => {
    const speedFactor = options.speed || 500;
    const totalDuration = speedFactor * 20;

    const screen = document.querySelector(".wdt-loading-screen") as HTMLElement;
    const category = document.querySelector(
      ".wdt-loading-phrase-category"
    ) as HTMLElement;
    const progress = document.querySelector(".progress") as HTMLElement;

    const phraseHeight = 30;
    let currentPosition = 0;

    if (screen) {
      screen.style.display = "block";
    }

    // Progress bar animation
    if (progress) {
      progress.style.width = "0";
      setTimeout(() => {
        progress.style.transition = `width ${totalDuration}ms linear`;
        progress.style.width = "100%";
      }, 50);
    }

    // Mark the first phrase
    const firstPhrase = document.querySelectorAll(
      ".wdt-loading-phrase"
    )[0] as HTMLElement;
    firstPhrase?.classList.add("wdt-checked");

    // Phrase animation
    const animatePhrase = () => {
      const nextPhraseIndex = Math.abs(currentPosition / phraseHeight) + 1;
      const nextPhrase = document.querySelectorAll(".wdt-loading-phrase")[
        nextPhraseIndex
      ] as HTMLElement;

      if (nextPhrase) {
        nextPhrase.classList.add("wdt-checked");
      }

      setTimeout(() => {
        currentPosition -= phraseHeight;
        if (category) {
          category.style.transform = `translateY(${currentPosition}px)`;
        }
      }, 100);
    };

    // Timing for phrases
    const phraseInterval = totalDuration / 7;
    const interval = setInterval(() => {
      if (Math.abs(currentPosition) >= phraseHeight * 6) {
        clearInterval(interval);
      }
      animatePhrase();
    }, phraseInterval);
  };

  const done = () => {
    const screen = document.querySelector(".wdt-loading-screen") as HTMLElement;
    const progress = document.querySelector(".progress") as HTMLElement;
    const category = document.querySelector(
      ".wdt-loading-phrase-category"
    ) as HTMLElement;

    setTimeout(() => {
      if (screen) {
        screen.style.display = "none";
      }
      if (progress) {
        progress.style.transition = "none";
        progress.style.width = "0";
      }
      if (category) {
        category.style.transform = "translateY(0)";
      }
      document.querySelectorAll(".wdt-loading-phrase").forEach((phrase) => {
        (phrase as HTMLElement).classList.remove("wdt-checked");
      });
    }, 500);
  };

  useEffect(() => {
    start({ speed: 500 });

    const timeoutId = setTimeout(() => {
      done();
    }, 500 * 20 + 500);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="wdt-loading-screen">
      <div className="wdt-loading-phrases">
        <div className="wdt-loading-phrase-category" data-category="default">
          <div className="wdt-loading-phrase">
            Establishing secure node connection...
          </div>
          <div className="wdt-loading-phrase">
            Loading network performance metrics...
          </div>
          <div className="wdt-loading-phrase">
            Calculating current earnings...
          </div>
          <div className="wdt-loading-phrase">
            Analyzing bandwidth utilization...
          </div>
          <div className="wdt-loading-phrase">
            Updating reward statistics...
          </div>
          <div className="wdt-loading-phrase">
            Syncing peer network status...
          </div>
          <div className="wdt-loading-phrase">
            Finalizing performance dashboard...
          </div>
        </div>
      </div>
      <div className="wdt-loading-bar-wrap">
        <div className="wdt-loading-bar">
          <div className="progress"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
