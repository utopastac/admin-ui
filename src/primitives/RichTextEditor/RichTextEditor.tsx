import React, { useRef, useEffect, useState, useCallback } from 'react';
import RichTextToolbar from './RichTextToolbar';
import Popover from '../Popover';
import styles from './RichTextEditor.module.css';

export interface RichTextEditorProps {
  value?: string;
  onChange?: (output: string) => void;
  placeholder?: string;
  disabled?: boolean;
  minHeight?: string;
  outputFormat?: 'html' | 'markdown';
  popover?: boolean;
  className?: string;
  /** Optional content rendered between the toolbar and the editor area (e.g. placeholder tags). */
  actions?: React.ReactNode;
  offsetX?: number;
  offsetY?: number;
}

const BLOCK_TAGS = new Set(['P', 'H1', 'H2', 'H3', 'DIV', 'BLOCKQUOTE', 'PRE', 'LI']);

function getHeadingFromSelection(container: HTMLElement): string {
  const selection = document.getSelection();
  if (!selection || selection.rangeCount === 0) return 'p';

  let node: Node | null = selection.anchorNode;
  while (node && node !== container) {
    if (node.nodeType === Node.ELEMENT_NODE) {
      const tag = (node as HTMLElement).tagName;
      if (BLOCK_TAGS.has(tag)) {
        return tag.toLowerCase() === 'div' ? 'p' : tag.toLowerCase();
      }
    }
    node = node.parentElement;
  }
  return 'p';
}

function nodeToMarkdown(node: Node): string {
  if (node.nodeType === Node.TEXT_NODE) {
    return node.textContent ?? '';
  }
  if (node.nodeType !== Node.ELEMENT_NODE) return '';

  const el = node as HTMLElement;
  const tag = el.tagName.toLowerCase();
  const inner = Array.from(el.childNodes).map(nodeToMarkdown).join('');

  switch (tag) {
    case 'h1': return `# ${inner}\n\n`;
    case 'h2': return `## ${inner}\n\n`;
    case 'h3': return `### ${inner}\n\n`;
    case 'p': return inner ? `${inner}\n\n` : '';
    case 'strong':
    case 'b': return `**${inner}**`;
    case 'em':
    case 'i': return `*${inner}*`;
    case 'a': return `[${inner}](${el.getAttribute('href') ?? ''})`;
    case 'br': return '\n';
    case 'div': return inner ? `${inner}\n\n` : '';
    default: return inner;
  }
}

function htmlToMarkdown(html: string): string {
  const container = document.createElement('div');
  container.innerHTML = html;
  const raw = Array.from(container.childNodes).map(nodeToMarkdown).join('');
  // Collapse more than two consecutive newlines and trim trailing whitespace
  return raw.replace(/\n{3,}/g, '\n\n').trimEnd();
}

