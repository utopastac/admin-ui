import { default as default_2 } from 'react';
import { JSX as JSX_2 } from 'react/jsx-runtime';
import { LucideIcon } from 'lucide-react';

/** Matches the `@mixin mobile` / `--admin-breakpoint-md` (768px) boundary. */
export declare const ADMIN_MOBILE_QUERY = "(max-width: 767px)";

export declare const AlertDialog: default_2.FC<AlertDialogProps>;

declare interface AlertDialogProps {
    isOpen: boolean;
    onConfirm: () => void;
    onCancel: () => void;
    title: string;
    description: string;
    confirmLabel?: string;
    cancelLabel?: string;
    variant?: 'default' | 'destructive';
}

export declare const AnimationPicker: default_2.FC<AnimationPickerProps>;

export declare interface AnimationPickerProps {
    value?: string;
    onChange: (value: string) => void;
    onChangeState?: (state: AnimationState) => void;
    inline?: boolean;
    label?: string;
    labelPosition?: 'top' | 'left';
    labelWidth?: number | string;
    id?: string;
    offsetX?: number;
    offsetY?: number;
}

export declare interface AnimationState {
    duration: number;
    easing: 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'ios' | 'custom';
    bezier: [number, number, number, number];
}

export declare const AppLayout: default_2.FC<AppLayoutProps>;

export declare interface AppLayoutProps {
    topNav: default_2.ReactNode;
    children: default_2.ReactNode;
    sideNav?: default_2.ReactNode;
    /** Fixed width for the side nav column. Accepts any CSS width value (e.g. 240, '240px', '16rem'). */
    sideNavWidth?: number | string;
    panel?: default_2.ReactNode;
    /**
     * Controlled open state for the mobile side-nav drawer.
     * Only used at mobile widths; ignored on desktop.
     */
    mobileNavOpen?: boolean;
    /** Called when the mobile side-nav drawer should open or close. */
    onMobileNavOpenChange?: (open: boolean) => void;
    className?: string;
}

export declare const Avatar: default_2.FC<AvatarProps>;

declare interface AvatarProps {
    src?: string;
    name: string;
    size?: 'xs' | 'xl' | SizeSmMdLg;
    className?: string;
}

export declare const Badge: default_2.FC<BadgeProps>;

declare interface BadgeProps {
    variant?: 'default' | 'success' | 'warning' | 'info';
    size?: SizeSmMd;
    children: default_2.ReactNode;
    className?: string;
}

export declare function Banner({ variant, message, title, icon: Icon, dismissible, onDismiss, layout, className, }: BannerProps): JSX_2.Element | null;

export declare interface BannerProps {
    variant: 'default' | 'info' | 'success' | 'warning' | 'error';
    message: string;
    title?: string;
    icon?: LucideIcon;
    dismissible?: boolean;
    onDismiss?: () => void;
    layout?: 'inline' | 'full';
    className?: string;
}

export declare const Blockquote: default_2.FC<BlockquoteProps>;

declare interface BlockquoteProps {
    children: default_2.ReactNode;
    cite?: string;
    className?: string;
}

export declare const Breadcrumb: default_2.FC<BreadcrumbProps>;

export declare interface BreadcrumbItem {
    label: string;
    href?: string;
    onClick?: () => void;
}

declare interface BreadcrumbProps {
    items: BreadcrumbItem[];
    separator?: default_2.ReactNode;
    className?: string;
}

export declare const BulletList: default_2.FC<BulletListProps>;

declare interface BulletListProps {
    items: string[];
    size?: 'sm' | 'md';
    className?: string;
}

export declare const Button: default_2.FC<ButtonProps>;

export declare const ButtonGroup: default_2.FC<ButtonGroupProps>;

declare interface ButtonGroupProps {
    children: default_2.ReactNode;
    align?: 'start' | 'center' | 'end';
    className?: string;
    /**
     * Describes the group's purpose, e.g. 'Text formatting'.
     * Useful when multiple button groups appear on the same page.
     */
    'aria-label'?: string;
}

declare interface ButtonProps {
    variant?: 'primary' | 'secondary' | 'ghost';
    size?: SizeSmMdLg;
    disabled?: boolean;
    children: default_2.ReactNode;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    className?: string;
    'aria-label'?: string;
    tooltip?: TooltipConfig;
    startIcon?: IconComponent;
    endIcon?: IconComponent;
}

export declare const Card: default_2.FC<CardProps>;

/**
 * A responsive auto-fill card grid.
 *
 * Arranges children in as many columns as fit at ≥ 260 px each,
 * collapsing to fewer columns on narrower containers.
 */
export declare function CardGrid({ gap, className, style, children, ...rest }: CardGridProps): JSX_2.Element;

export declare interface CardGridProps extends default_2.HTMLAttributes<HTMLDivElement> {
    /** Space between cards. Defaults to `m`. */
    gap?: SpaceScale;
}

declare interface CardProps {
    children: default_2.ReactNode;
    active?: boolean;
    hoverable?: boolean;
    onClick?: () => void;
    className?: string;
}

export declare const Carousel: default_2.FC<CarouselProps>;

declare interface CarouselProps {
    children: default_2.ReactNode;
    slidesPerView?: number;
    gap?: number;
    loop?: boolean;
    className?: string;
}

export declare const Checkbox: default_2.FC<CheckboxProps>;

declare interface CheckboxProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    label?: string;
    disabled?: boolean;
    inputPosition?: 'left' | 'right';
    className?: string;
    id?: string;
    /** Use when there is no visible label text */
    'aria-label'?: string;
}

export declare const Chip: default_2.FC<ChipProps>;

