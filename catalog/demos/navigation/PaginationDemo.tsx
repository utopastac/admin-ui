import React, { useState } from 'react';
import { DemoSection, DemoSubsection } from '../../shared/DemoSection';
import { DemoShowcase } from '../../shared/DemoShowcase';
import { PropsTable } from '../../shared/PropsTable';
import type { PropRow } from '../../shared/PropsTable';
import { Pagination } from '@/navigation';

const PaginationProps: PropRow[] = [
  { prop: 'currentPage', type: 'number', description: 'The current active page (1-based).' },
  { prop: 'totalPages', type: 'number', description: 'Total number of pages.' },
  { prop: 'onPageChange', type: '(page: number) => void', description: 'Called when a page is selected.' },
  { prop: 'variant', type: 'PaginationVariant', default: "'numbered'", description: 'Display mode.', options: ['buttons', 'numbered', 'dots'] },
  { prop: 'className', type: 'string', description: 'Additional CSS class for the root element.' },
];

export default function PaginationDemo() {
  const [page1, setPage1] = useState(1);
  const [page2, setPage2] = useState(4);
  const [page3, setPage3] = useState(3);

  return (
    <DemoSection title="Pagination" description="Page navigation with three display variants: buttons, numbered, and dots.">
      <DemoShowcase code={`import { Pagination } from 'admin-ui';

const [page, setPage] = useState(1);

<Pagination
  variant="numbered"
  currentPage={page}
  totalPages={10}
  onPageChange={setPage}
/>`}>
        <Pagination variant="numbered" currentPage={page2} totalPages={20} onPageChange={setPage2} />
      </DemoShowcase>
      <PropsTable props={PaginationProps} />

      <DemoSubsection label="Buttons">
        <Pagination variant="buttons" currentPage={page1} totalPages={10} onPageChange={setPage1} />
      </DemoSubsection>
      <DemoSubsection label="Numbered">
        <Pagination variant="numbered" currentPage={page2} totalPages={20} onPageChange={setPage2} />
      </DemoSubsection>
      <DemoSubsection label="Numbered (few pages)">
        <Pagination variant="numbered" currentPage={page3} totalPages={5} onPageChange={setPage3} />
      </DemoSubsection>
      <DemoSubsection label="Dots">
        <Pagination variant="dots" currentPage={page3} totalPages={5} onPageChange={setPage3} />
      </DemoSubsection>
    </DemoSection>
  );
}
