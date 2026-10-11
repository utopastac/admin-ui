import { render } from '@testing-library/react';
import Skeleton from './Skeleton';

describe('Skeleton', () => {
  it('renders without crashing with no props', () => {
    const { container } = render(<Skeleton />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('applies rect class by default', () => {
    const { container } = render(<Skeleton />);
    const el = container.firstChild as HTMLElement;
    expect(el).toHaveClass('rect');
  });

  it('applies circle class for variant="circle"', () => {
    const { container } = render(<Skeleton variant="circle" />);
    const el = container.firstChild as HTMLElement;
    expect(el).toHaveClass('circle');
  });

  it('applies text class for variant="text"', () => {
    const { container } = render(<Skeleton variant="text" />);
    const el = container.firstChild as HTMLElement;
    expect(el).toHaveClass('text');
  });

  it('applies width and height as inline styles', () => {
    const { container } = render(<Skeleton width={200} height="3rem" />);
    const el = container.firstChild as HTMLElement;
    expect(el).toHaveStyle({ width: '200px', height: '3rem' });
  });

  it('applies string width and height as inline styles', () => {
    const { container } = render(<Skeleton width="50%" height="1.5rem" />);
    const el = container.firstChild as HTMLElement;
    expect(el).toHaveStyle({ width: '50%', height: '1.5rem' });
  });

  it('renders multiple skeleton rows when lines > 1 for text variant', () => {
    const { container } = render(<Skeleton variant="text" lines={3} />);
    const rows = container.querySelectorAll('.skeleton');
    expect(rows).toHaveLength(3);
  });

  it('renders a wrapper div for multi-line text variant', () => {
    const { container } = render(<Skeleton variant="text" lines={2} />);
    // First child is the wrapper, not a skeleton itself
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass('textGroup');
  });

  it('last line in multi-line text is narrower (60% width)', () => {
    const { container } = render(<Skeleton variant="text" lines={3} />);
    const rows = container.querySelectorAll('.skeleton');
    const lastRow = rows[rows.length - 1] as HTMLElement;
    expect(lastRow).toHaveStyle({ width: '60%' });
  });

  it('non-last lines in multi-line text default to 100% width', () => {
    const { container } = render(<Skeleton variant="text" lines={3} />);
    const rows = container.querySelectorAll('.skeleton');
    const firstRow = rows[0] as HTMLElement;
    expect(firstRow).toHaveStyle({ width: '100%' });
  });

  it('forwards custom className for single skeleton', () => {
    const { container } = render(<Skeleton className="custom-class" />);
    const el = container.firstChild as HTMLElement;
    expect(el).toHaveClass('custom-class');
  });

  it('forwards custom className for multi-line text wrapper', () => {
    const { container } = render(<Skeleton variant="text" lines={2} className="custom-class" />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass('custom-class');
  });

  it('single text variant applies text class directly', () => {
    const { container } = render(<Skeleton variant="text" lines={1} />);
    const el = container.firstChild as HTMLElement;
    expect(el).toHaveClass('text');
    expect(el).toHaveClass('skeleton');
  });
});
