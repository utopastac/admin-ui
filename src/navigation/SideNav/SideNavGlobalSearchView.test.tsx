import React from 'react';
import { render, screen } from '@testing-library/react';
import SideNavGlobalSearchView from './SideNavGlobalSearchView';
import { SideNavContext } from './SideNavContext';

function renderWithContext(ui: React.ReactElement) {
  return render(
    <SideNavContext.Provider
      value={{ onSelect: () => {}, highContrast: false, fullWidth: false, activeId: undefined }}
    >
      {ui}
    </SideNavContext.Provider>,
  );
}

describe('SideNavGlobalSearchView', () => {
  it('renders "No results" when results are empty', () => {
    renderWithContext(<SideNavGlobalSearchView results={[]} />);
    expect(screen.getByText('No results')).toBeInTheDocument();
  });

  it('renders a header combining tab and section labels', () => {
    renderWithContext(
      <SideNavGlobalSearchView
        results={[
          {
            tab: { id: 't1', label: 'Primitives' },
            sections: [
              { label: 'Forms', items: [{ id: 'input', label: 'Input' }] },
            ],
          },
        ]}
      />,
    );
    expect(screen.getByText('Primitives / Forms')).toBeInTheDocument();
    expect(screen.getByText('Input')).toBeInTheDocument();
  });

  it('renders just the tab label when section has no label', () => {
    renderWithContext(
      <SideNavGlobalSearchView
        results={[
          {
            tab: { id: 't1', label: 'Primitives' },
            sections: [{ items: [{ id: 'button', label: 'Button' }] }],
          },
        ]}
      />,
    );
    expect(screen.getByText('Primitives')).toBeInTheDocument();
    expect(screen.getByText('Button')).toBeInTheDocument();
  });
});
