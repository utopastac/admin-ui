import { render, screen } from '@testing-library/react';
import AppLayout from './AppLayout';

describe('AppLayout', () => {
  it('renders topNav slot', () => {
    render(
      <AppLayout topNav={<div>Top Nav</div>}>
        <div>Content</div>
      </AppLayout>
    );
    expect(screen.getByText('Top Nav')).toBeTruthy();
  });

  it('renders children', () => {
    render(
      <AppLayout topNav={<div>Top Nav</div>}>
        <div>Content</div>
      </AppLayout>
    );
    expect(screen.getByText('Content')).toBeTruthy();
  });

  it('renders sideNav when provided', () => {
    render(
      <AppLayout topNav={<div>Top Nav</div>} sideNav={<div>Side Nav</div>}>
        <div>Content</div>
      </AppLayout>
    );
    expect(screen.getByText('Side Nav')).toBeTruthy();
  });

  it('renders panel when provided', () => {
    render(
      <AppLayout topNav={<div>Top Nav</div>} panel={<div>Panel</div>}>
        <div>Content</div>
      </AppLayout>
    );
    expect(screen.getByText('Panel')).toBeTruthy();
  });

  it('renders all slots together', () => {
    render(
      <AppLayout
        topNav={<div>Top Nav</div>}
        sideNav={<div>Side Nav</div>}
        panel={<div>Panel</div>}
      >
        <div>Content</div>
      </AppLayout>
    );
    expect(screen.getByText('Top Nav')).toBeTruthy();
    expect(screen.getByText('Side Nav')).toBeTruthy();
    expect(screen.getByText('Panel')).toBeTruthy();
    expect(screen.getByText('Content')).toBeTruthy();
  });

  it('omits sideNav when not provided', () => {
    const { container } = render(
      <AppLayout topNav={<div>Top Nav</div>}>
        <div>Content</div>
      </AppLayout>
    );
    expect(container.querySelector(`.sideNav`)).toBeNull();
  });
});
