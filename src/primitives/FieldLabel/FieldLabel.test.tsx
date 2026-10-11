import { render, screen } from '@testing-library/react';
import FieldLabel from './FieldLabel';

describe('FieldLabel', () => {
  it('renders the label text', () => {
    render(
      <FieldLabel label="My Label">
        <input />
      </FieldLabel>,
    );
    expect(screen.getByText('My Label')).toBeInTheDocument();
  });

  it('renders children', () => {
    render(
      <FieldLabel label="Field">
        <input data-testid="child-input" />
      </FieldLabel>,
    );
    expect(screen.getByTestId('child-input')).toBeInTheDocument();
  });

  it('applies top positioning class by default', () => {
    const { container } = render(
      <FieldLabel label="Field">
        <input />
      </FieldLabel>,
    );
    const wrapper = container.firstElementChild!;
    expect(wrapper.className).toMatch(/fieldTop/);
    expect(wrapper.className).not.toMatch(/fieldLeft/);
  });

  it('applies left positioning class when labelPosition="left"', () => {
    const { container } = render(
      <FieldLabel label="Field" labelPosition="left">
        <input />
      </FieldLabel>,
    );
    const wrapper = container.firstElementChild!;
    expect(wrapper.className).toMatch(/fieldLeft/);
    expect(wrapper.className).not.toMatch(/fieldTop/);
  });

  it('does not apply inline width style when labelWidth is not provided', () => {
    render(
      <FieldLabel label="Field">
        <input />
      </FieldLabel>,
    );
    const label = screen.getByText('Field');
    // No width style when labelWidth is omitted
    expect(label).not.toHaveStyle({ width: '80px' });
  });

  it('applies labelWidth as inline style on the label element when labelPosition="left"', () => {
    render(
      <FieldLabel label="Field" labelPosition="left" labelWidth={80}>
        <input />
      </FieldLabel>,
    );
    const label = screen.getByText('Field');
    expect(label).toHaveStyle({ width: '80px' });
  });

  it('applies labelWidth as a string value when labelPosition="left"', () => {
    render(
      <FieldLabel label="Field" labelPosition="left" labelWidth="6rem">
        <input />
      </FieldLabel>,
    );
    const label = screen.getByText('Field');
    expect(label).toHaveStyle({ width: '6rem' });
  });

  it('applies disabled class when disabled={true}', () => {
    const { container } = render(
      <FieldLabel label="Field" disabled>
        <input />
      </FieldLabel>,
    );
    const wrapper = container.firstElementChild!;
    expect(wrapper.className).toMatch(/disabled/);
  });

  it('does not apply disabled class when disabled is false', () => {
    const { container } = render(
      <FieldLabel label="Field" disabled={false}>
        <input />
      </FieldLabel>,
    );
    const wrapper = container.firstElementChild!;
    expect(wrapper.className).not.toMatch(/disabled/);
  });

  it('forwards htmlFor to the label element', () => {
    render(
      <FieldLabel label="My Field" htmlFor="my-input">
        <input id="my-input" />
      </FieldLabel>,
    );
    const label = screen.getByText('My Field');
    expect(label).toHaveAttribute('for', 'my-input');
  });

  it('renders label as a <label> element', () => {
    render(
      <FieldLabel label="Tag Check">
        <input />
      </FieldLabel>,
    );
    expect(screen.getByText('Tag Check').tagName).toBe('LABEL');
  });
});
