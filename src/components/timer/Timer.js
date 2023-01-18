import React, { useEffect, useState } from "react";
import "./timer.css";

function Timer() {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const deadline = "March, 5, 2023";

  const getTime = () => {
    const time = Date.parse(deadline) - Date.now();

    setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
    setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
    setMinutes(Math.floor((time / 1000 / 60) % 60));
    setSeconds(Math.floor((time / 1000) % 60));
  };

  useEffect(() => {
    const interval = setInterval(() => getTime(deadline), 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="timer">
      <div className="spec">
        <div className="box">
          <p id="day">{days < 10 ? "0" + days : days}</p>
          <section className="text">Days</section>
        </div>
      </div>
      <div className="spec">
        <div className="box">
          <p id="hour">{hours < 10 ? "0" + hours : hours}</p>
          <section className="text">Hours</section>
        </div>
      </div>
      <div className="spec">
        <div className="box">
          <p id="minute">{minutes < 10 ? "0" + minutes : minutes}</p>
          <section className="text">Minutes</section>
        </div>
      </div>
      <div className="spec">
        <div className="box">
          <p id="second">{seconds < 10 ? "0" + seconds : seconds}</p>
          <section className="text">Seconds</section>
        </div>
      </div>
    </div>
  );
}

export default Timer;