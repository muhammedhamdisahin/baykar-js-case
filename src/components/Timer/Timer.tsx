import { SetStateAction, useEffect } from "react";
import styles from "./Timer.module.css";

const Timer = ({ time, setTime }: { time: number; setTime?: (value: SetStateAction<number>) => void }) => {
  useEffect(() => {
    const interval = setInterval(() => {
      setTime && setTime((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [setTime]);

  return <div className={styles.timer}>{time}</div>;
};

export default Timer;
