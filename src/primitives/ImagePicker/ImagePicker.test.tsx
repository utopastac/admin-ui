import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ImagePicker from './ImagePicker';
import type { ImageOption } from './ImagePicker';

afterEach(cleanup);

const images: ImageOption[] = [
  { key: 'a', src: 'https://picsum.photos/seed/a/200/150', label: 'Image A' },
  { key: 'b', src: 'https://picsum.photos/seed/b/200/150', label: 'Image B' },
  { key: 'c', src: 'https://picsum.photos/seed/c/200/150', label: 'Image C' },
];

describe('ImagePicker', () => {
  it('renders without crashing', () => {
    render(<ImagePicker images={images} onChange={vi.fn()} />);
    expect(screen.getByRole('button', { name: /select image/i })).toBeInTheDocument();
  });

  it('shows selected image thumbnail when value is provided', () => {
    render(<ImagePicker images={images} value="a" onChange={vi.fn()} />);
    const trigger = screen.getByRole('button', { name: /image a/i });
    expect(trigger).toBeInTheDocument();
    expect(trigger.querySelector('img')).toBeInTheDocument();
  });

  it('shows placeholder when no value is provided', () => {
    render(<ImagePicker images={images} onChange={vi.fn()} />);
    const trigger = screen.getByRole('button', { name: /select image/i });
    expect(trigger.querySelector('img')).not.toBeInTheDocument();
  });

  it('opens the popover on trigger click', async () => {
    const user = userEvent.setup();
    render(<ImagePicker images={images} onChange={vi.fn()} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /select image/i }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('calls onChange with the selected key and closes the popover', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<ImagePicker images={images} onChange={onChange} />);
    await user.click(screen.getByRole('button', { name: /select image/i }));
    await user.click(screen.getByRole('button', { name: /image b/i }));
    expect(onChange).toHaveBeenCalledWith('b');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders a label when label prop is provided', () => {
    render(<ImagePicker images={images} onChange={vi.fn()} label="Background" />);
    expect(screen.getByText('Background')).toBeInTheDocument();
  });

  it('renders label on left when labelPosition is left', () => {
    render(
      <ImagePicker
        images={images}
        onChange={vi.fn()}
        label="Background"
        labelPosition="left"
        labelWidth={80}
      />,
    );
    expect(screen.getByText('Background')).toBeInTheDocument();
  });
});
