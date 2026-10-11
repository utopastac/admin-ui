import { render, screen } from '@testing-library/react';
import TopNavActions from './TopNavActions';

describe('TopNavActions', () => {
  it('renders a single child', () => {
    render(
      <TopNavActions>
        <button>Profile</button>
      </TopNavActions>,
    );
    expect(screen.getByText('Profile')).toBeInTheDocument();
  });

  it('renders multiple children', () => {
    render(
      <TopNavActions>
        <button>Notifications</button>
        <button>Settings</button>
        <button>Profile</button>
      </TopNavActions>,
    );
    expect(screen.getByText('Notifications')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
    expect(screen.getByText('Profile')).toBeInTheDocument();
  });

  it('renders without crashing when passed an empty fragment', () => {
    const { container } = render(<TopNavActions>{<></>}</TopNavActions>);
    expect(container.firstElementChild).toBeInTheDocument();
  });

  it('accepts text node as a ReactNode child', () => {
    render(<TopNavActions>{'plain text'}</TopNavActions>);
    expect(screen.getByText('plain text')).toBeInTheDocument();
  });

  it('accepts a span element as a ReactNode child', () => {
    render(
      <TopNavActions>
        <span>icon</span>
      </TopNavActions>,
    );
    expect(screen.getByText('icon')).toBeInTheDocument();
  });

  it('renders a wrapping element that contains all children', () => {
    const { container } = render(
      <TopNavActions>
        <button>A</button>
        <button>B</button>
      </TopNavActions>,
    );
    const wrapper = container.firstElementChild;
    expect(wrapper).not.toBeNull();
    expect(wrapper?.querySelectorAll('button')).toHaveLength(2);
  });

  it('renders nested ReactNode structures', () => {
    render(
      <TopNavActions>
        <div>
          <span>Nested</span>
        </div>
      </TopNavActions>,
    );
    expect(screen.getByText('Nested')).toBeInTheDocument();
  });
});
