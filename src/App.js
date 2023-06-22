import React, { useState, useRef } from 'react';
// import './App.css';

function App() {
  const [time, setTime] = useState({ ms: 0, s: 0, m: 0, h: 0 });
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  const startTimer = () => {
    setIsRunning(true);
    intervalRef.current = setInterval(updateTimer, 10);
  };

  const updateTimer = () => {
    setTime((prevTime) => {
      let updatedMs = prevTime.ms + 10;
      let updatedS = prevTime.s;
      let updatedM = prevTime.m;
      let updatedH = prevTime.h;

      if (updatedMs >= 1000) {
        updatedS++;
        updatedMs = 0;
      }

      if (updatedS >= 60) {
        updatedM++;
        updatedS = 0;
      }

      if (updatedM >= 60) {
        updatedH++;
        updatedM = 0;
      }

      return { ms: updatedMs, s: updatedS, m: updatedM, h: updatedH };
    });
  };

  const stopTimer = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
  };

  const resetTimer = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
    setTime({ ms: 0, s: 0, m: 0, h: 0 });
  };

  const formatTime = (timeValue) => {
    return timeValue < 10 ? `0${timeValue}` : timeValue;
  };

  return (
    <div className="flex flex-col w-full h-screen bg-gradient-to-b  from-gray-500 to-black text-center pt-28">
      <h1 className='text-5xl text-white pb-4'>Stopwatch</h1>
      <div className="text-8xl text-white">
        <span>{formatTime(time.h)}:</span>
        <span>{formatTime(time.m)}:</span>
        <span>{formatTime(time.s)}:</span>
        <span>{formatTime(Math.floor(time.ms / 10))}</span>
      </div>
      <div className="buttons">
        {!isRunning ? (
          <button onClick={startTimer} className='p-4 m-4 bg-white text-black rounded-md'>Start</button>
        ) : (
          <button onClick={stopTimer} className='text-white bg-red-600 p-4 m-4 rounded-md'>Stop</button>
        )}
        <button onClick={resetTimer} className='bg-green-500 text-white p-4 mt-4 rounded-md'>Reset</button>
      </div>
    </div>
  );
}

export default App;
