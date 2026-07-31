import type { Meta, StoryObj } from "@storybook/react";
import { EmptyState } from "../components/empty-state";
import { Button } from "../components/button";
import { ShoppingBag } from "lucide-react";

const meta: Meta<typeof EmptyState> = {
  title: "Feedback/EmptyState",
  component: EmptyState,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof EmptyState>;

export const Default: Story = {
  args: {
    title: "No orders found",
    description: "You haven't placed any orders yet. Start browsing products to place your first order.",
  },
};

export const WithAction: Story = {
  render: () => (
    <EmptyState
      icon={<ShoppingBag className="size-8 text-primary" />}
      title="Your cart is empty"
      description="Looks like you haven't added anything to your cart yet."
      action={<Button>Browse Products</Button>}
    />
  ),
};
