import type { Meta, StoryObj } from "@storybook/react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../components/sheet";
import { Button } from "../components/button";

const meta: Meta = {
  title: "Overlays/Sheet",
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj;

export const Right: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Drawer (Right)</Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Navigation Menu</SheetTitle>
          <SheetDescription>Explore sections of FlashShip CMS.</SheetDescription>
        </SheetHeader>
        <div className="p-6 space-y-4">
          <p className="text-sm font-medium hover:text-primary cursor-pointer">Dashboard</p>
          <p className="text-sm font-medium hover:text-primary cursor-pointer">Orders Management</p>
          <p className="text-sm font-medium hover:text-primary cursor-pointer">Partner Settings</p>
        </div>
      </SheetContent>
    </Sheet>
  ),
};

export const Left: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Sidebar (Left)</Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Admin Sidebar</SheetTitle>
        </SheetHeader>
        <div className="p-6 text-sm">Sidebar links go here...</div>
      </SheetContent>
    </Sheet>
  ),
};
