import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { PhoneInput } from "../components/PhoneInput";

const meta: Meta<typeof PhoneInput> = {
  title: "Form/PhoneInput",
  component: PhoneInput,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof PhoneInput>;

export const Default: Story = {
  render: () => {
    const [val, setVal] = React.useState("+84 912345678");
    return (
      <div className="w-[360px]">
        <PhoneInput value={val} onChange={setVal} label="Phone Number" />
      </div>
    );
  },
};

export const WithError: Story = {
  render: () => (
    <div className="w-[360px]">
      <PhoneInput
        value="+1 123"
        label="Contact Phone"
        error="Invalid phone number format for US"
      />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="w-[360px]">
      <PhoneInput value="+84 987654321" label="Phone Number" disabled />
    </div>
  ),
};
