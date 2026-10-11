import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import HomePage from './HomePage';

describe('HomePage', () => {
  it('introduces the library and its advanced sections', () => {
    render(<HomePage />);

    expect(screen.getByRole('heading', { level: 1, name: 'Build admin tools with one stylesheet' })).toBeInTheDocument();
    expect(screen.getByText(/authored in react with opinionated defaults/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Advanced components' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Themes that compose' })).toBeInTheDocument();
  });

  it('updates the theme preview when a palette is selected', async () => {
    const user = userEvent.setup();
    render(<HomePage />);

    const preview = screen.getByRole('region', { name: 'Theme preview' });
    expect(preview).toHaveAttribute('data-admin-theme', 'ocean');

    await user.click(screen.getByRole('button', { name: 'Voltage' }));
    expect(preview).toHaveAttribute('data-admin-theme', 'voltage');
  });
});
