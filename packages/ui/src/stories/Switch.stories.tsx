import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";
import { Switch } from "../components/switch";
import { Label } from "../components/label";

const meta: Meta<typeof Switch> = {
  title: "Form/Switch",
  component: Switch,
  tags: ["autodocs"],
  argTypes: {
    checked: { control: "boolean" },
    disabled: { control: "boolean" },
  },
};

export default meta;

type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  args: {
    id: "airplane-mode",
  },
};

export const WithLabel: Story = {
  render: (args) => (
    <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" {...args} />
      <Label htmlFor="airplane-mode">Airplane Mode</Label>
    </div>
  ),
};

export const Checked: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Switch id="dark-mode" defaultChecked />
      <Label htmlFor="dark-mode">Dark Mode</Label>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Switch id="disabled-switch" disabled />
      <Label htmlFor="disabled-switch">Disabled Feature</Label>
    </div>
  ),
};

export const InteractiveToggle: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Switch id="interactive-switch" />
      <Label htmlFor="interactive-switch">Enable Turbo Mode</Label>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const switchEl = canvas.getByRole("switch");
    await expect(switchEl).toHaveAttribute("aria-checked", "false");
    await userEvent.click(switchEl);
    await expect(switchEl).toHaveAttribute("aria-checked", "true");
  },
};
