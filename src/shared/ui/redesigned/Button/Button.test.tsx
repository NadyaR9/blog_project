import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('test Button', () => {
  test('test button render', () => {
    render(<Button>Test</Button>);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });
  test('test background button render', () => {
    render(<Button variants='outline'>Test</Button>);
    expect(screen.getByText('Test')).toHaveClass('outline');
    screen.debug();
  });
});
