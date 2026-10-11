import { describe, it, expect, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContextMenu from './ContextMenu';
import type { ContextMenuItem } from './ContextMenu';

const baseItems: ContextMenuItem[] = [
  { label: 'Copy', onClick: vi.fn(), shortcut: 'Ctrl+C' },
  { label: 'Paste', onClick: vi.fn(), shortcut: 'Ctrl+V' },
  { label: 'Delete', onClick: vi.fn(), variant: 'destructive' },
];

function renderWithTrigger(items: ContextMenuItem[] = baseItems, className?: string) {
  return render(
    <ContextMenu items={items} className={className}>
      <div>Right click me</div>
    </ContextMenu>,
  );
}

describe('ContextMenu', () => {
  it('renders children', () => {
    renderWithTrigger();
    expect(screen.getByText('Right click me')).toBeInTheDocument();
  });

  it('does not show the menu initially', () => {
    renderWithTrigger();
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('shows the menu on right click', async () => {
    const user = userEvent.setup();
    renderWithTrigger();

    await user.pointer({
      target: screen.getByText('Right click me'),
      keys: '[MouseRight]',
    });

    expect(screen.getByRole('menu')).toBeInTheDocument();
  });

  it('renders all menu items', async () => {
    const user = userEvent.setup();
    renderWithTrigger();

    await user.pointer({
      target: screen.getByText('Right click me'),
      keys: '[MouseRight]',
    });

    const menu = screen.getByRole('menu');
    const menuItems = within(menu).getAllByRole('menuitem');
    expect(menuItems).toHaveLength(3);
    expect(within(menu).getByText('Copy')).toBeInTheDocument();
    expect(within(menu).getByText('Paste')).toBeInTheDocument();
    expect(within(menu).getByText('Delete')).toBeInTheDocument();
  });

  it('displays shortcut text', async () => {
    const user = userEvent.setup();
    renderWithTrigger();

    await user.pointer({
      target: screen.getByText('Right click me'),
      keys: '[MouseRight]',
    });

    expect(screen.getByText('Ctrl+C')).toBeInTheDocument();
    expect(screen.getByText('Ctrl+V')).toBeInTheDocument();
  });

  it('calls onClick when a menu item is clicked', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    const items: ContextMenuItem[] = [{ label: 'Action', onClick }];
    render(
      <ContextMenu items={items}>
        <div>Trigger</div>
      </ContextMenu>,
    );

    await user.pointer({
      target: screen.getByText('Trigger'),
      keys: '[MouseRight]',
    });
    await user.click(screen.getByText('Action'));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('closes the menu after clicking an item', async () => {
    const user = userEvent.setup();
    const items: ContextMenuItem[] = [{ label: 'Action', onClick: vi.fn() }];
    render(
      <ContextMenu items={items}>
        <div>Trigger</div>
      </ContextMenu>,
    );

    await user.pointer({
      target: screen.getByText('Trigger'),
      keys: '[MouseRight]',
    });
    await user.click(screen.getByText('Action'));

    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('does not call onClick for disabled items', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    const items: ContextMenuItem[] = [
      { label: 'Disabled', onClick, disabled: true },
    ];
    render(
      <ContextMenu items={items}>
        <div>Trigger</div>
      </ContextMenu>,
    );

    await user.pointer({
      target: screen.getByText('Trigger'),
      keys: '[MouseRight]',
    });
    await user.click(screen.getByText('Disabled'));

    expect(onClick).not.toHaveBeenCalled();
  });

  it('marks disabled items with aria-disabled', async () => {
    const user = userEvent.setup();
    const items: ContextMenuItem[] = [
      { label: 'Disabled', disabled: true },
    ];
    render(
      <ContextMenu items={items}>
        <div>Trigger</div>
      </ContextMenu>,
    );

    await user.pointer({
      target: screen.getByText('Trigger'),
      keys: '[MouseRight]',
    });

    expect(screen.getByRole('menuitem')).toHaveAttribute('aria-disabled', 'true');
  });

  it('renders separators', async () => {
    const user = userEvent.setup();
    const items: ContextMenuItem[] = [
      { label: 'Copy', onClick: vi.fn() },
      { label: '', separator: true },
      { label: 'Delete', onClick: vi.fn() },
    ];
    render(
      <ContextMenu items={items}>
        <div>Trigger</div>
      </ContextMenu>,
    );

    await user.pointer({
      target: screen.getByText('Trigger'),
      keys: '[MouseRight]',
    });

    expect(screen.getByRole('separator')).toBeInTheDocument();
  });

  it('closes the menu when Escape is pressed', async () => {
    const user = userEvent.setup();
    renderWithTrigger();

    await user.pointer({
      target: screen.getByText('Right click me'),
      keys: '[MouseRight]',
    });
    expect(screen.getByRole('menu')).toBeInTheDocument();

    await user.keyboard('{Escape}');
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('applies destructive variant class', async () => {
    const user = userEvent.setup();
    renderWithTrigger();

    await user.pointer({
      target: screen.getByText('Right click me'),
      keys: '[MouseRight]',
    });

    const deleteItem = screen.getByText('Delete').closest('[role="menuitem"]')!;
    expect(deleteItem.className).toContain('destructive');
  });

  it('passes className to the wrapper', () => {
    renderWithTrigger(baseItems, 'custom-class');
    expect(screen.getByText('Right click me').parentElement).toHaveClass('custom-class');
  });
});
