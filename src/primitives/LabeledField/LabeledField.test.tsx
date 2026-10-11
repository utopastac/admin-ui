import { render, screen } from '@testing-library/react';
import LabeledField from './LabeledField';

describe('LabeledField', () => {
  it('renders children', () => {
    render(
      <LabeledField>
        <input data-testid="field-input" />
      </LabeledField>,
    );
    expect(screen.getByTestId('field-input')).toBeInTheDocument();
  });

  it('renders label text', () => {
    render(
      <LabeledField label="Email">
        <input />
      </LabeledField>,
    );
    expect(screen.getByText('Email')).toBeInTheDocument();
  });

  it('uses FieldGroup path when labelPosition is omitted', () => {
    render(
      <LabeledField label="Name" htmlFor="name-input">
        <input id="name-input" />
      </LabeledField>,
    );
    // FieldGroup renders a <label> element
    const label = screen.getByText('Name');
    expect(label.tagName).toBe('LABEL');
  });

  it('uses FieldGroup path when labelPosition="top"', () => {
    render(
      <LabeledField label="Username" labelPosition="top" htmlFor="username-input">
        <input id="username-input" />
      </LabeledField>,
    );
    const label = screen.getByText('Username');
    expect(label.tagName).toBe('LABEL');
  });

  it('uses FieldLabel path when labelPosition="left"', () => {
    render(
      <LabeledField label="First name" labelPosition="left" htmlFor="first-name">
        <input id="first-name" />
      </LabeledField>,
    );
    // FieldLabel also renders a <label>
    expect(screen.getByText('First name')).toBeInTheDocument();
  });

  it('shows error text via FieldGroup path', () => {
    render(
      <LabeledField label="Password" error="Password is required">
        <input />
      </LabeledField>,
    );
    expect(screen.getByText('Password is required')).toBeInTheDocument();
  });

  it('shows helperText via FieldGroup path', () => {
    render(
      <LabeledField label="Bio" helperText="Max 160 characters">
        <textarea />
      </LabeledField>,
    );
    expect(screen.getByText('Max 160 characters')).toBeInTheDocument();
  });

  it('renders without crashing when disabled', () => {
    render(
      <LabeledField label="Read-only field" disabled>
        <input disabled />
      </LabeledField>,
    );
    expect(screen.getByText('Read-only field')).toBeInTheDocument();
  });

  it('renders without a label when label prop is omitted', () => {
    const { container } = render(
      <LabeledField>
        <input data-testid="no-label-input" />
      </LabeledField>,
    );
    expect(screen.getByTestId('no-label-input')).toBeInTheDocument();
    expect(container.querySelector('label')).toBeNull();
  });
});
