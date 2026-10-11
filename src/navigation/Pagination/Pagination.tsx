import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ToolbarButton from '@/primitives/ToolbarButton/ToolbarButton';
import styles from './Pagination.module.css';

export type PaginationVariant = 'buttons' | 'numbered' | 'dots';

interface PaginationProps {
  /** The current active page (1-based). */
  currentPage: number;
  /** Total number of pages. */
  totalPages: number;
  /** Called when a page is selected. */
  onPageChange: (page: number) => void;
  /** Display mode. Defaults to 'numbered'. */
  variant?: PaginationVariant;
  className?: string;
}

/**
 * Builds the list of page numbers (and ellipsis gaps) to display when
 * totalPages exceeds 7. Always shows first page, last page, and up to
 * 2 pages around the current page.
 */
function getPageRange(currentPage: number, totalPages: number): (number | 'ellipsis')[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages = new Set<number>();
  pages.add(1);
  pages.add(totalPages);

  for (let i = currentPage - 2; i <= currentPage + 2; i++) {
    if (i >= 1 && i <= totalPages) {
      pages.add(i);
    }
  }

  const sorted = Array.from(pages).sort((a, b) => a - b);
  const result: (number | 'ellipsis')[] = [];

  for (let i = 0; i < sorted.length; i++) {
    if (i > 0 && sorted[i] - sorted[i - 1] > 1) {
      result.push('ellipsis');
    }
    result.push(sorted[i]);
  }

  return result;
}

/**
 * A pagination control supporting three display variants:
 *
 * - **buttons** — Previous/Next arrows with a "Page X of Y" label.
 * - **numbered** — Previous/Next arrows with clickable page number buttons
 *   and ellipsis when the page count exceeds 7.
 * - **dots** — Previous/Next arrows with a row of clickable dot indicators.
 *
 * This component is fully controlled — active page and navigation are
 * managed by the consumer via props.
 *
 * @example
 * ```tsx
 * <Pagination
 *   currentPage={3}
 *   totalPages={10}
 *   onPageChange={(page) => setPage(page)}
 *   variant="numbered"
 * />
 * ```
 */
const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  variant = 'numbered',
  className = '',
}) => {
  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= totalPages;

  const prevButton = (
    <ToolbarButton
      icon={ChevronLeft}
      size="sm"
      aria-label="Previous page"
      onClick={() => onPageChange(currentPage - 1)}
      disabled={isFirstPage}
      className={isFirstPage ? styles.disabled : undefined}
    />
  );

  const nextButton = (
    <ToolbarButton
      icon={ChevronRight}
      size="sm"
      aria-label="Next page"
      onClick={() => onPageChange(currentPage + 1)}
      disabled={isLastPage}
      className={isLastPage ? styles.disabled : undefined}
    />
  );

  return (
    <nav className={`${styles.pagination} ${className}`} aria-label="Pagination">
      {variant === 'buttons' && (
        <>
          {prevButton}
          <span className={styles.pageIndicator}>
            Page {currentPage} of {totalPages}
          </span>
          {nextButton}
        </>
      )}

      {variant === 'numbered' && (
        <>
          {prevButton}
          <div className={styles.pageNumbers}>
            {getPageRange(currentPage, totalPages).map((item, index) =>
              item === 'ellipsis' ? (
                <span key={`ellipsis-${index}`} className={styles.ellipsis}>
                  &hellip;
                </span>
              ) : (
                <button
                  key={item}
                  type="button"
                  className={`${styles.pageButton} ${item === currentPage ? styles.pageButtonActive : ''}`}
                  onClick={() => onPageChange(item)}
                  aria-label={`Page ${item}`}
                  aria-current={item === currentPage ? 'page' : undefined}
                >
                  {item}
                </button>
              ),
            )}
          </div>
          {nextButton}
        </>
      )}

      {variant === 'dots' && (
        <>
          {prevButton}
          <div className={styles.dots}>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                type="button"
                className={`${styles.dot} ${page === currentPage ? styles.dotActive : ''}`}
                onClick={() => onPageChange(page)}
                aria-label={`Page ${page}`}
                aria-current={page === currentPage ? 'page' : undefined}
              />
            ))}
          </div>
          {nextButton}
        </>
      )}
    </nav>
  );
};

export default Pagination;
