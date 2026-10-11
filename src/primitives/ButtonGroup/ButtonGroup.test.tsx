import { render, screen } from '@testing-library/react';
import ButtonGroup from './ButtonGroup';

describe('ButtonGroup', () => {
  it('renders children', () => {
    render(
      <ButtonGroup>
        <button>One</button>
        <button>Two</button>
      </ButtonGroup>
    );
    expect(screen.getByText('One')).toBeInTheDocument();
    expect(screen.getByText('Two')).toBeInTheDocument();
  });

  it('defaults to end alignment', () => {
    const { container } = render(
      <ButtonGroup>
        <button>Test</button>
      </ButtonGroup>
    );
    expect(container.firstChild).toHaveClass('end');
  });

  it('applies start alignment', () => {
    const { container } = render(
      <ButtonGroup align="start">
        <button>Test</button>
      </ButtonGroup>
    );
    expect(container.firstChild).toHaveClass('start');
  });

  it('applies center alignment', () => {
    const { container } = render(
      <ButtonGroup align="center">
        <button>Test</button>
      </ButtonGroup>
    );
    expect(container.firstChild).toHaveClass('center');
  });

  it('applies custom className', () => {
    const { container } = render(
      <ButtonGroup className="custom">
        <button>Test</button>
      </ButtonGroup>
    );
    expect(container.firstChild).toHaveClass('custom');
  });

  it('renders as a div element', () => {
    const { container } = render(
      <ButtonGroup>
        <button>Test</button>
      </ButtonGroup>
    );
    expect(container.firstChild?.nodeName).toBe('DIV');
  });

  it('has role="group"', () => {
    render(
      <ButtonGroup>
        <button>Test</button>
      </ButtonGroup>
    );
    expect(screen.getByRole('group')).toBeInTheDocument();
  });

  it('forwards aria-label to the group element', () => {
    render(
      <ButtonGroup aria-label="Text formatting">
        <button>Bold</button>
      </ButtonGroup>
    );
    expect(screen.getByRole('group', { name: 'Text formatting' })).toBeInTheDocument();
  });
});
