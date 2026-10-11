import React from 'react';
import { Bold, Italic, Link } from 'lucide-react';
import ToolbarButton from '../ToolbarButton';
import Select from '../Select';
import RichTextLinkInput from './RichTextLinkInput';
import styles from './RichTextToolbar.module.css';

const HEADING_OPTIONS = [
  { value: 'p', label: 'Paragraph' },
  { value: 'h1', label: 'Heading 1' },
  { value: 'h2', label: 'Heading 2' },
  { value: 'h3', label: 'Heading 3' },
];

interface RichTextToolbarProps {
  onBold: () => void;
  onItalic: () => void;
  onHeadingChange: (value: string) => void;
  onLinkSubmit: (url: string) => void;
  boldActive: boolean;
  italicActive: boolean;
  currentHeading: string;
  disabled?: boolean;
  showLinkInput: boolean;
  onLinkButtonClick: () => void;
  onLinkCancel: () => void;
}

const RichTextToolbar: React.FC<RichTextToolbarProps> = ({
  onBold,
  onItalic,
  onHeadingChange,
  onLinkSubmit,
  boldActive,
  italicActive,
  currentHeading,
  disabled,
  showLinkInput,
  onLinkButtonClick,
  onLinkCancel,
}) => {
  return (
    <div className={`${styles.toolbar} ${disabled ? styles.disabled : ''}`}>
      <Select
        options={HEADING_OPTIONS}
        value={currentHeading}
        onChange={onHeadingChange}
        disabled={disabled}
        size="sm"
        className={styles.headingSelect}
      />
      <ToolbarButton
        icon={Bold}
        onClick={onBold}
        size="sm"
        pressed={boldActive}
        aria-label="Bold"
        title="Bold"
      />
      <ToolbarButton
        icon={Italic}
        onClick={onItalic}
        size="sm"
        pressed={italicActive}
        aria-label="Italic"
        title="Italic"
      />
      <ToolbarButton
        icon={Link}
        onClick={onLinkButtonClick}
        size="sm"
        pressed={showLinkInput}
        aria-label="Insert link"
        title="Insert link"
      />
      {showLinkInput && (
        <RichTextLinkInput onSubmit={onLinkSubmit} onCancel={onLinkCancel} />
      )}
    </div>
  );
};

export default RichTextToolbar;
