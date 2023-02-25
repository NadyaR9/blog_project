import { render, screen } from '@testing-library/react';
import { Button, ButtonVariants } from './Button';

describe('test Button', () => {
  test('test button render', () => {
    render(<Button>Test</Button>);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });
  test('test default button render', () => {
    render(<Button variants={ButtonVariants.DEFAULT}>Test</Button>);
    expect(screen.getByText('Test')).toHaveClass('default');
    screen.debug();
  });
});