export declare interface ChipProps {
    variant?: 'default' | 'success' | 'warning' | 'info' | 'error';
    icon?: default_2.ReactNode;
    avatar?: {
        src?: string;
        name: string;
    };
    onRemove?: () => void;
    selected?: boolean;
    onSelect?: () => void;
    children: default_2.ReactNode;
    className?: string;
}

export declare const CodeBlock: default_2.FC<CodeBlockProps>;

declare interface CodeBlockProps {
    children: string;
    language?: string;
    showLineNumbers?: boolean;
    className?: string;
}

export declare const ColorPicker: default_2.FC<ColorPickerProps>;

export declare interface ColorPickerProps {
    value: string;
    onChange: (value: string) => void;
    opacity?: number;
    onOpacityChange?: (opacity: number) => void;
    label?: string;
    labelPosition?: 'top' | 'left';
    labelWidth?: number | string;
    error?: string;
    helperText?: string;
    disabled?: boolean;
    id?: string;
    swatches?: string[];
    showHex?: boolean;
    offsetX?: number;
    offsetY?: number;
    /** Controlled open state. If provided, the component does not manage its own open/close. */
    isOpen?: boolean;
    /** Called when the popover should open or close in controlled mode. */
    onOpenChange?: (open: boolean) => void;
}

export declare function Columns({ count, gap, className, style, children, ...rest }: ColumnsProps): JSX_2.Element;

export declare interface ColumnsProps extends default_2.HTMLAttributes<HTMLDivElement> {
    count?: 2 | 3 | 4;
    gap?: SpaceScale;
}

export declare const Command: default_2.ForwardRefExoticComponent<CommandProps & default_2.RefAttributes<CommandHandle>>;

export declare function CommandDialog({ open, onClose, onOpen, shortcut, groups, placeholder, emptyMessage, header, }: CommandDialogProps): default_2.ReactPortal | null;

export declare interface CommandDialogProps {
    open: boolean;
    onClose: () => void;
    onOpen?: () => void;
    shortcut?: string;
    groups: CommandGroup[];
    placeholder?: string;
    emptyMessage?: string;
    header?: default_2.ReactNode;
}

export declare interface CommandGroup {
    label?: string;
    items: CommandItem[];
    /** When true, items in this group are hidden when the search query is empty. */
    searchOnly?: boolean;
}

declare interface CommandHandle {
    focus: () => void;
}

export declare interface CommandItem {
    id: string;
    label: string;
    icon?: default_2.ComponentType<{
        size?: number;
    }>;
    shortcut?: string;
    onSelect: () => void;
    disabled?: boolean;
}

declare interface CommandProps {
    groups: CommandGroup[];
    placeholder?: string;
    emptyMessage?: string;
    onClose?: () => void;
    className?: string;
    /** Optional content rendered between the search input and the results list. */
    header?: default_2.ReactNode;
}

export declare const CompactInput: default_2.FC<CompactInputProps>;

/**
 * A compact inline input for property panel and inspector UIs — think Figma's dimension
 * fields or a CSS value editor. It is not a form input: the error state is a boolean
 * border highlight only, with no error message. For form inputs with validation messages
 * and helper text, use `Input` instead.
 */
declare interface CompactInputProps {
    prefix: string;
    prefixSlot?: default_2.ReactNode;
    label?: string;
    labelPosition?: 'top' | 'left';
    type?: string;
    value: string;
    onChange: (value: string) => void;
    error?: boolean;
    min?: number;
    max?: number;
    step?: number;
    scrub?: boolean;
    labelWidth?: number | string;
    onBlur?: () => void;
    id?: string;
    className?: string;
    placeholder?: string;
    width?: number | string;
}

export declare const ContextMenu: default_2.FC<ContextMenuProps>;

export declare interface ContextMenuItem {
    label: string;
    onClick?: () => void;
    shortcut?: string;
    icon?: LucideIcon;
    variant?: 'default' | 'destructive';
    disabled?: boolean;
    separator?: boolean;
}

declare interface ContextMenuProps {
    /** Wrap children to intercept right-click. Omit to use controlled mode. */
    children?: default_2.ReactNode;
    items: ContextMenuItem[];
    className?: string;
    /** Controlled mode: whether the menu is open. */
    open?: boolean;
    /** Controlled mode: position of the menu. */
    position?: {
        x: number;
        y: number;
    };
    /** Controlled mode: called when the menu should close. */
    onClose?: () => void;
}

export declare function DataGrid<T extends Record<string, unknown>>({ columns, data, rowKey, selectable, selectedRows: controlledSelectedRows, onSelectionChange, onRowClick, sortColumn: controlledSortColumn, sortDirection: controlledSortDirection, onSortChange, striped, compact, emptyMessage, className, caption, }: DataGridProps<T>): JSX_2.Element;

export declare interface DataGridColumn<T> {
    key: string;
    header: string;
    width?: string;
    sortable?: boolean;
    render?: (value: unknown, row: T) => default_2.ReactNode;
}

export declare interface DataGridProps<T extends Record<string, unknown>> {
    columns: DataGridColumn<T>[];
    data: T[];
    rowKey: string | ((row: T) => string);
    selectable?: boolean;
    selectedRows?: string[];
    onSelectionChange?: (keys: string[]) => void;
    onRowClick?: (row: T) => void;
    sortColumn?: string;
    sortDirection?: 'asc' | 'desc';
    onSortChange?: (column: string, direction: 'asc' | 'desc') => void;
    striped?: boolean;
    compact?: boolean;
    emptyMessage?: string;
    className?: string;
    caption?: string;
}

export declare const DatePicker: default_2.FC<DatePickerProps>;

