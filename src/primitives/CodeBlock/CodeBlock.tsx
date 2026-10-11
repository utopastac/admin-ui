import React, { useState, useCallback, useMemo } from 'react';
import hljs from './highlightSetup';
import 'highlight.js/styles/github-dark.css';
import styles from './CodeBlock.module.css';

interface CodeBlockProps {
  children: string;
  language?: string;
  showLineNumbers?: boolean;
  className?: string;
}

const CopyIcon: React.FC = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="5.5" y="5.5" width="8" height="8" rx="1.5" />
    <path d="M10.5 5.5V3a1.5 1.5 0 0 0-1.5-1.5H3A1.5 1.5 0 0 0 1.5 3v6A1.5 1.5 0 0 0 3 10.5h2.5" />
  </svg>
);

const CheckIcon: React.FC = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 8.5l3.5 3.5L13 4" />
  </svg>
);

const CodeBlock: React.FC<CodeBlockProps> = ({
  children,
  language,
  showLineNumbers = false,
  className = '',
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(children).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [children]);

  const highlightedHtml = useMemo(() => {
    if (!language) return null;
    try {
      return hljs.highlight(children, { language }).value;
    } catch (err) {
      console.error('[CodeBlock] highlight.js failed for language:', language, err);
      return null;
    }
  }, [children, language]);

  const lines = highlightedHtml
    ? highlightedHtml.split('\n')
    : children.split('\n');

  const containerClass = [styles.container, className].filter(Boolean).join(' ');

  const hasHeader = !!language;

  return (
    <div className={containerClass}>
      {hasHeader && (
        <div className={styles.header}>
          <span className={styles.language}>{language}</span>
          <button
            className={`${styles.copyButton} ${copied ? styles.copied : ''}`}
            onClick={handleCopy}
            aria-label={copied ? 'Copied' : 'Copy code'}
            type="button"
          >
            {copied ? <CheckIcon /> : <CopyIcon />}
            <span className={styles.copyLabel}>{copied ? 'Copied!' : 'Copy'}</span>
          </button>
        </div>
      )}
      {!hasHeader && (
        <button
          className={`${styles.copyButton} ${styles.copyButtonFloating} ${copied ? styles.copied : ''}`}
          onClick={handleCopy}
          aria-label={copied ? 'Copied' : 'Copy code'}
          type="button"
        >
          {copied ? <CheckIcon /> : <CopyIcon />}
          <span className={styles.copyLabel}>{copied ? 'Copied!' : 'Copy'}</span>
        </button>
      )}
      <pre className={styles.pre}>
        {showLineNumbers ? (
          <code className={styles.code}>
            {lines.map((line, i) => (
              <span key={i} className={styles.line}>
                <span className={styles.lineNumber}>{i + 1}</span>
                {highlightedHtml ? (
                  <span
                    className={styles.lineContent}
                    dangerouslySetInnerHTML={{ __html: line }}
                  />
                ) : (
                  <span className={styles.lineContent}>{line}</span>
                )}
                {i < lines.length - 1 ? '\n' : ''}
              </span>
            ))}
          </code>
        ) : highlightedHtml ? (
          <code
            className={styles.code}
            dangerouslySetInnerHTML={{ __html: highlightedHtml }}
          />
        ) : (
          <code className={styles.code}>{children}</code>
        )}
      </pre>
    </div>
  );
};

export default CodeBlock;
