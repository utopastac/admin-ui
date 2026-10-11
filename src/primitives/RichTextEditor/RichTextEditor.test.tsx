import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RichTextEditor from './RichTextEditor';

describe('RichTextEditor', () => {
  beforeEach(() => {
    // jsdom does not implement execCommand / queryCommandState — define them
    Object.defineProperty(document, 'execCommand', {
      configurable: true,
      writable: true,
      value: vi.fn().mockReturnValue(true),
    });
    Object.defineProperty(document, 'queryCommandState', {
      configurable: true,
      writable: true,
      value: vi.fn().mockReturnValue(false),
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders without crashing with no props', () => {
    render(<RichTextEditor />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('renders with a data-placeholder attribute on the editable area', () => {
    render(<RichTextEditor placeholder="Start typing..." />);
    const editor = screen.getByRole('textbox');
    expect(editor).toHaveAttribute('data-placeholder', 'Start typing...');
  });

  it('renders initial HTML value', () => {
    render(<RichTextEditor value="<p>Hello world</p>" />);
    const editor = screen.getByRole('textbox');
    expect(editor.innerHTML).toContain('Hello world');
  });

  it('calls onChange when content changes', () => {
    const handleChange = vi.fn();
    render(<RichTextEditor onChange={handleChange} />);
    const editor = screen.getByRole('textbox');
    fireEvent.input(editor, { target: { innerHTML: '<p>New content</p>' } });
    expect(handleChange).toHaveBeenCalled();
  });

  it('renders Bold toolbar button', () => {
    render(<RichTextEditor />);
    expect(screen.getByRole('button', { name: /bold/i })).toBeInTheDocument();
  });

  it('renders Italic toolbar button', () => {
    render(<RichTextEditor />);
    expect(screen.getByRole('button', { name: /italic/i })).toBeInTheDocument();
  });

  it('renders Insert link toolbar button', () => {
    render(<RichTextEditor />);
    expect(screen.getByRole('button', { name: /insert link/i })).toBeInTheDocument();
  });

  it('renders heading Select trigger with default Paragraph label', () => {
    render(<RichTextEditor />);
    // Select renders a <button> showing the current heading label
    expect(screen.getByRole('button', { name: /paragraph/i })).toBeInTheDocument();
  });

  it('opens heading dropdown and shows all heading options', async () => {
    const user = userEvent.setup();
    render(<RichTextEditor />);
    // Click the heading trigger (shows "Paragraph" as selected)
    await user.click(screen.getByRole('button', { name: /paragraph/i }));
    // Options are rendered inside a listbox with role="option"
    expect(screen.getByRole('option', { name: 'Heading 1' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Heading 2' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Heading 3' })).toBeInTheDocument();
  });

  it('clicking Insert link button shows the URL input', async () => {
    const user = userEvent.setup();
    render(<RichTextEditor />);
    expect(screen.queryByRole('textbox', { name: /link url/i })).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /insert link/i }));
    expect(screen.getByRole('textbox', { name: /link url/i })).toBeInTheDocument();
  });

  it('submitting the URL input calls execCommand', async () => {
    const user = userEvent.setup();
    render(<RichTextEditor />);
    await user.click(screen.getByRole('button', { name: /insert link/i }));
    const urlInput = screen.getByRole('textbox', { name: /link url/i });
    await user.type(urlInput, 'https://example.com');
    fireEvent.submit(urlInput.closest('form') ?? urlInput);
    expect(document.execCommand).toHaveBeenCalled();
  });

  it('cancelling the URL input hides it', async () => {
    const user = userEvent.setup();
    render(<RichTextEditor />);
    await user.click(screen.getByRole('button', { name: /insert link/i }));
    expect(screen.getByRole('textbox', { name: /link url/i })).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /cancel/i }));
    expect(screen.queryByRole('textbox', { name: /link url/i })).not.toBeInTheDocument();
  });

  it('sets contentEditable="false" on the editable area when disabled', () => {
    render(<RichTextEditor disabled />);
    const editor = screen.getByRole('textbox');
    expect(editor).toHaveAttribute('contenteditable', 'false');
  });

  it('editor wrapper contains both toolbar and editable area', () => {
    const { container } = render(<RichTextEditor />);
    const wrapper = container.firstChild as HTMLElement;
    const toolbar = wrapper.querySelector('[class*="toolbar"]');
    const editor = wrapper.querySelector('[role="textbox"]');
    expect(toolbar).toBeInTheDocument();
    expect(editor).toBeInTheDocument();
  });
});
