import { render, screen } from '@testing-library/react';
import { Text } from './Text';

describe('test Text', () => {
  test('test title render', () => {
    render(<Text title="Test" />);
    expect(screen.getByText('Test')).toHaveClass('title');
  });
  test('test text render', () => {
    render(<Text text="Test" />);
    expect(screen.getByText('Test')).toHaveClass('text');
  });
});
