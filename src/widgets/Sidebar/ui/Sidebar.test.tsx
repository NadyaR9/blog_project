import { fireEvent, screen } from '@testing-library/react';
import { renderWithTranslation } from 'shared/config/lib/tests/renderWithTranslation/renderWithTranslation';
import { Sidebar } from './Sidebar';

describe('test Sidebar', () => {
  test('test Sidebar render', () => {
    renderWithTranslation(<Sidebar />);
    expect(screen.getByTestId('sidebar'));
  });
  test('test Sidebar collapsed render', () => {
    renderWithTranslation(<Sidebar />);
    const toggleButton = screen.getByTestId('sidebar-toggle');
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    fireEvent.click(toggleButton);
    expect(screen.getByTestId('sidebar')).toHaveClass('collapsed');
  });
});
