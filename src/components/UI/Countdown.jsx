import React from "react";
import { useState } from "react";
import { useEffect } from "react";

function Countdown({ date }) {
  const [hours, setHours] = useState();
  const [minutes, setMinutes] = useState();
  const [seconds, setSeconds] = useState();

  useEffect(() => {
    updateTimer()
    let intervalId = setInterval(() => updateTimer(), 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  function updateTimer() {
    let countdown = (date - Date.now()) / 1000

    let hours = Math.floor(countdown / 3600)
    setHours(hours)

    let minutes = Math.floor(countdown / 60) % 60
    setMinutes(minutes)

    let seconds = Math.floor(countdown % 60)
    setSeconds(seconds)
  }

  return <div className="de_countdown">{hours}h {minutes}m {seconds}s</div>;
}

export default Countdown;
