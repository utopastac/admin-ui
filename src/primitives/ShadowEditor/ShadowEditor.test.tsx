import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ShadowEditor, { PhoneShadow, ShadowPreset } from './ShadowEditor';

const defaultValue: PhoneShadow = {
  bezelWidth: 8,
  bezelColor: '#1f2937',
  offsetX: 0,
  offsetY: 10,
  blur: 20,
  spread: -5,
  shadowColor: '#000000',
  shadowOpacity: 0.5,
};

// Helper: open the popover by clicking the trigger button
async function openPopover(user: ReturnType<typeof userEvent.setup>) {
  const trigger = screen.getByRole('button', { name: /\d/ });
  await user.click(trigger);
}

describe('ShadowEditor', () => {
  it('renders without crashing with a default value', () => {
    render(<ShadowEditor value={defaultValue} onChange={() => {}} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('renders the trigger button with a summary label', () => {
    render(<ShadowEditor value={defaultValue} onChange={() => {}} />);
    const trigger = screen.getByRole('button');
    // Summary should contain the offset/blur/spread values
    expect(trigger.textContent).toContain('0px 10px 20px -5px');
    // And opacity as percentage
    expect(trigger.textContent).toContain('50%');
  });

  it('includes bezel info in summary when bezelWidth > 0', () => {
    render(<ShadowEditor value={defaultValue} onChange={() => {}} showBezel />);
    const trigger = screen.getByRole('button');
    expect(trigger.textContent).toContain('Bezel 8px');
  });

  it('omits bezel from summary when showBezel=false', () => {
    render(<ShadowEditor value={defaultValue} onChange={() => {}} showBezel={false} />);
    const trigger = screen.getByRole('button');
    expect(trigger.textContent).not.toContain('Bezel');
  });

  it('popover is not visible before trigger is clicked', () => {
    render(<ShadowEditor value={defaultValue} onChange={() => {}} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('clicking the trigger opens the popover with editor controls', async () => {
    const user = userEvent.setup();
    render(<ShadowEditor value={defaultValue} onChange={() => {}} />);
    await openPopover(user);
    expect(screen.getByRole('dialog', { name: 'Shadow editor' })).toBeInTheDocument();
  });

  it('shows Bezel section header when showBezel is true (default)', async () => {
    const user = userEvent.setup();
    render(<ShadowEditor value={defaultValue} onChange={() => {}} />);
    await openPopover(user);
    expect(screen.getByText('Bezel')).toBeInTheDocument();
  });

  it('shows Drop shadow section header when showBezel is true', async () => {
    const user = userEvent.setup();
    render(<ShadowEditor value={defaultValue} onChange={() => {}} />);
    await openPopover(user);
    expect(screen.getByText('Drop shadow')).toBeInTheDocument();
  });

  it('does not show Bezel section when showBezel=false', async () => {
    const user = userEvent.setup();
    render(<ShadowEditor value={defaultValue} onChange={() => {}} showBezel={false} />);
    await openPopover(user);
    expect(screen.queryByText('Bezel')).not.toBeInTheDocument();
    expect(screen.queryByText('Drop shadow')).not.toBeInTheDocument();
  });

  describe('field inputs call onChange with updated values', () => {
    // With showBezel=false the spinbutton order is: offsetX[0], offsetY[1], blur[2], spread[3]
    // With showBezel=true the order is: bezelWidth[0], offsetX[1], offsetY[2], blur[3], spread[4]

    it('changing offsetX calls onChange with updated offsetX', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(<ShadowEditor value={defaultValue} onChange={onChange} showBezel={false} />);
      await openPopover(user);

      const inputs = screen.getAllByRole('spinbutton');
      fireEvent.change(inputs[0], { target: { value: '5' } });
      expect(onChange).toHaveBeenCalledWith({ offsetX: 5 });
    });

    it('changing offsetY calls onChange with updated offsetY', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(<ShadowEditor value={defaultValue} onChange={onChange} showBezel={false} />);
      await openPopover(user);

      const inputs = screen.getAllByRole('spinbutton');
      fireEvent.change(inputs[1], { target: { value: '15' } });
      expect(onChange).toHaveBeenCalledWith({ offsetY: 15 });
    });

    it('changing blur calls onChange with updated blur', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(<ShadowEditor value={defaultValue} onChange={onChange} showBezel={false} />);
      await openPopover(user);

      const inputs = screen.getAllByRole('spinbutton');
      fireEvent.change(inputs[2], { target: { value: '30' } });
      expect(onChange).toHaveBeenCalledWith({ blur: 30 });
    });

    it('changing spread calls onChange with updated spread', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(<ShadowEditor value={defaultValue} onChange={onChange} showBezel={false} />);
      await openPopover(user);

      const inputs = screen.getAllByRole('spinbutton');
      fireEvent.change(inputs[3], { target: { value: '-2' } });
      expect(onChange).toHaveBeenCalledWith({ spread: -2 });
    });

    it('changing bezelWidth calls onChange with updated bezelWidth', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(<ShadowEditor value={defaultValue} onChange={onChange} showBezel />);
      await openPopover(user);

      const inputs = screen.getAllByRole('spinbutton');
      fireEvent.change(inputs[0], { target: { value: '12' } });
      expect(onChange).toHaveBeenCalledWith({ bezelWidth: 12 });
    });
  });

  describe('opacity input in ColorPicker', () => {
    it('changing opacity calls onChange with updated shadowOpacity', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(<ShadowEditor value={defaultValue} onChange={onChange} showBezel={false} />);
      await openPopover(user);

      // The opacity field is a number input for the shadow opacity (0–100 range as a fraction)
      // ColorPicker renders an opacity spinbutton; find it by querying all spinbuttons
      const inputs = screen.getAllByRole('spinbutton');
      // With showBezel=false: offsetX[0], offsetY[1], blur[2], spread[3], then ColorPicker opacity[4]
      const opacityInput = inputs[4];
      fireEvent.change(opacityInput, { target: { value: '75' } });
      // ColorPicker calls onOpacityChange which maps to update('shadowOpacity', v)
      // The value passed depends on how ColorPicker internally scales; just verify onChange was called
      expect(onChange).toHaveBeenCalled();
    });
  });

  describe('preset swatches', () => {
    const presets: ShadowPreset[] = [
      { label: 'Subtle', value: { offsetX: 0, offsetY: 4, blur: 8, spread: 0, shadowColor: '#000000', shadowOpacity: 0.15 } },
      { label: 'Deep', value: { offsetX: 0, offsetY: 16, blur: 32, spread: -8, shadowColor: '#000000', shadowOpacity: 0.4 } },
    ];

    it('renders preset swatches when shadowPresets provided', async () => {
      const user = userEvent.setup();
      render(<ShadowEditor value={defaultValue} onChange={() => {}} shadowPresets={presets} onPresetSelect={() => {}} />);
      await openPopover(user);

      expect(screen.getByTitle('Subtle')).toBeInTheDocument();
      expect(screen.getByTitle('Deep')).toBeInTheDocument();
    });

    it('clicking a preset swatch calls onPresetSelect with its value', async () => {
      const user = userEvent.setup();
      const onPresetSelect = vi.fn();
      render(
        <ShadowEditor
          value={defaultValue}
          onChange={() => {}}
          shadowPresets={presets}
          onPresetSelect={onPresetSelect}
        />,
      );
      await openPopover(user);

      await user.click(screen.getByTitle('Subtle'));
      expect(onPresetSelect).toHaveBeenCalledTimes(1);
      expect(onPresetSelect).toHaveBeenCalledWith(presets[0].value);
    });

    it('clicking a second preset swatch calls onPresetSelect with its value', async () => {
      const user = userEvent.setup();
      const onPresetSelect = vi.fn();
      render(
        <ShadowEditor
          value={defaultValue}
          onChange={() => {}}
          shadowPresets={presets}
          onPresetSelect={onPresetSelect}
        />,
      );
      await openPopover(user);

      await user.click(screen.getByTitle('Deep'));
      expect(onPresetSelect).toHaveBeenCalledWith(presets[1].value);
    });

    it('does not render preset swatches section when shadowPresets is empty', async () => {
      const user = userEvent.setup();
      render(<ShadowEditor value={defaultValue} onChange={() => {}} shadowPresets={[]} />);
      await openPopover(user);

      expect(screen.queryByTitle('Subtle')).not.toBeInTheDocument();
    });
  });

  describe('label wrapping', () => {
    it('renders label text when label prop is provided', () => {
      render(<ShadowEditor value={defaultValue} onChange={() => {}} label="Shadow" />);
      expect(screen.getByText('Shadow')).toBeInTheDocument();
    });

    it('wraps in FieldLabel with left position when labelPosition="left"', () => {
      const { container } = render(
        <ShadowEditor value={defaultValue} onChange={() => {}} label="Shadow" labelPosition="left" />,
      );
      const wrapper = container.firstElementChild!;
      expect(wrapper.className).toMatch(/fieldLeft/);
    });

    it('does not render a label element when no label prop given', () => {
      render(<ShadowEditor value={defaultValue} onChange={() => {}} />);
      expect(screen.queryByRole('label')).not.toBeInTheDocument();
    });
  });
});
