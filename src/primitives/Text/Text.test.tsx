import { render, screen } from '@testing-library/react';
import Text from './Text';

describe('Text', () => {
  it('renders children text content', () => {
    render(<Text variant="body-m">Hello World</Text>);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  it('renders as a span by default', () => {
    render(<Text variant="body-m">Content</Text>);
    expect(screen.getByText('Content').tagName).toBe('SPAN');
  });

  it('renders as the specified element tag', () => {
    render(
      <Text variant="heading-m" as="h2">
        Title
      </Text>,
    );
    expect(screen.getByText('Title').tagName).toBe('H2');
  });

  it('renders as a paragraph', () => {
    render(
      <Text variant="body-m" as="p">
        Paragraph
      </Text>,
    );
    expect(screen.getByText('Paragraph').tagName).toBe('P');
  });

  it('renders as a label', () => {
    render(
      <Text variant="body-s" as="label">
        Label text
      </Text>,
    );
    expect(screen.getByText('Label text').tagName).toBe('LABEL');
  });

  it('applies variant CSS class', () => {
    render(<Text variant="heading-xl">Heading</Text>);
    const element = screen.getByText('Heading');
    // The className should contain the mapped variant class
    expect(element.className).toBeTruthy();
  });

  it('applies color CSS class defaulting to primary', () => {
    render(<Text variant="body-m">Primary text</Text>);
    const element = screen.getByText('Primary text');
    expect(element.className).toBeTruthy();
  });

  it('applies custom color class', () => {
    render(
      <Text variant="body-m" color="secondary">
        Secondary text
      </Text>,
    );
    const element = screen.getByText('Secondary text');
    expect(element.className).toBeTruthy();
  });

  it('applies additional className', () => {
    render(
      <Text variant="body-m" className="extra-class">
        Styled
      </Text>,
    );
    expect(screen.getByText('Styled').className).toContain('extra-class');
  });

  it('supports all heading variants', () => {
    const variants = ['heading-xl', 'heading-l', 'heading-m', 'heading-s', 'heading-xs'] as const;
    variants.forEach((variant) => {
      const { unmount } = render(<Text variant={variant}>{variant}</Text>);
      expect(screen.getByText(variant)).toBeInTheDocument();
      unmount();
    });
  });

  it('supports all body variants', () => {
    const variants = ['body-m', 'body-s', 'body-xs', 'body-m-strong', 'body-s-strong', 'body-xs-strong'] as const;
    variants.forEach((variant) => {
      const { unmount } = render(<Text variant={variant}>{variant}</Text>);
      expect(screen.getByText(variant)).toBeInTheDocument();
      unmount();
    });
  });

  it('supports the overline variant', () => {
    render(<Text variant="overline">OVERLINE</Text>);
    expect(screen.getByText('OVERLINE')).toBeInTheDocument();
  });

  it('supports all color values', () => {
    const colors = ['primary', 'secondary', 'subtle', 'highlight', 'warning', 'inverted-primary'] as const;
    colors.forEach((color) => {
      const { unmount } = render(
        <Text variant="body-m" color={color}>
          {color}
        </Text>,
      );
      expect(screen.getByText(color)).toBeInTheDocument();
      unmount();
    });
  });
});
