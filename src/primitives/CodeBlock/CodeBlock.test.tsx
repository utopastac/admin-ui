import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CodeBlock from './CodeBlock';

describe('CodeBlock', () => {

  it('renders code content', () => {
    render(<CodeBlock>{'const x = 1;'}</CodeBlock>);
    expect(screen.getByText('const x = 1;')).toBeInTheDocument();
  });

  it('renders inside a pre > code structure', () => {
    const { container } = render(<CodeBlock>{'code'}</CodeBlock>);
    const pre = container.querySelector('pre');
    expect(pre).toBeInTheDocument();
    expect(pre?.querySelector('code')).toBeInTheDocument();
  });

  it('displays the language label when language is provided', () => {
    render(<CodeBlock language="javascript">{'const x = 1;'}</CodeBlock>);
    expect(screen.getByText('javascript')).toBeInTheDocument();
  });

  it('does not display a language label when language is not provided', () => {
    render(<CodeBlock>{'code'}</CodeBlock>);
    expect(screen.queryByText('javascript')).not.toBeInTheDocument();
  });

  it('renders a copy button with aria-label "Copy code"', () => {
    render(<CodeBlock>{'code'}</CodeBlock>);
    expect(screen.getByRole('button', { name: 'Copy code' })).toBeInTheDocument();
  });

  it('copies code to clipboard on copy button click', async () => {
    const user = userEvent.setup();
    const code = 'console.log("hello")';
    render(<CodeBlock>{code}</CodeBlock>);

    // Click the copy button - if clipboard.writeText succeeds, the component shows "Copied"
    await user.click(screen.getByRole('button', { name: 'Copy code' }));
    // The button's aria-label changes to "Copied" confirming writeText was called and resolved
    expect(screen.getByRole('button', { name: 'Copied' })).toBeInTheDocument();
  });

  it('shows "Copied" label after clicking copy', async () => {
    const user = userEvent.setup();
    render(<CodeBlock>{'code'}</CodeBlock>);

    await user.click(screen.getByRole('button', { name: 'Copy code' }));
    expect(screen.getByText('Copied!')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Copied' })).toBeInTheDocument();
  });

  it('renders line numbers when showLineNumbers is true', () => {
    render(<CodeBlock showLineNumbers>{'line1\nline2\nline3'}</CodeBlock>);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('does not render line numbers by default', () => {
    render(<CodeBlock>{'line1\nline2'}</CodeBlock>);
    // The text "1" and "2" should not appear as separate elements
    expect(screen.queryByText('1')).not.toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<CodeBlock className="custom">{'code'}</CodeBlock>);
    expect(container.firstChild).toHaveClass('custom');
  });
});