export declare interface DatePickerProps {
    mode?: 'single' | 'range';
    value: string | [string, string];
    onChange: (value: string | [string, string]) => void;
    min?: string;
    max?: string;
    label?: string;
    error?: string;
    helperText?: string;
    disabled?: boolean;
    id?: string;
    /** When true, the picker closes automatically after a selection is made. Default: false. */
    autoClose?: boolean;
}

export declare const Divider: default_2.FC<DividerProps>;

export declare interface DividerProps {
    orientation?: 'horizontal' | 'vertical';
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

export declare function DocPage({ content, centered, maxWidth, className }: DocPageProps): JSX_2.Element;

export declare interface DocPageProps {
    content: string;
    centered?: boolean;
    maxWidth?: number | string;
    className?: string;
}

/**
 * EditableText renders a label that swaps to an input on double-click or Enter.
 *
 * The display `<span>` and edit `<input>` share a single `.field` class so
 * typography, padding, border, and height stay identical across the swap.
 *
 * ```tsx
 * <EditableText value={name} onChange={setName} size="md" />
 * ```
 */
export declare const EditableText: default_2.FC<EditableTextProps>;

export declare interface EditableTextProps {
    value: string;
    onChange: (value: string) => void;
    size?: 's' | 'sm' | 'small' | 'm' | 'md' | 'medium' | 'l' | 'lg' | 'large';
    disabled?: boolean;
    placeholder?: string;
    ariaLabel?: string;
    className?: string;
    onEditStart?: () => void;
    onEditEnd?: (reason: 'commit' | 'cancel') => void;
    onCancel?: () => void;
}

declare type ElementTag = 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'label' | 'div' | 'li';

export declare const EmptyState: default_2.FC<EmptyStateProps>;

export declare interface EmptyStateProps {
    illustration?: default_2.ReactNode;
    title: string;
    description?: string;
    className?: string;
    children?: default_2.ReactNode;
}

export declare function extractHeadings(content: string): PageContentsItem[];

export declare const FieldGroup: default_2.FC<FieldGroupProps>;

export declare interface FieldGroupProps {
    label?: string;
    htmlFor?: string;
    error?: string;
    helperText?: string;
    disabled?: boolean;
    children: default_2.ReactNode;
    className?: string;
    errorId?: string;
    helperId?: string;
}

export declare const FieldLabel: default_2.FC<FieldLabelProps>;

export declare interface FieldLabelProps {
    label: string;
    size?: 'sm' | 'lg';
    labelPosition?: 'top' | 'left';
    labelWidth?: number | string;
    htmlFor?: string;
    disabled?: boolean;
    children: default_2.ReactNode;
    className?: string;
}

export declare const GlobalSearch: default_2.FC<GlobalSearchProps>;

export declare interface GlobalSearchProps {
    query: string;
    onQueryChange: (query: string) => void;
    results: GlobalSearchResultData[];
    onSelect: (id: string) => void;
    loading?: boolean;
    placeholder?: string;
    emptyMessage?: string;
    renderResult?: (result: GlobalSearchResultData) => default_2.ReactNode;
    shortcut?: boolean;
    className?: string;
}

export declare interface GlobalSearchResultData {
    id: string;
    title: default_2.ReactNode;
    description?: default_2.ReactNode;
    icon?: default_2.ReactNode;
}

export declare const GradientPicker: default_2.FC<GradientPickerProps>;

export declare interface GradientPickerProps {
    /** A CSS gradient string, e.g. 'linear-gradient(90deg, #d9d9d9 0%, #737373 100%)' */
    value: string;
    onChange: (value: string) => void;
    /**
     * When false (default), renders a gradient strip trigger that opens the picker
     * in a popover — like ColorPicker. When true, renders the picker panel directly.
     */
    inline?: boolean;
    label?: string;
    labelPosition?: 'top' | 'left';
    labelWidth?: number | string;
    id?: string;
    offsetX?: number;
    offsetY?: number;
}

export declare interface GradientState {
    type: 'linear' | 'radial';
    /** Degrees, only used for linear. */
    angle: number;
    stops: GradientStop[];
}

export declare interface GradientStop {
    id: string;
    /** Hex color string, e.g. '#d9d9d9' */
    color: string;
    /** 0–100 */
    position: number;
    /** 0–1 */
    opacity: number;
}

declare type IconComponent = LucideIcon | default_2.ComponentType<{
    size?: number;
}>;

export declare interface ImageOption {
    key: string;
    src: string;
    label: string;
}

export declare const ImagePicker: default_2.FC<ImagePickerProps>;

export declare interface ImagePickerProps {
    value?: string;
    onChange: (key: string) => void;
    images: ImageOption[];
    label?: string;
    labelPosition?: 'top' | 'left';
    labelWidth?: number | string;
    id?: string;
}

export declare const InlineSearch: default_2.FC<InlineSearchProps>;

declare interface InlineSearchProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    icon?: 'search' | 'filter';
    clearable?: boolean;
    id?: string;
    className?: string;
    onBlur?: () => void;
}

export declare const Input: default_2.FC<InputProps>;

declare interface InputProps {
    type?: string;
    value: string;
    onChange: (value: string) => void;
    label?: string;
    error?: string;
    helperText?: string;
    min?: number;
    max?: number;
    step?: number;
    id?: string;
    placeholder?: string;
    /** Short label rendered inside the input's leading edge (e.g. "$", "https://"). */
    prefix?: string;
    /** Replaces the prefix text with a custom node (e.g. an icon). */
    prefixSlot?: default_2.ReactNode;
    onBlur?: () => void;
    className?: string;
}

export declare function Kbd({ children, className, ...rest }: KbdProps): JSX_2.Element;

