import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pagination from './Pagination';

// Mock ToolbarButton to render a simple button with the aria-label
vi.mock('@/primitives/ToolbarButton/ToolbarButton', () => ({
  default: ({ onClick, 'aria-label': ariaLabel, className, disabled }: any) => (
    <button onClick={onClick} aria-label={ariaLabel} className={className} disabled={disabled}>
      {ariaLabel}
    </button>
  ),
}));

const defaultProps = {
  currentPage: 3,
  totalPages: 10,
  onPageChange: vi.fn(),
};

describe('Pagination', () => {
  describe('common', () => {
    it('renders a nav element with pagination label', () => {
      render(<Pagination {...defaultProps} />);
      expect(screen.getByRole('navigation', { name: 'Pagination' })).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<Pagination {...defaultProps} className="custom" />);
      expect(screen.getByRole('navigation')).toHaveClass('custom');
    });
  });

  describe('buttons variant', () => {
    it('displays "Page X of Y" label', () => {
      render(<Pagination {...defaultProps} variant="buttons" />);
      expect(screen.getByText('Page 3 of 10')).toBeInTheDocument();
    });

    it('calls onPageChange with previous page on prev click', async () => {
      const user = userEvent.setup();
      const onPageChange = vi.fn();
      render(
        <Pagination {...defaultProps} onPageChange={onPageChange} variant="buttons" />,
      );

      await user.click(screen.getByLabelText('Previous page'));
      expect(onPageChange).toHaveBeenCalledWith(2);
    });

    it('calls onPageChange with next page on next click', async () => {
      const user = userEvent.setup();
      const onPageChange = vi.fn();
      render(
        <Pagination {...defaultProps} onPageChange={onPageChange} variant="buttons" />,
      );

      await user.click(screen.getByLabelText('Next page'));
      expect(onPageChange).toHaveBeenCalledWith(4);
    });

    it('applies disabled class on first page for prev button', () => {
      render(
        <Pagination currentPage={1} totalPages={5} onPageChange={vi.fn()} variant="buttons" />,
      );
      const prevButton = screen.getByLabelText('Previous page');
      expect(prevButton.className).toContain('disabled');
    });

    it('applies disabled attribute on first page for prev button', () => {
      render(
        <Pagination currentPage={1} totalPages={5} onPageChange={vi.fn()} variant="buttons" />,
      );
      expect(screen.getByLabelText('Previous page')).toBeDisabled();
    });

    it('applies disabled class on last page for next button', () => {
      render(
        <Pagination currentPage={5} totalPages={5} onPageChange={vi.fn()} variant="buttons" />,
      );
      const nextButton = screen.getByLabelText('Next page');
      expect(nextButton.className).toContain('disabled');
    });

    it('applies disabled attribute on last page for next button', () => {
      render(
        <Pagination currentPage={5} totalPages={5} onPageChange={vi.fn()} variant="buttons" />,
      );
      expect(screen.getByLabelText('Next page')).toBeDisabled();
    });
  });

  describe('numbered variant (default)', () => {
    it('renders page number buttons', () => {
      render(<Pagination currentPage={1} totalPages={5} onPageChange={vi.fn()} />);

      for (let i = 1; i <= 5; i++) {
        expect(screen.getByLabelText(`Page ${i}`)).toBeInTheDocument();
      }
    });

    it('marks the current page with aria-current="page"', () => {
      render(<Pagination {...defaultProps} />);
      const currentButton = screen.getByLabelText('Page 3');
      expect(currentButton).toHaveAttribute('aria-current', 'page');
    });

    it('does not set aria-current on non-active pages', () => {
      render(<Pagination {...defaultProps} />);
      const otherButton = screen.getByLabelText('Page 1');
      expect(otherButton).not.toHaveAttribute('aria-current');
    });

    it('calls onPageChange when a page number is clicked', async () => {
      const user = userEvent.setup();
      const onPageChange = vi.fn();
      render(<Pagination {...defaultProps} onPageChange={onPageChange} />);

      await user.click(screen.getByLabelText('Page 5'));
      expect(onPageChange).toHaveBeenCalledWith(5);
    });

    it('renders ellipsis for large page counts', () => {
      render(<Pagination currentPage={5} totalPages={20} onPageChange={vi.fn()} />);
      // With 20 pages, there should be ellipsis elements
      const nav = screen.getByRole('navigation');
      const ellipses = nav.querySelectorAll('[class*="ellipsis"]');
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('renders all pages when totalPages is 7 or less', () => {
      render(<Pagination currentPage={1} totalPages={7} onPageChange={vi.fn()} />);
      for (let i = 1; i <= 7; i++) {
        expect(screen.getByLabelText(`Page ${i}`)).toBeInTheDocument();
      }
    });
  });

  describe('dots variant', () => {
    it('renders a dot for each page', () => {
      render(
        <Pagination currentPage={2} totalPages={5} onPageChange={vi.fn()} variant="dots" />,
      );

      for (let i = 1; i <= 5; i++) {
        expect(screen.getByLabelText(`Page ${i}`)).toBeInTheDocument();
      }
    });

    it('marks the current dot with aria-current="page"', () => {
      render(
        <Pagination currentPage={2} totalPages={5} onPageChange={vi.fn()} variant="dots" />,
      );
      expect(screen.getByLabelText('Page 2')).toHaveAttribute('aria-current', 'page');
    });

    it('calls onPageChange when a dot is clicked', async () => {
      const user = userEvent.setup();
      const onPageChange = vi.fn();
      render(
        <Pagination currentPage={1} totalPages={5} onPageChange={onPageChange} variant="dots" />,
      );

      await user.click(screen.getByLabelText('Page 4'));
      expect(onPageChange).toHaveBeenCalledWith(4);
    });
  });
});
