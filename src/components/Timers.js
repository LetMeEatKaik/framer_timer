import React, { useRef, useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { FaPlay, FaPlus, FaStop, FaTrashAlt } from "react-icons/fa";

export default function App({ getTimers }) {
  const [timers, setTimers] = useState([
    { time: 1, start: false, status: "stopped", color: getRandomColor() }
  ]);
  const [isRunning, setIsRunning] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);
  const [editedTime, setEditedTime] = useState("");
  console.log(timers);
  useMemo(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        setTimers((prevTimers) => {
          return prevTimers.map((timer) => {
            if (timer.start && timer.time > 0) {
              return {
                ...timer,
                time: timer.time - 1
              };
            }
            return timer;
          });
        });
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isRunning]);

  useEffect(() => {
    getTimers(timers);
  }, [timers]);

  const handleCountdownClick = (index) => {
    setEditIndex(index);
    setEditedTime(timers[index].time.toString());
  };

  const handleInputChange = (event) => {
    setEditedTime(event.target.value);
  };

  const handleInputBlur = () => {
    if (editIndex !== -1) {
      const updatedTimers = [...timers];
      updatedTimers[editIndex].time = parseFloat(editedTime) || 0;
      setTimers(updatedTimers);
      setEditIndex(-1);
      setEditedTime("");
    }
  };
  const handleStartButtonClick = (index) => {
    setTimers((prevTimers) => {
      const updatedTimers = [...prevTimers];
      const timer = updatedTimers[index];

      if (timer.start) {
        timer.time = timer.remainingTime; // Update the time with the remaining time
        timer.start = false;
        timer.status = "paused";
        setIsRunning(false);
      } else {
        timer.start = true;
        timer.remainingTime = timer.time; // Store the starting time
        timer.status = "started";
        setIsRunning(true); // Set isRunning to true only when starting a timer
      }

      return updatedTimers;
    });
  };

  const handlePlusButtonClick = () => {
    setTimers((prevTimers) => [
      ...prevTimers,
      { time: 1, start: false, status: "stopped", color: getRandomColor() }
    ]);
  };

  const handleRemoveButtonClick = (index) => {
    setTimers((prevTimers) => {
      const updatedTimers = [...prevTimers];
      updatedTimers.splice(index, 1);
      return updatedTimers;
    });
  };
  return (
    <div>
      {timers.map((timer, index) => (
        <div key={index}>
          <div>
            {editIndex === index ? (
              <input
                type="number"
                step="0.1"
                value={editedTime}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                autoFocus
              />
            ) : (
              <motion.div
                className="countdown"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                onClick={() => handleCountdownClick(index)}
              >
                {formatTime(timer.time)}
              </motion.div>
            )}
          </div>
          <div>
            <button
              className="start-button"
              onClick={() => handleStartButtonClick(index)}
              style={{
                backgroundColor: timer.color
              }}
            >
              {timer.start ? <FaStop /> : <FaPlay />}
            </button>
            <button
              className="remove-button"
              onClick={() => handleRemoveButtonClick(index)}
              style={{
                backgroundColor: timer.color
              }}
            >
              <FaTrashAlt />
            </button>
            <div>Status: {timer.status}</div>
          </div>
        </div>
      ))}
      <button className="plus-button" onClick={handlePlusButtonClick}>
        <FaPlus />
      </button>
    </div>
  );
}

function formatTime(timeInSeconds) {
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);
  const seconds = timeInSeconds % 60;

  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