function toPreviewText(value: string): string {
  return value
    .replace(/<[^>]+>/g, '')
    .replace(/#{1,6}\s+/g, '')
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/\*(.+?)\*/g, '$1')
    .replace(/\[(.+?)\]\(.+?\)/g, '$1')
    .replace(/\n+/g, ' ')
    .trim();
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value = '',
  onChange,
  placeholder,
  disabled = false,
  minHeight = '160px',
  outputFormat = 'html',
  popover = false,
  className = '',
  actions,
  offsetX = 0,
  offsetY = 0,
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [boldActive, setBoldActive] = useState(false);
  const [italicActive, setItalicActive] = useState(false);
  const [currentHeading, setCurrentHeading] = useState('p');
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const isInternalChange = useRef(false);

  // Set initial HTML value — also re-sync when the popover remounts the editor
  useEffect(() => {
    if (editorRef.current && !isInternalChange.current) {
      editorRef.current.innerHTML = value;
    }
  }, [value, isPopoverOpen]);

  // Focus editor when popover opens
  useEffect(() => {
    if (isPopoverOpen) {
      requestAnimationFrame(() => editorRef.current?.focus());
    }
  }, [isPopoverOpen]);

  // Track active formatting state via selectionchange
  useEffect(() => {
    const editor = editorRef.current;
    if (!editor) return;

    const handleSelectionChange = () => {
      if (!editorRef.current) return;
      const selection = document.getSelection();
      if (!selection) return;
      const anchorNode = selection.anchorNode;
      if (anchorNode && editorRef.current.contains(anchorNode)) {
        setBoldActive(document.queryCommandState('bold'));
        setItalicActive(document.queryCommandState('italic'));
        setCurrentHeading(getHeadingFromSelection(editorRef.current));
      }
    };

    const addSelectionListener = () =>
      document.addEventListener('selectionchange', handleSelectionChange);
    const removeSelectionListener = () =>
      document.removeEventListener('selectionchange', handleSelectionChange);

    editor.addEventListener('focus', addSelectionListener);
    editor.addEventListener('blur', removeSelectionListener);

    return () => {
      editor.removeEventListener('focus', addSelectionListener);
      editor.removeEventListener('blur', removeSelectionListener);
      removeSelectionListener(); // clean up in case editor is focused when unmounting
    };
  }, []);

  const emitChange = useCallback((html: string) => {
    if (!onChange) return;
    onChange(outputFormat === 'markdown' ? htmlToMarkdown(html) : html);
  }, [onChange, outputFormat]);

  const handleInput = useCallback(() => {
    if (editorRef.current) {
      isInternalChange.current = true;
      emitChange(editorRef.current.innerHTML);
      requestAnimationFrame(() => {
        isInternalChange.current = false;
      });
    }
  }, [emitChange]);

  const handleBold = useCallback(() => {
    editorRef.current?.focus();
    document.execCommand('bold', false);
    setBoldActive(document.queryCommandState('bold'));
  }, []);

  const handleItalic = useCallback(() => {
    editorRef.current?.focus();
    document.execCommand('italic', false);
    setItalicActive(document.queryCommandState('italic'));
  }, []);

  const handleHeadingChange = useCallback((heading: string) => {
    editorRef.current?.focus();
    document.execCommand('formatBlock', false, heading);
    setCurrentHeading(heading);
  }, []);

  const handleLinkButtonClick = useCallback(() => {
    setShowLinkInput((prev) => !prev);
  }, []);

  const handleLinkSubmit = useCallback((url: string) => {
    editorRef.current?.focus();
    document.execCommand('createLink', false, url);
    setShowLinkInput(false);
    if (editorRef.current) {
      emitChange(editorRef.current.innerHTML);
    }
  }, [emitChange]);

  const handleLinkCancel = useCallback(() => {
    setShowLinkInput(false);
  }, []);

  const editor = (
    <div className={`${styles.wrapper} ${popover ? styles.wrapperPopover : ''} ${!popover ? className : ''}`}>
      <RichTextToolbar
        onBold={handleBold}
        onItalic={handleItalic}
        onHeadingChange={handleHeadingChange}
        onLinkSubmit={handleLinkSubmit}
        boldActive={boldActive}
        italicActive={italicActive}
        currentHeading={currentHeading}
        disabled={disabled}
        showLinkInput={showLinkInput}
        onLinkButtonClick={handleLinkButtonClick}
        onLinkCancel={handleLinkCancel}
      />
      {actions}
      <div
        ref={editorRef}
        className={`${styles.editor} ${disabled ? styles.editorDisabled : ''} ${popover ? styles.editorPopover : ''}`}
        contentEditable={disabled ? 'false' : 'true'}
        suppressContentEditableWarning
        onInput={handleInput}
        data-placeholder={placeholder}
        style={{ minHeight }}
        role="textbox"
        aria-multiline="true"
        aria-disabled={disabled}
      />
    </div>
  );

  if (!popover) {
    return editor;
  }

  const preview = toPreviewText(value);

  return (
    <div className={`${styles.popoverContainer} ${className}`}>
      <button
        ref={triggerRef}
        type="button"
        className={`${styles.popoverTrigger} ${isPopoverOpen ? styles.popoverTriggerOpen : ''}`}
        onClick={() => setIsPopoverOpen((prev) => !prev)}
        disabled={disabled}
      >
        <span className={preview ? styles.popoverPreview : styles.popoverPlaceholder}>
          {preview || placeholder || 'Edit…'}
        </span>
      </button>
      <Popover
        isOpen={isPopoverOpen}
        onClose={() => setIsPopoverOpen(false)}
        anchorRef={triggerRef}
        matchWidth
        overlap
        role="dialog"
        aria-label="Rich text editor"
        offsetX={offsetX}
        offsetY={offsetY}
      >
        {editor}
      </Popover>
    </div>
  );
};

export default RichTextEditor;
