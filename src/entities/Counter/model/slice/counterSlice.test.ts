import { CounterSchema } from '../types/CounterSchema';
import { counterActions, counterReducer } from './counterSlice';

const { decrement, increment } = counterActions;

describe('counterSlice.test', () => {
  const state: CounterSchema = { value: 10 };
  test('decrement', () => {
    expect(
      counterReducer(state, decrement()),
    ).toEqual({ value: 9 });
  });
  test('increment', () => {
    expect(
      counterReducer(state, increment()),
    ).toEqual({ value: 11 });
  });

  test('should work with empry state', () => {
    expect(
      counterReducer(undefined, increment()),
    ).toEqual({ value: 1 });
  });
});