export declare interface KbdProps extends default_2.HTMLAttributes<HTMLElement> {
    children: default_2.ReactNode;
}

export declare const LabeledField: default_2.FC<LabeledFieldProps>;

declare interface LabeledFieldProps {
    label?: string;
    labelPosition?: 'top' | 'left';
    labelWidth?: number | string;
    htmlFor?: string;
    disabled?: boolean;
    error?: string;
    helperText?: string;
    children: default_2.ReactNode;
}

/**
 * Renders groups of items as inline clickable links separated by `/`.
 *
 * Each section can have an optional header and description. Sections are
 * visually separated by a top border. Commonly used for catalog index pages
 * that list components or topics by category.
 */
export declare function LinkList({ sections, bare, className, ...rest }: LinkListProps): JSX_2.Element;

export declare interface LinkListItem {
    /** Unique identifier for the item. */
    id: string;
    /** Display label for the link. */
    label: string;
    /** Called when the item is clicked. */
    onClick?: () => void;
}

export declare interface LinkListProps extends default_2.HTMLAttributes<HTMLDivElement> {
    /** Sections of grouped links. */
    sections: LinkListSection[];
    /** Remove section borders and vertical padding. */
    bare?: boolean;
}

export declare interface LinkListSection {
    /** Optional heading rendered above the items. */
    header?: string;
    /** Optional description rendered below the header. */
    description?: string;
    /** The items to render as inline links. */
    items: LinkListItem[];
}

export declare const Modal: default_2.FC<ModalProps>;

declare interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: default_2.ReactNode;
    title?: string;
    footer?: default_2.ReactNode;
    headerBorder?: boolean;
    footerBorder?: boolean;
    maxWidth?: 'sm' | 'md' | 'lg' | 'full' | 's' | 'm' | 'l' | 'small' | 'medium' | 'large';
}

export declare const NumberedList: default_2.FC<NumberedListProps>;

declare interface NumberedListProps {
    items: string[];
    size?: 'sm' | 'md';
    start?: number;
    className?: string;
}

export declare const PageContents: default_2.FC<PageContentsProps>;

export declare interface PageContentsItem {
    label: string;
    href: string;
    children?: PageContentsItem[];
}

export declare interface PageContentsProps {
    items: PageContentsItem[];
    /** Optional heading rendered above the links, e.g. "On this page" */
    label?: string;
    /** Truncate long link labels with an ellipsis instead of wrapping. */
    truncate?: boolean;
}

export declare const PageFooter: default_2.FC<PageFooterProps>;

declare interface PageFooterProps {
    children: default_2.ReactNode;
    align?: 'left' | 'center' | 'right';
    border?: boolean;
    className?: string;
}

export declare const PageHeading: default_2.FC<PageHeadingProps>;

declare interface PageHeadingProps {
    title: string;
    description?: string;
    actions?: default_2.ReactNode;
    className?: string;
}

/**
 * A pagination control supporting three display variants:
 *
 * - **buttons** — Previous/Next arrows with a "Page X of Y" label.
 * - **numbered** — Previous/Next arrows with clickable page number buttons
 *   and ellipsis when the page count exceeds 7.
 * - **dots** — Previous/Next arrows with a row of clickable dot indicators.
 *
 * This component is fully controlled — active page and navigation are
 * managed by the consumer via props.
 *
 * @example
 * ```tsx
 * <Pagination
 *   currentPage={3}
 *   totalPages={10}
 *   onPageChange={(page) => setPage(page)}
 *   variant="numbered"
 * />
 * ```
 */
export declare const Pagination: default_2.FC<PaginationProps>;

declare interface PaginationProps {
    /** The current active page (1-based). */
    currentPage: number;
    /** Total number of pages. */
    totalPages: number;
    /** Called when a page is selected. */
    onPageChange: (page: number) => void;
    /** Display mode. Defaults to 'numbered'. */
    variant?: PaginationVariant;
    className?: string;
}

export declare type PaginationVariant = 'buttons' | 'numbered' | 'dots';

export declare function parseCssGradient(css: string): GradientState;

export declare interface PhoneShadow {
    bezelWidth: number;
    bezelColor: string;
    offsetX: number;
    offsetY: number;
    blur: number;
    spread: number;
    shadowColor: string;
    shadowOpacity: number;
}

export declare const PixelArtEditor: default_2.FC<PixelArtEditorProps>;

export declare interface PixelArtEditorProps {
    /** Logical canvas width in pixels (number of columns) */
    width: number;
    /** Logical canvas height in pixels (number of rows) */
    height: number;
    /** Current SVG string value */
    value?: string;
    /** Called with full SVG string on every edit */
    onChange?: (svg: string) => void;
    /** Colour swatches shown in toolbar */
    palette?: string[];
    /** If true, renders as a popover trigger instead of inline */
    popover?: boolean;
    /** Width in px for the popover editor panel */
    popoverWidth?: number;
    /** Height in px for the popover trigger preview image (width scales proportionally) */
    triggerHeight?: number;
    disabled?: boolean;
    className?: string;
    offsetX?: number;
    offsetY?: number;
    /** If true, opens the popover immediately on mount */
    defaultOpen?: boolean;
    /** Integer scale factor applied when exporting to PNG. Each logical pixel becomes
     *  `pngExportScale` × `pngExportScale` raster pixels. Defaults to 8. */
    pngExportScale?: number;
    /** Optional list of preset square grid sizes. When provided, a picker button is
     *  rendered in the toolbar; selecting a size resizes the grid to `size × size`
     *  and clears the canvas. The component manages its own size after mount when
     *  this prop is set — `width` seeds the initial size and `height` is ignored.
     *  When omitted, the picker is hidden and `width`/`height` props remain the
     *  source of truth. */
    sizes?: number[];
    /** Fired when the grid size changes via the picker. Consumers that want to
     *  persist the size can observe this callback. */
    onSizeChange?: (width: number, height: number) => void;
}

