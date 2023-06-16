import { useRef, useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CircleStack({ times }) {
  const stackRef = useRef(null);
  const [distanceToRight, setDistanceToRight] = useState(0);
  const [timeValues, setTimeValues] = useState([]);

  console.log("timeValues", times, timeValues);
  useEffect(() => {
    const calculateDistance = () => {
      const pageWidth = window.innerWidth;
      const midpoint = pageWidth / 2;
      const distanceToRight = pageWidth - midpoint;
      setDistanceToRight(distanceToRight);
    };

    calculateDistance();

    // Recalculate the distance on window resize
    window.addEventListener("resize", calculateDistance);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", calculateDistance);
    };
  }, [times]);

  useEffect(() => {
    const circles = stackRef.current.childNodes;
    const stackHeight = circles.length * 50; // Height of each circle + margin

    // Set the initial position of each circle in the stack
    circles.forEach((circle, index) => {
      circle.style.transform = `translateY(${index * 50}px)`;
    });

    setTimeValues(times.map((item, index) => item.time));
    // Initialize the timeValues array with the initial item.time values
    // setTimeValues(times.map((item) => item.time));
  }, [times]);

  return (
    <div className="circle-stack" ref={stackRef}>
      <AnimatePresence>
        {times.map((item, index) => {
          const { start } = item;
          const duration = start ? timeValues[index] : 0;

          return (
            <motion.div
              key={index}
              className="box"
              style={{ backgroundColor: item.color }}
              initial={{ y: index * 50 }}
              animate={{
                x: start ? distanceToRight : 0,
                transition: {
                  type: "spring",
                  stiffness: 100,
                  duration,
                  ease: "linear"
                }
              }}
              exit={{ opacity: 0 }}
            />
          );
        })}
      </AnimatePresence>
    </div>
  );
}
