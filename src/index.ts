/* Admin UI — design tokens, primitives, overlays, and navigation components */

// Styles side-effect import (consumers use: import 'admin-ui/styles')
import './styles/index.css';

// Primitives
export { Avatar, AnimationPicker, Badge, Banner, Blockquote, Breadcrumb, BulletList, Button, ButtonGroup, Card, Carousel, Checkbox, Chip, CodeBlock, ColorPicker, CompactInput, DataGrid, DatePicker, Divider, EditableText, EmptyState, FieldGroup, FieldLabel, GlobalSearch, GradientPicker, ImagePicker, InlineSearch, Input, Kbd, LabeledField, NumberedList, PixelArtEditor, Popover, ProgressBar, ProgressCircular, Radio, RadioGroup, RichTextEditor, SegmentedControl, Select, SelectionList, ShadowEditor, Skeleton, Slider, Spinner, Table, Tabs, Text, Textarea, Timeline, TimePicker, Toggle, ToolbarButton, Command, CommandDialog } from './primitives';
export type { AnimationPickerProps, AnimationState, BannerProps, ChipProps, BreadcrumbItem, ColorPickerProps, DataGridProps, DataGridColumn, DatePickerProps, DividerProps, EditableTextProps, EmptyStateProps, FieldGroupProps, FieldLabelProps, GlobalSearchProps, GlobalSearchResultData, GradientPickerProps, GradientStop, GradientState, ImagePickerProps, ImageOption, PhoneShadow, PixelArtEditorProps, PixelArtTool, PopoverProps, ProgressBarProps, ProgressCircularProps, RadioProps, RadioGroupProps, RichTextEditorProps, SegmentedControlProps, SegmentedControlOption, SelectOption, SelectionListItem, ShadowEditorProps, ShadowPreset, SkeletonProps, SliderProps, SpinnerProps, TableColumn, TabItem, TextareaProps, TextVariant, TextColor, TimelineProps, TimelineItem, TimePickerProps, KbdProps, CommandItem, CommandGroup, CommandDialogProps } from './primitives';
export { parseCssGradient, serializeCssGradient } from './primitives';

// Overlays
export { AlertDialog, ContextMenu, Modal, SidePanel, Toast, ToastStack, Tooltip } from './overlays';
export type { ContextMenuItem, ToastProps, ToastStackProps, TooltipProps } from './overlays';

// Layout
export { DocPage, PageFooter, PageHeading, SectionHeading, AppLayout, Stack, Columns, CardGrid, LinkList, extractHeadings } from './layout';
export type { DocPageProps, SectionHeadingSize, AppLayoutProps, StackProps, ColumnsProps, CardGridProps, LinkListProps, LinkListSection, LinkListItem, SpaceScale } from './layout';

// Navigation
export { SideNav, TopNav, Pagination, PageContents } from './navigation';
export type {
  SideNavItemData,
  SideNavSectionData,
  SideNavTopLevelSectionData,
  SideNavTabData,
  SideNavTabConfig,
  TopNavSize,
  TopNavTabData,
  TopNavDropdownGroup,
  TopNavDropdownItem,
  PaginationVariant,
  PageContentsProps,
  PageContentsItem,
} from './navigation';
