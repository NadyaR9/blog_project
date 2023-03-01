import { userEvent } from '@storybook/testing-library';
import { screen } from '@testing-library/react';
import { componentRender } from 'shared/config/tests';
import { Counter } from './Counter';

describe('test Sidebar', () => {
  test('test Sidebar render', () => {
    componentRender(
      <Counter />,
      { initialState: { counter: { value: 10 } } },
    );
    expect(screen.getByTestId('value-title')).toHaveTextContent('10');
  });
  test('decrement', () => {
    componentRender(
      <Counter />,
      { initialState: { counter: { value: 10 } } },
    );
    userEvent.click(screen.getByTestId('decrement-btn'));
    expect(screen.getByTestId('value-title')).toHaveTextContent('9');
  });
  test('increment', () => {
    componentRender(
      <Counter />,
      { initialState: { counter: { value: 10 } } },
    );
    userEvent.click(screen.getByTestId('increment-btn'));
    expect(screen.getByTestId('value-title')).toHaveTextContent('11');
  });
});
