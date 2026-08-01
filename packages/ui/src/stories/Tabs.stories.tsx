import type { Meta, StoryObj } from "@storybook/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/tabs";

const meta: Meta = {
  title: "Navigation/Tabs",
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account" className="p-4 border border-border rounded-lg mt-2">
        <p className="text-sm font-medium">Account Settings</p>
        <p className="text-xs text-muted-foreground mt-1">
          Make changes to your account details here.
        </p>
      </TabsContent>
      <TabsContent value="password" className="p-4 border border-border rounded-lg mt-2">
        <p className="text-sm font-medium">Change Password</p>
        <p className="text-xs text-muted-foreground mt-1">
          Change your security password here.
        </p>
      </TabsContent>
    </Tabs>
  ),
};
