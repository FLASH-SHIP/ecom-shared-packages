import type { Meta, StoryObj } from "@storybook/react";
import { Label } from "../components/label";

const meta: Meta<typeof Label> = {
  title: "Form/Label",
  component: Label,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Label>;

export const Default: Story = {
  args: {
    children: "Email Address",
  },
};

export const RequiredField: Story = {
  render: () => (
    <Label>
      Full Name <span className="text-destructive">*</span>
    </Label>
  ),
};
