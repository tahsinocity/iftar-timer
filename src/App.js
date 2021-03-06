import "./App.css";
import React, { useState, useEffect } from "react";

import { getTimings } from "./utils/apiMaster";

import Timer from "./components/Timer";
import Iframe from "./components/Iframe";
import PrayerTimesTable from "./components/PrayerTimesTable";

function App() {
  const [allPrayerData, setAllPrayerData] = useState(null);
  const [iftarTime, setIftarTime] = useState(null);
  const [loading, setLoading] = useState("Loading...");

  useEffect(() => {
    const fetchTimings = async () => {
      const timings = await getTimings();
      await setAllPrayerData(timings);
      await setIftarTime({
        date: timings.prayerTimes.date.gregorian.date.replace(/-/g, "/"),
        time: timings.prayerTimes.timings.Sunset,
      });
    };

    fetchTimings();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading("Please ensure you have enabled location on your device.");
    }, 3000);
    return () => clearTimeout(timer);
  });

  return (
    <div className="App">
      {allPrayerData && iftarTime ? (
        <>
          <header className="App-header">
            <Iframe
              title="ramadan"
              src="https://giphy.com/embed/nKA4aQgYPQKHbRA10y"
            />
          </header>
          <div className="prayerTime">
            <h1>
              {new Date().toLocaleDateString(undefined, {
                weekday: "short",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </h1>
            <h2>
              📍{" "}
              {allPrayerData.location.currentLocation?.city ||
                allPrayerData.location.currentLocation?.state ||
                allPrayerData.location.currentLocation?.country}
            </h2>
          </div>
          <div>
            <Timer eventTime={iftarTime} />
          </div>
          {allPrayerData ? (
            <div>
              <PrayerTimesTable prayerTimes={allPrayerData.prayerTimes} />
            </div>
          ) : (
            <Iframe
              title="loading times"
              src="https://giphy.com/embed/559nyYPxdHpJDlex5V"
            />
          )}
        </>
      ) : (
        <div className="loading">
          <Iframe
            title="loading"
            src="https://giphy.com/embed/n1KAZ8ydmwlskkvQEJ"
          />
          <div>
            <h2>{loading}</h2>
          </div>
        </div>
      )}
      <div className="footer">
        <h2>
          Made by{" "}
          <a
            href="https://github.com/tahsinocity/iftar-timer"
            target="_blank"
            rel="noopener noreferrer"
          >
            @tahsinocity
          </a>{" "}
        </h2>
      </div>
    </div>
  );
}
export default App;
