import { render, screen } from '@testing-library/react';
import BulletList from './BulletList';

describe('BulletList', () => {
  const items = ['First', 'Second', 'Third'];

  it('renders a ul element', () => {
    render(<BulletList items={items} />);
    expect(screen.getByRole('list')).toBeInTheDocument();
  });

  it('renders all items as list items', () => {
    render(<BulletList items={items} />);
    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(3);
    expect(listItems[0]).toHaveTextContent('First');
    expect(listItems[1]).toHaveTextContent('Second');
    expect(listItems[2]).toHaveTextContent('Third');
  });

  it('renders an empty list with no items', () => {
    render(<BulletList items={[]} />);
    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.queryAllByRole('listitem')).toHaveLength(0);
  });

  it('defaults to md size', () => {
    render(<BulletList items={items} />);
    expect(screen.getByRole('list')).toHaveClass('md');
  });

  it('applies sm size class', () => {
    render(<BulletList items={items} size="sm" />);
    expect(screen.getByRole('list')).toHaveClass('sm');
  });

  it('applies custom className', () => {
    render(<BulletList items={items} className="custom" />);
    expect(screen.getByRole('list')).toHaveClass('custom');
  });
});
