import { render } from '@testing-library/react';
import * as primitives from './demos/primitives';
import * as overlays from './demos/overlays';
import * as navigation from './demos/navigation';
import * as layout from './demos/layout';
import * as system from './demos/system';

const allDemos = {
  ...primitives,
  ...overlays,
  ...navigation,
  ...layout,
  ...system,
};

describe('catalog smoke tests', () => {
  for (const [name, Demo] of Object.entries(allDemos)) {
    it(`renders ${name} without throwing`, () => {
      expect(() => render(<Demo />)).not.toThrow();
    });
  }
});
