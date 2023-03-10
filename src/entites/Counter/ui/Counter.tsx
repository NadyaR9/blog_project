import { useDispatch, useSelector } from 'react-redux';
import { Button, ButtonVariants } from 'shared/ui';
import { getCounterValue } from '../model/selectors/getCounterValue/getCounterValue';
import { counterActions } from '../model/slice/counterSlice';

interface CounterProps {
  className?: string,
}

export const Counter = () => {
  const { increment, decrement } = counterActions;
  const dispatch = useDispatch();
  const counter = useSelector(getCounterValue);

  const handleIncrement = () => {
    dispatch(increment());
  };

  const handleDecrement = () => {
    dispatch(decrement());
  };

  return (
    <div>
      <h1
        data-testid="value-title"
      >
        {counter}
      </h1>
      <Button
        onClick={handleIncrement}
        variants={ButtonVariants.BACKGROUND_INVERTED}
        data-testid="increment-btn"
      >
        +
      </Button>
      <span> - </span>
      <Button
        onClick={handleDecrement}
        variants={ButtonVariants.BACKGROUND_INVERTED}
        data-testid="decrement-btn"
      >
        -
      </Button>
    </div>
  );
};
