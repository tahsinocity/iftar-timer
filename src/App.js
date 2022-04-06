import "./App.css";
import React, { useState, useEffect } from "react";

import { getTimings } from "./utils/apiMaster";
import { getTodaysDate } from "./utils/apiUtils";

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
      await setIftarTime(
        new Date(
          timings.prayerTimes.date.gregorian.date.replace(/-/g, "/") +
            " " +
            timings.prayerTimes.timings.Sunset
        ).toUTCString()
      );
    };

    fetchTimings();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading("Please ensure you have enabled location on your device.");
    }, 2000);
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
            <h2>
              {allPrayerData.location.currentLocation?.city ||
                allPrayerData.location.currentLocation?.state ||
                allPrayerData.location.currentLocation?.country}
            </h2>
            <h1>{getTodaysDate(allPrayerData.prayerTimes.date.readable)}</h1>
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
          <div className="prayerTime">
            <h2>{loading}</h2>
          </div>
        </div>
      )}
      <h2>Made with ❤️ by tahsinocity</h2>
    </div>
  );
}
export default App;
