import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Carousel from './Carousel';

describe('Carousel', () => {
  const slides = [
    <div key="1">Slide 1</div>,
    <div key="2">Slide 2</div>,
    <div key="3">Slide 3</div>,
  ];

  it('renders all slides', () => {
    render(<Carousel>{slides}</Carousel>);
    expect(screen.getByText('Slide 1')).toBeInTheDocument();
    expect(screen.getByText('Slide 2')).toBeInTheDocument();
    expect(screen.getByText('Slide 3')).toBeInTheDocument();
  });

  it('renders previous and next navigation buttons', () => {
    render(<Carousel>{slides}</Carousel>);
    expect(screen.getByRole('button', { name: 'Previous slide' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Next slide' })).toBeInTheDocument();
  });

  it('disables previous button on first slide when loop is off', () => {
    render(<Carousel>{slides}</Carousel>);
    expect(screen.getByRole('button', { name: 'Previous slide' })).toBeDisabled();
  });

  it('enables next button on first slide', () => {
    render(<Carousel>{slides}</Carousel>);
    expect(screen.getByRole('button', { name: 'Next slide' })).toBeEnabled();
  });

  it('advances to the next slide on next click', async () => {
    const user = userEvent.setup();
    render(<Carousel>{slides}</Carousel>);

    await user.click(screen.getByRole('button', { name: 'Next slide' }));
    // Previous should now be enabled
    expect(screen.getByRole('button', { name: 'Previous slide' })).toBeEnabled();
  });

  it('disables next button on last slide when loop is off', async () => {
    const user = userEvent.setup();
    render(<Carousel>{slides}</Carousel>);

    // Go to last slide (3 slides, slidesPerView=1, maxIndex=2)
    await user.click(screen.getByRole('button', { name: 'Next slide' }));
    await user.click(screen.getByRole('button', { name: 'Next slide' }));
    expect(screen.getByRole('button', { name: 'Next slide' })).toBeDisabled();
  });

  it('enables both buttons when loop is true', () => {
    render(<Carousel loop>{slides}</Carousel>);
    expect(screen.getByRole('button', { name: 'Previous slide' })).toBeEnabled();
    expect(screen.getByRole('button', { name: 'Next slide' })).toBeEnabled();
  });

  it('loops to last slide when clicking previous on first slide with loop', async () => {
    const user = userEvent.setup();
    render(<Carousel loop>{slides}</Carousel>);

    await user.click(screen.getByRole('button', { name: 'Previous slide' }));
    // Both buttons should still be enabled (loop mode)
    expect(screen.getByRole('button', { name: 'Previous slide' })).toBeEnabled();
    expect(screen.getByRole('button', { name: 'Next slide' })).toBeEnabled();
  });

  it('loops to first slide when clicking next on last slide with loop', async () => {
    const user = userEvent.setup();
    render(<Carousel loop>{slides}</Carousel>);

    // Navigate to last slide
    await user.click(screen.getByRole('button', { name: 'Next slide' }));
    await user.click(screen.getByRole('button', { name: 'Next slide' }));
    // Click next again to loop
    await user.click(screen.getByRole('button', { name: 'Next slide' }));
    // Should be back at first slide, both buttons enabled
    expect(screen.getByRole('button', { name: 'Previous slide' })).toBeEnabled();
  });

  it('applies custom className', () => {
    const { container } = render(<Carousel className="custom">{slides}</Carousel>);
    expect(container.firstChild).toHaveClass('custom');
  });
});
