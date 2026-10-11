import { render, screen, fireEvent } from '@testing-library/react';
import SideNavSearch from './SideNavSearch';

describe('SideNavSearch', () => {
  it('renders the search input with the given placeholder', () => {
    render(
      <SideNavSearch value="" onChange={() => {}} placeholder="Find" icon="search" />,
    );
    expect(screen.getByPlaceholderText('Find')).toBeInTheDocument();
  });

  it('reflects the given value', () => {
    render(
      <SideNavSearch value="hello" onChange={() => {}} placeholder="Find" icon="search" />,
    );
    expect((screen.getByRole('textbox') as HTMLInputElement).value).toBe('hello');
  });

  it('calls onChange when the input changes', () => {
    const onChange = vi.fn();
    render(
      <SideNavSearch value="" onChange={onChange} placeholder="Find" icon="search" />,
    );
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'hi' } });
    expect(onChange).toHaveBeenCalledWith('hi');
  });
});