export declare type PixelArtTool = 'paint' | 'eraser' | 'fill' | 'eyedropper' | 'line' | 'rect' | 'circle' | 'triangle' | 'star' | 'pen' | 'marquee';

export declare const Popover: default_2.FC<PopoverProps>;

export declare interface PopoverProps {
    isOpen: boolean;
    onClose: () => void;
    anchorRef: default_2.RefObject<HTMLElement | null>;
    children: default_2.ReactNode;
    className?: string;
    matchWidth?: boolean;
    overlap?: boolean;
    offsetX?: number;
    offsetY?: number;
    role?: string;
    'aria-label'?: string;
}

export declare const ProgressBar: default_2.FC<ProgressBarProps>;

export declare interface ProgressBarProps {
    value: number;
    variant?: 'default' | 'success' | 'error' | 'warning';
    size?: 'xs' | 'sm' | 'md';
    label?: string;
    showValue?: boolean;
    className?: string;
}

export declare const ProgressCircular: default_2.FC<ProgressCircularProps>;

export declare interface ProgressCircularProps {
    value: number;
    variant?: 'default' | 'success' | 'error' | 'warning';
    size?: 'sm' | 'md' | 'lg';
    label?: string;
    showValue?: boolean;
    className?: string;
}

export declare const Radio: default_2.FC<RadioProps>;

export declare const RadioGroup: default_2.FC<RadioGroupProps>;

export declare interface RadioGroupProps {
    value: string;
    onChange: (value: string) => void;
    options: {
        value: string;
        label: string;
        disabled?: boolean;
    }[];
    name?: string;
    disabled?: boolean;
    direction?: 'vertical' | 'horizontal';
    inputPosition?: 'left' | 'right';
    className?: string;
}

export declare interface RadioProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    label?: string;
    disabled?: boolean;
    inputPosition?: 'left' | 'right';
    className?: string;
    id?: string;
    name?: string;
    value?: string;
    /** Use when there is no visible label text */
    'aria-label'?: string;
}

export declare const RichTextEditor: default_2.FC<RichTextEditorProps>;

export declare interface RichTextEditorProps {
    value?: string;
    onChange?: (output: string) => void;
    placeholder?: string;
    disabled?: boolean;
    minHeight?: string;
    outputFormat?: 'html' | 'markdown';
    popover?: boolean;
    className?: string;
    /** Optional content rendered between the toolbar and the editor area (e.g. placeholder tags). */
    actions?: default_2.ReactNode;
    offsetX?: number;
    offsetY?: number;
}

export declare const SectionHeading: default_2.FC<SectionHeadingProps>;

declare interface SectionHeadingProps {
    title: string;
    description?: string;
    size?: SectionHeadingSize;
    actions?: default_2.ReactNode;
    className?: string;
}

export declare type SectionHeadingSize = SizeSmMdLg;

export declare function SegmentedControl<T extends string | number = string>({ options, value, onChange, size, disabled, className, }: SegmentedControlProps<T>): JSX.Element;

export declare interface SegmentedControlOption<T extends string | number = string> {
    value: T;
    label?: default_2.ReactNode;
    icon?: LucideIcon;
    ariaLabel?: string;
    disabled?: boolean;
    pin?: 'left' | 'right';
    tooltip?: TooltipConfig_2;
}

export declare interface SegmentedControlProps<T extends string | number = string> {
    options: SegmentedControlOption<T>[];
    value: T;
    onChange: (value: T) => void;
    size?: 'sm' | 'md';
    disabled?: boolean;
    className?: string;
}

export declare const Select: default_2.FC<SelectProps>;

export declare const SelectionList: default_2.FC<SelectionListProps>;

export declare interface SelectionListItem {
    value: string;
    label: string;
    description?: string;
}

declare interface SelectionListProps {
    items: SelectionListItem[];
    value?: string;
    onChange?: (value: string) => void;
    columns?: 1 | 2 | 3;
    className?: string;
    'aria-label'?: string;
}

export declare interface SelectOption {
    value: string;
    label: string;
    description?: string;
    disabled?: boolean;
    start?: default_2.ReactNode;
}

declare interface SelectProps {
    options: SelectOption[];
    value?: string;
    onChange: (value: string) => void;
    placeholder?: string;
    disabled?: boolean;
    size?: SizeSmMd;
    className?: string;
    label?: string;
    labelPosition?: 'top' | 'left';
    labelWidth?: number | string;
    error?: string;
    helperText?: string;
    id?: string;
}

export declare function serializeCssGradient(state: GradientState): string;

export declare const ShadowEditor: default_2.FC<ShadowEditorProps>;

export declare interface ShadowEditorProps {
    value: PhoneShadow;
    onChange: (partial: Partial<PhoneShadow>) => void;
    label?: string;
    labelPosition?: 'top' | 'left';
    labelWidth?: number | string;
    /** Whether to show the Bezel section in the popover. Defaults to true. */
    showBezel?: boolean;
    /** Preset shadow swatches shown at the bottom of the popover. */
    shadowPresets?: ShadowPreset[];
    /** Called when a preset swatch is clicked with its structured values. */
    onPresetSelect?: (value: Partial<PhoneShadow>) => void;
    offsetX?: number;
    offsetY?: number;
}

export declare interface ShadowPreset {
    label: string;
    value: Partial<PhoneShadow>;
}

export declare const SideNav: default_2.FC<SideNavProps>;

