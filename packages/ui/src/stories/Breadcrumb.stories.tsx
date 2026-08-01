import type { Meta, StoryObj } from "@storybook/react";
import { Breadcrumb } from "../components/breadcrumb";

const meta: Meta<typeof Breadcrumb> = {
  title: "Navigation/Breadcrumb",
  component: Breadcrumb,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Breadcrumb>;

export const Default: Story = {
  args: {
    items: [
      { label: "Home", href: "/" },
      { label: "Settings", href: "/settings" },
      { label: "Partners", href: "/settings/partners" },
      { label: "Edit Partner #2" },
    ],
  },
};
