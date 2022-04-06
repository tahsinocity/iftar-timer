import React from "react";

const { useEffect, useState } = React;

function Timer({ eventTime }) {
  const [currentTime, setCurrentTime] = useState(new Date().getTime());

  const timeBetween = new Date(eventTime).getTime() - currentTime;

  // console.log({
  //   eventTime: new Date(eventTime).getTime(),
  //   currentTime,
  //   timeBetween,
  // });
  const seconds = Math.floor((timeBetween / 1000) % 60);
  const minutes = Math.floor((timeBetween / 1000 / 60) % 60);
  const hours = Math.floor((timeBetween / (1000 * 60 * 60)) % 24);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="timer">
      {timeBetween < 0 ? (
        <>
          <h2>Timer will start on the next fasting day</h2>
        </>
      ) : (
        <>
          <h2>Time remaining till Iftar:</h2>
          <h1>
            {hours} hrs {minutes < 10 ? `0${minutes}` : minutes} mins{" "}
            {seconds < 10 ? `0${seconds}` : seconds} secs
          </h1>
        </>
      )}
    </div>
  );
}

export default Timer;
