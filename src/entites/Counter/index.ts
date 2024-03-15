import { Counter } from './ui/Counter';
import { counterReducer } from './model/slice/counterSlice';

export type { CounterSchema } from './model/types/CounterSchema';

export {
  Counter,
  counterReducer,
};
