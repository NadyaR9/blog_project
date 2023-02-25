import { fireEvent, screen } from '@testing-library/react';
import { componentRender } from 'shared/config/tests';
import { Sidebar } from './Sidebar';

describe('test Sidebar', () => {
  test('test Sidebar render', () => {
    componentRender(<Sidebar />);
    expect(screen.getByTestId('sidebar'));
  });
  test('test Sidebar collapsed render', () => {
    componentRender(<Sidebar />);
    const toggleButton = screen.getByTestId('sidebar-toggle');
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    fireEvent.click(toggleButton);
    expect(screen.getByTestId('sidebar')).toHaveClass('collapsed');
  });
});
