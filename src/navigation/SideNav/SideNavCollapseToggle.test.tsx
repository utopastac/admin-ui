import { render, screen, fireEvent } from '@testing-library/react';
import SideNavCollapseToggle from './SideNavCollapseToggle';

describe('SideNavCollapseToggle', () => {
  it('renders with "Collapse sidebar" label when expanded', () => {
    render(<SideNavCollapseToggle collapsed={false} onToggle={() => {}} />);
    expect(screen.getByRole('button', { name: 'Collapse sidebar' })).toBeTruthy();
  });

  it('renders with "Expand sidebar" label when collapsed', () => {
    render(<SideNavCollapseToggle collapsed={true} onToggle={() => {}} />);
    expect(screen.getByRole('button', { name: 'Expand sidebar' })).toBeTruthy();
  });

  it('calls onToggle when clicked', () => {
    const onToggle = vi.fn();
    render(<SideNavCollapseToggle collapsed={false} onToggle={onToggle} />);
    fireEvent.click(screen.getByRole('button'));
    expect(onToggle).toHaveBeenCalled();
  });
});