export declare interface SideNavItemData {
    /** Unique identifier for the item, used for active state and onSelect callback. */
    id: string;
    /** Display label shown in the sidebar. */
    label: string;
    /** Optional right-aligned detail text (e.g. a date). When present, the item stretches to full width. */
    detail?: string;
    /** Optional nested children rendered as an indented sub-list. */
    children?: SideNavItemData[];
    /** When true, renders a small colored dot after the label to indicate new or recently updated content. */
    badge?: boolean;
    /** Optional fixed-width index number rendered before the label (intended for child items). */
    index?: number;
    /** Called when the item is right-clicked. Receives the item's id and the mouse event. */
    onContextMenu?: (id: string, e: default_2.MouseEvent) => void;
}

declare interface SideNavProps {
    /**
     * Grouped navigation items. Each section has an optional label and a list
     * of items. Sections render in array order.
     */
    sections: SideNavSectionData[];
    /**
     * Optional top-level accordion sections that sit above the nav content.
     * When provided, these render as collapsible groups; each contains
     * sections. When absent or empty, only `sections` are shown.
     */
    topLevelSections?: SideNavTopLevelSectionData[];
    /** The id of the currently active/selected item. */
    activeId?: string;
    /** Called when any navigation item is clicked. Receives the item's id. */
    onSelect: (id: string) => void;
    /** Show a search input to filter items. */
    searchable?: boolean;
    /** Placeholder text for the search input. */
    searchPlaceholder?: string;
    /** Icon style for the search input. 'search' shows a magnifying glass, 'filter' shows a filter funnel. */
    searchIconType?: 'search' | 'filter';
    /** Optional content fixed to the bottom of the side nav, outside the tab context. */
    footer?: default_2.ReactNode;
    /** Extra pixels to scroll past the active item when scrolling into view. Defaults to 40. */
    scrollOffset?: number;
    /** High-contrast selected state: black background with white text. */
    highContrast?: boolean;
    /** When true, nav items stretch to the full width of the nav. Defaults to false. */
    fullWidth?: boolean;
    className?: string;
    /**
     * When provided, renders a vertical tab strip to the left of the nav.
     * Each tab owns its own sections, search config, and optional top-level sections.
     * The active tab is controlled externally via `activeTabId` and `onTabSelect`.
     */
    tabs?: SideNavTabConfig[];
    /** The id of the currently active tab. Defaults to the first tab. */
    activeTabId?: string;
    /** Called when a tab is clicked. Receives the tab's id. */
    onTabSelect?: (id: string) => void;
    /**
     * When true, shows a toggle button to collapse and expand the sidebar.
     * The SideNav manages its own collapsed state internally. Defaults to true.
     * Note: the consumer's layout must allow the SideNav to shrink when collapsed
     * (avoid fixed widths on the SideNav container).
     */
    collapsible?: boolean;
    /** Initial collapsed state. Defaults to false. */
    defaultCollapsed?: boolean;
    /** Called whenever the collapsed state changes. */
    onCollapsedChange?: (collapsed: boolean) => void;
    /**
     * When true (and in tabbed mode), renders a search bar above the tab strip
     * that filters items across all tabs simultaneously. Per-tab `searchable`
     * fields are ignored when this is set.
     */
    globalSearchable?: boolean;
    /** Placeholder text for the global search input. Defaults to 'Search all…'. */
    globalSearchPlaceholder?: string;
    /** Icon style for the global search input. */
    globalSearchIconType?: 'search' | 'filter';
}

export declare interface SideNavSectionData {
    /** Optional heading shown above the group. Omit for ungrouped items. */
    label?: string;
    /** The navigation items within this section. */
    items: SideNavItemData[];
    /** When true, the section label becomes a clickable toggle that shows/hides the items. Requires `label`. */
    collapsible?: boolean;
    /** Whether a collapsible section starts open. Defaults to true. Ignored when `collapsible` is false. */
    defaultOpen?: boolean;
}

export declare interface SideNavTabConfig extends SideNavTabData {
    /** Navigation sections shown when this tab is active. */
    sections: SideNavSectionData[];
    /** Optional top-level accordion sections shown when this tab is active. */
    topLevelSections?: SideNavTopLevelSectionData[];
    /** Show a search input for this tab's items. */
    searchable?: boolean;
    /** Placeholder text for the search input. */
    searchPlaceholder?: string;
    /** Icon style for the search input. */
    searchIconType?: 'search' | 'filter';
}

export declare interface SideNavTabData {
    /** Unique identifier for the tab. */
    id: string;
    /** Display label shown in the tab button. */
    label: string;
    /** Optional Lucide icon shown before the label. */
    icon?: LucideIcon;
    /** When true, renders a horizontal separator line above this tab. */
    separator?: boolean;
}

export declare interface SideNavTopLevelSectionData {
    /** Label shown in the accordion header. */
    label: string;
    /** Whether the section is expanded by default. */
    defaultOpen?: boolean;
    /** The navigation sections rendered when expanded. */
    sections: SideNavSectionData[];
}

export declare const SidePanel: default_2.FC<SidePanelProps>;

declare interface SidePanelProps {
    isOpen: boolean;
    onClose: () => void;
    children: default_2.ReactNode;
    title?: default_2.ReactNode;
    footer?: default_2.ReactNode;
    actions?: default_2.ReactNode;
    width?: 'sm' | 'md' | 'lg' | 'xl' | 's' | 'm' | 'l' | 'small' | 'medium' | 'large' | number;
    mode?: 'overlay' | 'push';
    /** Which edge the overlay panel slides from. Defaults to `right`. Ignored in push mode. */
    side?: 'left' | 'right';
    'data-testid'?: string;
}

