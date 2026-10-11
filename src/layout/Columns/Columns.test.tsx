import { render } from '@testing-library/react';
import Columns from './Columns';

describe('Columns', () => {
  it('renders children', () => {
    const { getByText } = render(<Columns><span>child</span></Columns>);
    expect(getByText('child')).toBeTruthy();
  });

  it('applies 2-column class by default', () => {
    const { container } = render(<Columns><span /></Columns>);
    expect(container.firstChild).toHaveClass('cols2');
  });

  it('applies 3-column class', () => {
    const { container } = render(<Columns count={3}><span /></Columns>);
    expect(container.firstChild).toHaveClass('cols3');
  });

  it('applies 4-column class', () => {
    const { container } = render(<Columns count={4}><span /></Columns>);
    expect(container.firstChild).toHaveClass('cols4');
  });

  it('sets --columns-gap custom property', () => {
    const { container } = render(<Columns gap="l"><span /></Columns>);
    expect((container.firstChild as HTMLElement).style.getPropertyValue('--columns-gap')).toBe('var(--admin-space-l)');
  });

  it('forwards className', () => {
    const { container } = render(<Columns className="extra"><span /></Columns>);
    expect(container.firstChild).toHaveClass('extra');
  });
});
