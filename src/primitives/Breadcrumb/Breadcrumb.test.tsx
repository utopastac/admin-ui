import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Breadcrumb, { type BreadcrumbItem } from './Breadcrumb';

describe('Breadcrumb', () => {
  const items: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Widget' },
  ];

  it('renders a nav with aria-label="Breadcrumb"', () => {
    render(<Breadcrumb items={items} />);
    expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toBeInTheDocument();
  });

  it('renders all items', () => {
    render(<Breadcrumb items={items} />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Products')).toBeInTheDocument();
    expect(screen.getByText('Widget')).toBeInTheDocument();
  });

  it('renders non-last items with href as links', () => {
    render(<Breadcrumb items={items} />);
    const homeLink = screen.getByText('Home').closest('a');
    expect(homeLink).toHaveAttribute('href', '/');
    const productsLink = screen.getByText('Products').closest('a');
    expect(productsLink).toHaveAttribute('href', '/products');
  });

  it('marks the last item as current page', () => {
    render(<Breadcrumb items={items} />);
    expect(screen.getByText('Widget')).toHaveAttribute('aria-current', 'page');
  });

  it('renders the last item as a span, not a link', () => {
    render(<Breadcrumb items={items} />);
    const lastItem = screen.getByText('Widget');
    expect(lastItem.tagName).toBe('SPAN');
    expect(lastItem.closest('a')).toBeNull();
  });

  it('renders default separator between items', () => {
    const { container } = render(<Breadcrumb items={items} />);
    const separators = container.querySelectorAll('[aria-hidden="true"]');
    expect(separators).toHaveLength(2);
    expect(separators[0].textContent).toBe('/');
  });

  it('renders custom separator', () => {
    const { container } = render(<Breadcrumb items={items} separator=">" />);
    const separators = container.querySelectorAll('[aria-hidden="true"]');
    expect(separators[0].textContent).toBe('>');
  });

  it('renders a button for items with onClick but no href', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    const buttonItems: BreadcrumbItem[] = [
      { label: 'Home', onClick: handleClick },
      { label: 'Current' },
    ];
    render(<Breadcrumb items={buttonItems} />);
    const button = screen.getByRole('button', { name: 'Home' });
    expect(button).toBeInTheDocument();
    await user.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders a plain span for items without href or onClick (non-last)', () => {
    const plainItems: BreadcrumbItem[] = [
      { label: 'Plain' },
      { label: 'Current' },
    ];
    render(<Breadcrumb items={plainItems} />);
    const plain = screen.getByText('Plain');
    expect(plain.tagName).toBe('SPAN');
    expect(plain.closest('a')).toBeNull();
    expect(plain.closest('button')).toBeNull();
  });

  it('applies custom className', () => {
    render(<Breadcrumb items={items} className="custom" />);
    expect(screen.getByRole('navigation')).toHaveClass('custom');
  });
});