/** Canonical two/three-step size scales with shorthand aliases. */
declare type SizeSmMd = 'sm' | 'md' | 's' | 'm' | 'small' | 'medium';

declare type SizeSmMdLg = 'sm' | 'md' | 'lg' | 's' | 'm' | 'l' | 'small' | 'medium' | 'large';

export declare const Skeleton: default_2.FC<SkeletonProps>;

export declare interface SkeletonProps {
    variant?: 'text' | 'circle' | 'rect';
    width?: string | number;
    height?: string | number;
    lines?: number;
    className?: string;
}

export declare const Slider: default_2.FC<SliderProps>;

export declare interface SliderProps {
    value: number | [number, number];
    onChange: (value: number | [number, number]) => void;
    min?: number;
    max?: number;
    step?: number;
    labels?: {
        start?: string;
        end?: string;
    };
    stepLabels?: (string | number)[];
    showTooltip?: boolean;
    tooltipFormat?: (value: number) => string;
    size?: 'sm' | 'md';
    disabled?: boolean;
    className?: string;
    id?: string;
    /** Accessible label for the thumb(s). For single-thumb sliders. Ignored for range sliders, which use "Minimum" / "Maximum". */
    'aria-label'?: string;
}

export declare type SpaceScale = 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';

export declare function Spinner({ size, variant, label, className, }: SpinnerProps): JSX_2.Element;

export declare interface SpinnerProps {
    size?: 'sm' | 'md' | 'lg';
    variant?: 'default' | 'inverted';
    label?: string;
    className?: string;
}

export declare function Stack({ direction, gap, align, wrap, className, style, children, ...rest }: StackProps): JSX_2.Element;

export declare interface StackProps extends default_2.HTMLAttributes<HTMLDivElement> {
    direction?: 'column' | 'row';
    gap?: SpaceScale;
    align?: 'start' | 'center' | 'end' | 'stretch';
    wrap?: boolean;
}

export declare interface TabItem {
    id: string;
    label: string;
}

export declare function Table<T extends Record<string, unknown>>({ columns, data, rowKey, striped, compact, className, onRowClick, }: TableProps<T>): JSX_2.Element;

export declare interface TableColumn<T = Record<string, unknown>> {
    key: string;
    header: string;
    width?: string;
    render?: (value: unknown, row: T) => default_2.ReactNode;
}

declare interface TableProps<T = Record<string, unknown>> {
    columns: TableColumn<T>[];
    data: T[];
    rowKey: string | ((row: T) => string);
    striped?: boolean;
    compact?: boolean;
    className?: string;
    onRowClick?: (row: T) => void;
}

export declare const Tabs: default_2.FC<TabsProps>;

declare interface TabsProps {
    tabs: TabItem[];
    activeId: string;
    onChange: (id: string) => void;
    size?: 'sm' | 'md';
    className?: string;
}

/**
 * Text renders styled typography using the admin design system.
 *
 * Encapsulates all font-family, weight, size, line-height, and letter-spacing
 * values so consumers never need to manually compose token variables.
 *
 * ```tsx
 * <Text variant="heading-m" as="h2">Section Title</Text>
 * <Text variant="body-s" color="secondary">Subtitle text</Text>
 * <Text variant="overline">LABEL</Text>
 * ```
 */
declare const Text_2: default_2.FC<TextProps>;
export { Text_2 as Text }

export declare const Textarea: default_2.FC<TextareaProps>;

export declare interface TextareaProps {
    value?: string;
    defaultValue?: string;
    onChange?: (e: default_2.ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder?: string;
    label?: string;
    error?: string;
    helperText?: string;
    rows?: number;
    resize?: 'none' | 'vertical' | 'both';
    disabled?: boolean;
    id?: string;
    className?: string;
}

/**
 * Semantic text color names matching --admin-text-* tokens.
 * Defaults to 'primary' when omitted.
 */
export declare type TextColor = 'primary' | 'secondary' | 'subtle' | 'highlight' | 'warning' | 'inverted-primary';

declare interface TextProps {
    /** Typography variant — determines font size, weight, line-height, and letter-spacing. */
    variant: TextVariant;
    /** HTML element to render. Defaults to 'span'. */
    as?: ElementTag;
    /** Semantic text color. Maps to --admin-text-* tokens. Defaults to 'primary'. */
    color?: TextColor;
    /** Additional CSS class for layout or overrides. */
    className?: string;
    children: default_2.ReactNode;
}

/**
 * All available typography variants.
 *
 * Headings: heading-xl, heading-l, heading-m, heading-s, heading-xs
 * Overline: overline (uppercase, semibold, xs)
 * Body:     body-m, body-s, body-xs
 * Strong:   body-m-strong, body-s-strong, body-xs-strong
 */
export declare type TextVariant = 'heading-xl' | 'heading-l' | 'heading-m' | 'heading-s' | 'heading-xs' | 'overline' | 'body-m' | 'body-s' | 'body-xs' | 'body-m-strong' | 'body-s-strong' | 'body-xs-strong';

export declare const Timeline: default_2.FC<TimelineProps>;

export declare interface TimelineItem {
    id: string;
    timestamp: string;
    title: string;
    description?: default_2.ReactNode;
    icon?: default_2.ReactNode;
    avatar?: {
        src?: string;
        name: string;
    };
    variant?: 'default' | 'success' | 'warning' | 'info' | 'error';
}

export declare interface TimelineProps {
    items: TimelineItem[];
    className?: string;
}

export declare const TimePicker: default_2.FC<TimePickerProps>;

export declare interface TimePickerProps {
    value: string;
    onChange: (value: string) => void;
    format?: '12h' | '24h';
    interval?: number;
    min?: string;
    max?: string;
    label?: string;
    error?: string;
    helperText?: string;
    disabled?: boolean;
    id?: string;
}

export declare function Toast({ id, message, variant, autoDismiss, onDismiss, className, }: ToastProps): JSX_2.Element;

export declare interface ToastProps {
    id: string;
    message: string;
    variant?: 'info' | 'success' | 'warning' | 'error';
    autoDismiss?: number;
    onDismiss?: (id: string) => void;
    className?: string;
}

export declare function ToastStack({ toasts, onDismiss, position, className, }: ToastStackProps): JSX_2.Element;

export declare interface ToastStackProps {
    toasts: Array<{
        id: string;
        message: string;
        variant?: 'info' | 'success' | 'warning' | 'error';
        autoDismiss?: number;
    }>;
    onDismiss?: (id: string) => void;
    position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
    className?: string;
}

export declare const Toggle: default_2.FC<ToggleProps>;

declare interface ToggleProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    label?: string;
    labelPosition?: 'top' | 'left';
    labelWidth?: number | string;
    disabled?: boolean;
    size?: 'sm' | 'md';
    className?: string;
    id?: string;
    /**
     * Accessible label for the switch button.
     * Required when no visible label is provided.
     */
    'aria-label'?: string;
}

