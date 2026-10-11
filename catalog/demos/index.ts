import React from 'react';

/* Home */
import HomePage from './HomePage';

/* About */
import AboutPage from './AboutPage';
import DecisionsPage from './DecisionsPage';
import DevArchitecturePage from './DevArchitecturePage';
import DevAddingComponentPage from './DevAddingComponentPage';
import DevDesignTokensPage from './DevDesignTokensPage';
import DevCssConventionsPage from './DevCssConventionsPage';
import DevBuildDeployPage from './DevBuildDeployPage';

/* System pages */
import { avatars, borderRadius, colors, icons, mixins, shadows, spacing, typography } from './system';

/* Primitives */
import {
  AvatarDemo,
  AnimationPickerDemo,
  CommandDemo,
  KbdDemo,
  BadgeDemo,
  BannerDemo,
  BlockquoteDemo,
  BreadcrumbDemo,
  BulletListDemo,
  ButtonDemo,
  ButtonGroupDemo,
  CardDemo,
  CarouselDemo,
  CheckboxDemo,
  ChipDemo,
  CodeBlockDemo,
  ColorPickerDemo,
  CompactInputDemo,
  DataGridDemo,
  DatePickerDemo,
  DividerDemo,
  EditableTextDemo,
  EmptyStateDemo,
  FieldLabelDemo,
  GlobalSearchDemo,
  GradientPickerDemo,
  ImagePickerDemo,
  InlineSearchDemo,
  InputDemo,
  NumberedListDemo,
  PixelArtEditorDemo,
  PopoverDemo,
  ProgressBarDemo,
  ProgressCircularDemo,
  RadioDemo,
  RichTextEditorDemo,
  SegmentedControlDemo,
  SelectDemo,
  SelectionListDemo,
  ShadowEditorDemo,
  SkeletonDemo,
  SliderDemo,
  SpinnerDemo,
  TableDemo,
  TabsDemo,
  TextDemo,
  TextareaDemo,
  TimePickerDemo,
  TimelineDemo,
  ToggleDemo,
  TooltipDemo,
  ToolbarButtonDemo,
} from './primitives';

/* Overlays */
import { AlertDialogDemo, ContextMenuDemo, ModalDemo, SidePanelDemo, ToastDemo } from './overlays';

/* Layout */
import { DocPageDemo, PageFooterDemo, PageHeadingDemo, SectionHeadingDemo, AppLayoutDemo, stack as StackDemo, columns as ColumnsDemo, CardGridDemo, LinkListDemo } from './layout';

/* Section landing pages */
import SystemLandingPage from './SystemLandingPage';
import ComponentsLandingPage from './ComponentsLandingPage';

/* Navigation */
import { PageContentsDemo, PaginationDemo, TopNavDemo, SideNavDemo } from './navigation';

export const demos: Record<string, React.FC> = {
  /* Home */
  'home': HomePage,

  /* About */
  'about': AboutPage,
  'decisions': DecisionsPage,
  'dev-architecture': DevArchitecturePage,
  'dev-adding-component': DevAddingComponentPage,
  'dev-design-tokens': DevDesignTokensPage,
  'dev-css-conventions': DevCssConventionsPage,
  'dev-build-deploy': DevBuildDeployPage,

  /* System */
  'avatars': avatars,
  'border-radius': borderRadius,
  'colors': colors,
  'icons': icons,
  'mixins': mixins,
  'shadows': shadows,
  'spacing': spacing,
  'typography': typography,

  /* Primitives */
  'avatar': AvatarDemo,
  'command': CommandDemo,
  'kbd': KbdDemo,
  'animation-picker': AnimationPickerDemo,
  'badge': BadgeDemo,
  'banner': BannerDemo,
  'blockquote': BlockquoteDemo,
  'breadcrumb': BreadcrumbDemo,
  'bullet-list': BulletListDemo,
  'button': ButtonDemo,
  'button-group': ButtonGroupDemo,
  'card': CardDemo,
  'carousel': CarouselDemo,
  'checkbox': CheckboxDemo,
  'chip': ChipDemo,
  'code-block': CodeBlockDemo,
  'color-picker': ColorPickerDemo,
  'compact-input': CompactInputDemo,
  'data-grid': DataGridDemo,
  'date-picker': DatePickerDemo,
  'divider': DividerDemo,
  'editable-text': EditableTextDemo,
  'empty-state': EmptyStateDemo,
  'field-label': FieldLabelDemo,
  'global-search': GlobalSearchDemo,
  'gradient-picker': GradientPickerDemo,
  'image-picker': ImagePickerDemo,
  'inline-search': InlineSearchDemo,
  'input': InputDemo,
  'numbered-list': NumberedListDemo,
  'pixel-art-editor': PixelArtEditorDemo,
  'popover': PopoverDemo,
  'progress-bar': ProgressBarDemo,
  'progress-circular': ProgressCircularDemo,
  'radio': RadioDemo,
  'rich-text-editor': RichTextEditorDemo,
  'segmented-control': SegmentedControlDemo,
  'select': SelectDemo,
  'selection-list': SelectionListDemo,
  'shadow-editor': ShadowEditorDemo,
  'skeleton': SkeletonDemo,
  'slider': SliderDemo,
  'spinner': SpinnerDemo,
  'table': TableDemo,
  'tabs': TabsDemo,
  'text': TextDemo,
  'textarea': TextareaDemo,
  'time-picker': TimePickerDemo,
  'timeline': TimelineDemo,
  'toggle': ToggleDemo,
  'tooltip': TooltipDemo,
  'toolbar-button': ToolbarButtonDemo,

  /* Overlays */
  'alert-dialog': AlertDialogDemo,
  'context-menu': ContextMenuDemo,
  'modal': ModalDemo,
  'side-panel': SidePanelDemo,
  'toast': ToastDemo,

  /* Section landing pages */
  'system': SystemLandingPage,
  'components': ComponentsLandingPage,

  /* Layout */
  'doc-page': DocPageDemo,
  'page-footer': PageFooterDemo,
  'page-heading': PageHeadingDemo,
  'section-heading': SectionHeadingDemo,
  'app-layout': AppLayoutDemo,
  'stack': StackDemo,
  'columns': ColumnsDemo,
  'card-grid': CardGridDemo,
  'link-list': LinkListDemo,

  /* Navigation */
  'page-contents': PageContentsDemo,
  'pagination': PaginationDemo,
  'top-nav': TopNavDemo,
  'side-nav': SideNavDemo,
};
