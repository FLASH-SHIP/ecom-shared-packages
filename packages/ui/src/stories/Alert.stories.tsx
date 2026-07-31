import type { Meta, StoryObj } from "@storybook/react";
import { Alert } from "../components/alert";

const meta: Meta<typeof Alert> = {
  title: "Feedback/Alert",
  component: Alert,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  render: () => (
    <div className="max-w-md">
      <Alert title="Heads up!">
        You can add components to your app using the cli.
      </Alert>
    </div>
  ),
};

export const Destructive: Story = {
  render: () => (
    <div className="max-w-md">
      <Alert variant="destructive" title="Error">
        Your session has expired. Please log in again.
      </Alert>
    </div>
  ),
};

export const Success: Story = {
  render: () => (
    <div className="max-w-md">
      <Alert variant="success" title="Success!">
        Your changes have been saved successfully.
      </Alert>
    </div>
  ),
};

export const Warning: Story = {
  render: () => (
    <div className="max-w-md">
      <Alert variant="warning" title="Warning">
        Please review your payment information before proceeding.
      </Alert>
    </div>
  ),
};