export declare const ToolbarButton: default_2.FC<ToolbarButtonProps>;

declare interface ToolbarButtonProps {
    icon: LucideIcon | default_2.ComponentType<{
        size?: number;
    }>;
    onClick?: () => void;
    size?: SizeSmMd;
    pressed?: boolean;
    inUse?: boolean;
    selected?: boolean;
    'aria-label'?: string;
    title?: string;
    tooltip?: TooltipConfig_3;
    className?: string;
    disabled?: boolean;
    /** Arbitrary data-* attributes to forward onto the underlying button — lets callers attach stable test hooks. */
    [key: `data-${string}`]: string | number | boolean | undefined;
}

export declare function Tooltip({ content, placement, delay, children, className, }: TooltipProps): JSX_2.Element;

declare type TooltipConfig = string | Omit<TooltipProps, 'children'>;

declare type TooltipConfig_2 = string | Omit<TooltipProps, 'children'>;

declare type TooltipConfig_3 = string | Omit<TooltipProps, 'children'>;

export declare interface TooltipProps {
    content: string;
    placement?: 'top' | 'bottom' | 'left' | 'right';
    delay?: number;
    children: default_2.ReactElement;
    className?: string;
}

/**
 * A generic top navigation bar with tabbed navigation and an actions slot.
 *
 * Renders a fixed-height horizontal bar. Tabs appear on the left with an
 * underline indicator for the active tab. The optional `actions` slot sits
 * on the right for toolbar buttons, menus, or other controls.
 *
 * On mobile viewports, tabs move to a second row that hides while scrolling
 * down and animates back in when scrolling up.
 *
 * This component is fully controlled — active state and click handling
 * are managed by the consumer via props.
 *
 * @example
 * ```tsx
 * <TopNav
 *   tabs={[
 *     { id: 'flows', label: 'Flows' },
 *     { id: 'settings', label: 'Settings' },
 *   ]}
 *   activeTabId="flows"
 *   onTabSelect={(id) => setActiveTab(id)}
 *   actions={<ToolbarButton icon={Settings} onClick={openSettings} />}
 * />
 * ```
 */
export declare const TopNav: default_2.FC<TopNavProps>;

export declare interface TopNavDropdownGroup {
    /** Optional heading rendered above the group's items. */
    header?: string;
    /** The items in this group. */
    items: TopNavDropdownItem[];
}

export declare interface TopNavDropdownItem {
    /** Unique identifier for the item. */
    id: string;
    /** Display label shown in the item. */
    label: string;
    /** Optional icon rendered before the label. */
    icon?: LucideIcon;
    /** Called when the item is clicked. */
    onClick?: () => void;
    /** When true, the item is non-interactive. */
    disabled?: boolean;
}

declare interface TopNavProps {
    /** Optional content rendered before the brand (e.g. a mobile menu button). */
    leading?: default_2.ReactNode;
    /** Optional branding element rendered at the far left, before tabs. Clicking navigates home. */
    brand?: default_2.ReactNode;
    /** Called when the brand element is clicked. */
    onBrandClick?: () => void;
    /** The tabs to render on the left side of the bar. */
    tabs: TopNavTabData[];
    /** The id of the currently active tab. */
    activeTabId?: string;
    /** Called when a tab is clicked. Receives the tab's id. */
    onTabSelect?: (id: string) => void;
    /**
     * Optional content rendered on the right side of the bar.
     * Typically ToolbarButtons or other small action elements.
     */
    actions?: default_2.ReactNode;
    /** Optional content rendered on the right, directly before the actions slot. */
    search?: default_2.ReactNode;
    /** Size variant. `sm` (default) is compact; `lg` is taller with larger typography. */
    size?: TopNavSize;
    className?: string;
}

export declare type TopNavSize = 'sm' | 'lg' | 's' | 'l' | 'small' | 'large';

export declare interface TopNavTabData {
    /** Unique identifier for the tab. */
    id: string;
    /** Display label shown in the tab. */
    label: string;
    /** When true, renders a vertical separator bar before this tab. */
    separator?: boolean;
    /**
     * When provided, the tab also renders a hover-triggered dropdown menu.
     * Clicking the tab itself still calls onSelect and shows an active indicator.
     */
    dropdownGroups?: TopNavDropdownGroup[];
}

/**
 * Subscribe to a CSS media query. Returns whether it currently matches.
 * SSR / non-browser environments return `false`.
 */
export declare function useMediaQuery(query: string): boolean;

export { }
