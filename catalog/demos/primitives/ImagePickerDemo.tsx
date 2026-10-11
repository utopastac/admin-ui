import React, { useState } from 'react';
import { DemoSection, DemoSubsection } from '../../shared/DemoSection';
import { DemoShowcase } from '../../shared/DemoShowcase';
import ImagePicker from '@/primitives/ImagePicker';
import type { ImageOption } from '@/primitives/ImagePicker';
import { PropsTable } from '../../shared/PropsTable';
import type { PropRow } from '../../shared/PropsTable';

const ImagePickerProps: PropRow[] = [
  { prop: 'images', type: 'ImageOption[]', description: 'Array of image options to display in the picker' },
  { prop: 'onChange', type: '(key: string) => void', description: 'Called with the key of the selected image' },
  { prop: 'value', type: 'string', description: 'Key of the currently selected image' },
  { prop: 'label', type: 'string', description: 'Optional label text shown above or beside the picker' },
  { prop: 'labelPosition', type: "'top' | 'left'", default: "'top'", options: ['top', 'left'], description: 'Position of the label relative to the picker' },
  { prop: 'labelWidth', type: 'number | string', description: 'Width of the label column when labelPosition is "left"' },
  { prop: 'id', type: 'string', description: 'HTML id forwarded to the trigger button' },
];

const DEMO_IMAGES: ImageOption[] = [
  { key: 'mountain', src: 'https://picsum.photos/seed/mountain/200/150', label: 'Mountain' },
  { key: 'forest', src: 'https://picsum.photos/seed/forest/200/150', label: 'Forest' },
  { key: 'ocean', src: 'https://picsum.photos/seed/ocean/200/150', label: 'Ocean' },
  { key: 'city', src: 'https://picsum.photos/seed/city/200/150', label: 'City' },
];

export default function ImagePickerDemo() {
  const [basic, setBasic] = useState<string | undefined>(undefined);
  const [labelLeft, setLabelLeft] = useState<string>('mountain');
  const [labelTop, setLabelTop] = useState<string>('forest');

  return (
    <DemoSection
      title="ImagePicker"
      description="A picker for selecting an image from a predefined set. Renders a small thumbnail trigger that opens a popover grid of options. Supports optional labels in top or left position."
    >
      <DemoShowcase
        code={`import { ImagePicker } from 'admin-ui';
import type { ImageOption } from 'admin-ui';

const images: ImageOption[] = [
  { key: 'mountain', src: 'https://picsum.photos/seed/mountain/200/150', label: 'Mountain' },
  { key: 'forest',   src: 'https://picsum.photos/seed/forest/200/150',   label: 'Forest'   },
  { key: 'ocean',    src: 'https://picsum.photos/seed/ocean/200/150',    label: 'Ocean'    },
  { key: 'city',     src: 'https://picsum.photos/seed/city/200/150',     label: 'City'     },
];

const [value, setValue] = useState<string | undefined>(undefined);

<ImagePicker images={images} value={value} onChange={setValue} />`}
      >
        <ImagePicker images={DEMO_IMAGES} value={basic} onChange={setBasic} />
      </DemoShowcase>
      <PropsTable props={ImagePickerProps} />

      <DemoSubsection label="With label — left">
        <div style={{ width: '280px' }}>
          <ImagePicker
            images={DEMO_IMAGES}
            value={labelLeft}
            onChange={setLabelLeft}
            label="Background"
            labelPosition="left"
            labelWidth={80}
          />
        </div>
      </DemoSubsection>

      <DemoSubsection label="With label — top">
        <div style={{ width: '200px' }}>
          <ImagePicker
            images={DEMO_IMAGES}
            value={labelTop}
            onChange={setLabelTop}
            label="Hero image"
            labelPosition="top"
          />
        </div>
      </DemoSubsection>
    </DemoSection>
  );
}
