import { render, screen } from '@testing-library/react';
import { Text, TextVariants } from './Text';

describe('test Text', () => {
  test('test title render', () => {
    render(<Text title="Test" />);
    expect(screen.getByText('Test')).toHaveClass('title');
  });
  test('test text render', () => {
    render(<Text text="Test" />);
    expect(screen.getByText('Test')).toHaveClass('text');
  });
  test('test error text render', () => {
    render(<Text variants={TextVariants.ERROR} text="Test" />);
    expect(screen.getByText('Test')).toHaveClass('error');
  });
});
