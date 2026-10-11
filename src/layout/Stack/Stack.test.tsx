import { render } from '@testing-library/react';
import Stack from './Stack';

describe('Stack', () => {
  it('renders children', () => {
    const { getByText } = render(<Stack><span>child</span></Stack>);
    expect(getByText('child')).toBeTruthy();
  });

  it('applies column direction by default', () => {
    const { container } = render(<Stack><span /></Stack>);
    expect(container.firstChild).toHaveClass('column');
  });

  it('applies row direction', () => {
    const { container } = render(<Stack direction="row"><span /></Stack>);
    expect(container.firstChild).toHaveClass('row');
  });

  it('sets --stack-gap custom property', () => {
    const { container } = render(<Stack gap="l"><span /></Stack>);
    expect((container.firstChild as HTMLElement).style.getPropertyValue('--stack-gap')).toBe('var(--admin-space-l)');
  });

  it('applies wrap class', () => {
    const { container } = render(<Stack wrap><span /></Stack>);
    expect(container.firstChild).toHaveClass('wrap');
  });

  it('applies align class', () => {
    const { container } = render(<Stack align="center"><span /></Stack>);
    expect(container.firstChild).toHaveClass('alignCenter');
  });

  it('forwards className', () => {
    const { container } = render(<Stack className="extra"><span /></Stack>);
    expect(container.firstChild).toHaveClass('extra');
  });
});
