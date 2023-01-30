import { useState } from "react";
import classes from './Counter.module.scss';

export const Counter = () => {
  const [counter, setCounter] = useState<number>(0);
  const handleCounder = () => {
    setCounter(counter + 1);
  }
  return (
    <div className={classes.container}>
      <h3>{counter}</h3>
      <button
        onClick={handleCounder}
        className={classes.btn}
      >
        Add
      </button>
    </div>
  );
};
