import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CountdownTimer = () => {
  const [time, setTime] = useState(10);
  const [isRunning, setIsRunning] = useState(false);
  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning && time > 0) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    }
    return () => {
      clearInterval(timer);
    };
  }, [isRunning, time]);

  const handleStartPause = () => {
    if (time > 0) {
      setIsRunning((prevState) => !prevState);
      setIsEditable(false);
    }
  };

  const handleDoubleClick = () => {
    setIsEditable(true);
    setIsRunning(false);
  };

  const handleInputChange = (e) => {
    setTime(Number(e.target.value));
  };

  const handleInputBlur = () => {
    setIsEditable(false);
  };

  const formatTime = () => {
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const timerStyle = {
    fontSize: "72px",
    fontFamily: "monospace"
  };

  const inputStyle = {
    fontSize: "72px",
    fontFamily: "monospace",
    textAlign: "center",
    width: "200px",
    margin: "0 auto"
  };

  const pulseVariants = {
    initial: { scale: 1 },
    pulsing: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2, // Set duration to 2 seconds
        repeat: Infinity,
        repeatType: "reverse" // Reverse the animation on repeat
      }
    }
  };

  return (
    <div id="root">
      <div
        style={{ textAlign: "center", marginTop: "auto", marginBottom: "auto" }}
      >
        <p>Double click countdown to edit amount of seconds </p>
        {isEditable ? (
          <input
            type="number"
            min="0"
            value={time}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            style={inputStyle}
          />
        ) : (
          <div style={timerStyle} onDoubleClick={handleDoubleClick}>
            {formatTime()}
          </div>
        )}
        <button
          style={{
            fontSize: "24px",
            padding: "10px 20px",
            marginTop: "20px",
            fontFamily: "monospace"
          }}
          onClick={handleStartPause}
        >
          {isRunning ? "Pause" : "Start"}
        </button>

        <AnimatePresence>
          {!isEditable && isRunning && time > 0 && (
            <motion.div
              className="box"
              initial={{ scale: 1 }}
              animate="pulsing"
              variants={pulseVariants}
              exit={{ scale: 0 }}
              style={{ margin: "20px auto" }}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CountdownTimer;
