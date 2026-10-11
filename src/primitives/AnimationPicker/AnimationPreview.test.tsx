import { render, screen, fireEvent } from '@testing-library/react';
import AnimationPreview from './AnimationPreview';

describe('AnimationPreview', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders without crashing', () => {
    const { container } = render(
      <AnimationPreview duration={500} timingFunction="ease" />,
    );
    expect(container.firstChild).toBeTruthy();
  });

  it('renders a replay button with aria-label="Replay preview"', () => {
    render(<AnimationPreview duration={500} timingFunction="ease" />);
    expect(screen.getByRole('button', { name: 'Replay preview' })).toBeTruthy();
  });

  it('clicking the replay button does not throw', () => {
    render(<AnimationPreview duration={500} timingFunction="ease" />);
    const replayButton = screen.getByRole('button', { name: 'Replay preview' });
    expect(() => fireEvent.click(replayButton)).not.toThrow();
  });

  it('renders with a short duration value (300ms)', () => {
    const { container } = render(
      <AnimationPreview duration={300} timingFunction="ease" />,
    );
    expect(container.firstChild).toBeTruthy();
  });

  it('renders with a long duration value (1000ms)', () => {
    const { container } = render(
      <AnimationPreview duration={1000} timingFunction="ease" />,
    );
    expect(container.firstChild).toBeTruthy();
  });

  it('renders with timingFunction="ease"', () => {
    const { container } = render(
      <AnimationPreview duration={500} timingFunction="ease" />,
    );
    expect(container.firstChild).toBeTruthy();
  });

  it('renders with timingFunction="linear"', () => {
    const { container } = render(
      <AnimationPreview duration={500} timingFunction="linear" />,
    );
    expect(container.firstChild).toBeTruthy();
  });

  it('renders with timingFunction="cubic-bezier(0.25, 0.1, 0.25, 1)"', () => {
    const { container } = render(
      <AnimationPreview duration={600} timingFunction="cubic-bezier(0.25, 0.1, 0.25, 1)" />,
    );
    expect(container.firstChild).toBeTruthy();
  });

  it('advancing fake timers past the setTimeout delay does not throw', () => {
    render(<AnimationPreview duration={500} timingFunction="ease" />);
    expect(() => vi.runAllTimers()).not.toThrow();
  });

  it('multiple replay clicks in succession do not throw', () => {
    render(<AnimationPreview duration={500} timingFunction="ease" />);
    const replayButton = screen.getByRole('button', { name: 'Replay preview' });
    expect(() => {
      fireEvent.click(replayButton);
      vi.runAllTimers();
      fireEvent.click(replayButton);
      vi.runAllTimers();
    }).not.toThrow();
  });
});
