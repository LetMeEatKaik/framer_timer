// import "./styles.css";
// import { useRef, useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { FaPlay, FaPlus } from "react-icons/fa";
// import { useFollowPointer } from "./use-follow-pointer";

// export default function App() {
//   const ref = useRef(null);
//   const [time, setTime] = useState(1); // User-inputted time in minutes
//   const [countdown, setCountdown] = useState(0); // Countdown value in seconds
//   const [isRunning, setIsRunning] = useState(false); // Flag to track if the countdown is running

//   // const { x, y } = useFollowPointer(ref);
//   const { x, y } = [10, 5];

//   const totalDistance = 500; // Total distance to move
//   const speed = totalDistance / (time * 60); // Speed based on user-inputted time in minutes

//   useEffect(() => {
//     // Update the countdown value when the time changes
//     setCountdown(time * 60);
//   }, [time]);

//   useEffect(() => {
//     let timerId;

//     // Start the countdown when the isRunning flag is true
//     if (isRunning) {
//       timerId = setInterval(() => {
//         setCountdown((prevCountdown) => prevCountdown - 1);
//       }, 1000);
//     }

//     // Stop the countdown when the countdown reaches 0
//     if (countdown === 0) {
//       setIsRunning(false);
//       clearInterval(timerId);
//     }

//     // Clean up the timer on component unmount
//     return () => {
//       clearInterval(timerId);
//     };
//   }, [countdown, isRunning]);

//   const handleTimeChange = (event) => {
//     setTime(parseFloat(event.target.value));
//   };

//   const handleStartButtonClick = () => {
//     setIsRunning(true);
//   };

//   const handlePlusButtonClick = () => {
//     setTime((prevTime) => prevTime + 1);
//   };

//   const formatTime = (timeInSeconds) => {
//     const hours = Math.floor(timeInSeconds / 3600);
//     const minutes = Math.floor((timeInSeconds % 3600) / 60);
//     const seconds = timeInSeconds % 60;

//     return `${hours.toString().padStart(2, "0")}:${minutes
//       .toString()
//       .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
//   };

//   return (
//     <div>
//       <div>
//         <input
//           type="number"
//           step="0.1"
//           value={time}
//           onChange={handleTimeChange}
//         />
//         <motion.div
//           className="countdown"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.5 }}
//         >
//           {formatTime(countdown)}
//         </motion.div>
//       </div>
//       <div>
//         <button className="start-button" onClick={handleStartButtonClick}>
//           <FaPlay />
//         </button>
//         <button className="plus-button" onClick={handlePlusButtonClick}>
//           <FaPlus />
//         </button>
//       </div>
//       <motion.div
//         ref={ref}
//         className="box"
//         initial={{ x: 0 }}
//         animate={{ x: totalDistance }}
//         transition={{
//           type: "tween",
//           duration: time * 60, // Convert time to seconds
//           ease: "linear"
//         }}
//         onAnimationComplete={() => {
//           ref.current.style.display = "none"; // Hide the component when animation is complete
//         }}
//       />
//     </div>
//   );
// }

import "./styles.css";
import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaPlay, FaPlus, FaStop } from "react-icons/fa";
import { useFollowPointer } from "./use-follow-pointer";

export default function App() {
  const ref = useRef(null);
  const [time, setTime] = useState(1); // User-inputted time in minutes
  const [countdown, setCountdown] = useState(0); // Countdown value in seconds
  const [isRunning, setIsRunning] = useState(false); // Flag to track if the countdown and motion.div animation are running

  // const { x, y } = useFollowPointer(ref);
  const { x, y } = [10, 5];

  const totalDistance = 500; // Total distance to move
  const speed = totalDistance / (time * 60); // Speed based on user-inputted time in minutes

  useEffect(() => {
    // Update the countdown value when the time changes
    setCountdown(time * 60);
  }, [time]);

  useEffect(() => {
    let timerId;

    // Start the countdown when the isRunning flag is true
    if (isRunning && countdown > 0) {
      timerId = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    }

    // Clean up the timer on component unmount and when isRunning flag is false
    return () => {
      clearInterval(timerId);
    };
  }, [countdown, isRunning]);

  const handleTimeChange = (event) => {
    setTime(parseFloat(event.target.value));
  };

  const handleStartButtonClick = () => {
    setIsRunning((prevIsRunning) => !prevIsRunning);
  };

  const handlePlusButtonClick = () => {
    setTime((prevTime) => prevTime + 1);
  };

  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div>
      <div>
        <input
          type="number"
          step="0.1"
          value={time}
          onChange={handleTimeChange}
        />
        <motion.div
          className="countdown"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {formatTime(countdown)}
        </motion.div>
      </div>
      <div>
        <button className="start-button" onClick={handleStartButtonClick}>
          {isRunning ? <FaStop /> : <FaPlay />}
        </button>
        <button className="plus-button" onClick={handlePlusButtonClick}>
          <FaPlus />
        </button>
      </div>
      <motion.div
        ref={ref}
        className="box"
        initial={{ x: 0 }}
        animate={{
          x: isRunning ? totalDistance : 0,
          transitionEnd: { x: totalDistance } // Ensure the motion.div reaches the end of the screen
        }}
        transition={{
          type: "tween",
          duration: time * 60, // Convert time to seconds
          ease: "linear"
        }}
        onAnimationComplete={() => {
          ref.current.style.display = "none"; // Hide the component when animation is complete
        }}
      />
    </div>
  );
}
