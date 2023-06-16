import "./styles.css";
import Balls from "./components/Balls";
import Timers from "./components/Timers2";
import { useState } from "react";
export default function App() {
  const [timers, setTimers] = useState([]);
  return (
    <div>
      <Timers getTimers={setTimers} />
      <Balls times={timers} />
    </div>
  );
}
