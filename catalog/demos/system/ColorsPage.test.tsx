import { act, render, screen, waitFor } from '@testing-library/react';
import ColorsPage from './ColorsPage';

function mockHighlightToken() {
  const original = window.getComputedStyle.bind(window);
  vi.spyOn(window, 'getComputedStyle').mockImplementation((element) => {
    const style = original(element);
    return new Proxy(style, {
      get(target, prop, receiver) {
        if (prop === 'getPropertyValue') {
          return (name: string) => {
            if (name === '--admin-text-highlight') {
              const theme = document.documentElement.getAttribute('data-admin-theme') ?? '';
              return theme.includes('ocean') ? '#0284c7' : '#0033d9';
            }
            return target.getPropertyValue(name);
          };
        }
        const value = Reflect.get(target, prop, receiver);
        return typeof value === 'function' ? value.bind(target) : value;
      },
    });
  });
}

describe('ColorsPage', () => {
  afterEach(() => {
    document.documentElement.removeAttribute('data-admin-theme');
    document.documentElement.removeAttribute('data-theme');
    vi.restoreAllMocks();
  });

  it('refreshes resolved token values when the document theme changes', async () => {
    mockHighlightToken();
    render(<ColorsPage />);

    await waitFor(() => {
      expect(screen.getByText('#0033D9')).toBeInTheDocument();
    });

    await act(async () => {
      document.documentElement.setAttribute('data-admin-theme', 'ocean');
    });

    await waitFor(() => {
      expect(screen.getByText('#0284C7')).toBeInTheDocument();
    });
    expect(screen.queryByText('#0033D9')).not.toBeInTheDocument();
  });
});
