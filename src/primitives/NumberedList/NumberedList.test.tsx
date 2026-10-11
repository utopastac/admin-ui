import { render, screen } from '@testing-library/react';
import NumberedList from './NumberedList';

describe('NumberedList', () => {
  const items = ['First item', 'Second item', 'Third item'];

  it('renders an ordered list', () => {
    render(<NumberedList items={items} />);
    const list = screen.getByRole('list');
    expect(list).toBeInTheDocument();
    expect(list.tagName).toBe('OL');
  });

  it('renders all items as list items', () => {
    render(<NumberedList items={items} />);
    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(3);
    expect(listItems[0]).toHaveTextContent('First item');
    expect(listItems[1]).toHaveTextContent('Second item');
    expect(listItems[2]).toHaveTextContent('Third item');
  });

  it('starts at 1 by default', () => {
    render(<NumberedList items={items} />);
    const list = screen.getByRole('list');
    expect(list).toHaveAttribute('start', '1');
  });

  it('supports a custom start number', () => {
    render(<NumberedList items={items} start={5} />);
    const list = screen.getByRole('list');
    expect(list).toHaveAttribute('start', '5');
    expect(list).toHaveStyle({ counterReset: 'list-counter 4' });
  });

  it('defaults to md size', () => {
    const { container } = render(<NumberedList items={items} />);
    const list = container.querySelector('ol');
    expect(list?.className).toContain('md');
  });

  it('applies sm size class', () => {
    const { container } = render(<NumberedList items={items} size="sm" />);
    const list = container.querySelector('ol');
    expect(list?.className).toContain('sm');
  });

  it('applies additional className', () => {
    const { container } = render(<NumberedList items={items} className="extra" />);
    const list = container.querySelector('ol');
    expect(list?.className).toContain('extra');
  });

  it('renders an empty list when items is empty', () => {
    render(<NumberedList items={[]} />);
    const list = screen.getByRole('list');
    expect(list).toBeInTheDocument();
    expect(screen.queryAllByRole('listitem')).toHaveLength(0);
  });
});
