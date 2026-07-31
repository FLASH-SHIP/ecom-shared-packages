import type { Meta, StoryObj } from "@storybook/react";
import { Separator } from "../components/separator";

const meta: Meta<typeof Separator> = {
  title: "Data Display/Separator",
  component: Separator,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Separator>;

export const Horizontal: Story = {
  render: () => (
    <div className="space-y-4 max-w-sm">
      <div>
        <h4 className="text-sm font-medium leading-none">Radix Primitives</h4>
        <p className="text-sm text-muted-foreground">An open-source UI component library.</p>
      </div>
      <Separator />
      <div className="flex h-5 items-center space-x-4 text-sm">
        <div>Blog</div>
        <Separator orientation="vertical" />
        <div>Docs</div>
        <Separator orientation="vertical" />
        <div>Source</div>
      </div>
    </div>
  ),
};
