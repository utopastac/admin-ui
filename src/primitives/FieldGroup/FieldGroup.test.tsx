import { render, screen } from '@testing-library/react';
import FieldGroup from './FieldGroup';

describe('FieldGroup', () => {
  it('renders children', () => {
    render(
      <FieldGroup>
        <input data-testid="child-input" />
      </FieldGroup>
    );
    expect(screen.getByTestId('child-input')).toBeInTheDocument();
  });

  it('renders label when provided', () => {
    render(
      <FieldGroup label="Email">
        <input />
      </FieldGroup>
    );
    const label = screen.getByText('Email');
    expect(label).toBeInTheDocument();
    expect(label.tagName).toBe('LABEL');
  });

  it('links label to input via htmlFor', () => {
    render(
      <FieldGroup label="Email" htmlFor="email-input">
        <input id="email-input" />
      </FieldGroup>
    );
    const label = screen.getByText('Email');
    expect(label).toHaveAttribute('for', 'email-input');
  });

  it('does not render label when not provided', () => {
    const { container } = render(
      <FieldGroup>
        <input />
      </FieldGroup>
    );
    expect(container.querySelector('label')).toBeNull();
  });

  it('renders error text when error prop provided', () => {
    render(
      <FieldGroup error="Required field">
        <input />
      </FieldGroup>
    );
    expect(screen.getByText('Required field')).toBeInTheDocument();
  });

  it('renders helper text when helperText provided', () => {
    render(
      <FieldGroup helperText="Enter your email">
        <input />
      </FieldGroup>
    );
    expect(screen.getByText('Enter your email')).toBeInTheDocument();
  });

  it('shows error text instead of helper text when both provided', () => {
    render(
      <FieldGroup error="Invalid" helperText="Enter your email">
        <input />
      </FieldGroup>
    );
    expect(screen.getByText('Invalid')).toBeInTheDocument();
    expect(screen.queryByText('Enter your email')).not.toBeInTheDocument();
  });

  it('applies disabled class when disabled', () => {
    const { container } = render(
      <FieldGroup disabled>
        <input />
      </FieldGroup>
    );
    const wrapper = container.firstElementChild;
    expect(wrapper?.className).toMatch(/disabled/);
  });

  it('applies custom className', () => {
    const { container } = render(
      <FieldGroup className="my-custom-class">
        <input />
      </FieldGroup>
    );
    const wrapper = container.firstElementChild;
    expect(wrapper?.className).toContain('my-custom-class');
  });
});
