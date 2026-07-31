import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { DatePicker } from "../components/date-picker";

const meta: Meta<typeof DatePicker> = {
  title: "Data Pickers/DatePicker",
  component: DatePicker,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
  render: () => {
    const [val, setVal] = React.useState("2026-07-31");
    return (
      <div className="w-[280px]">
        <DatePicker value={val} onChange={setVal} placeholder="Select date..." />
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="w-[280px]">
      <DatePicker value="2026-07-31" disabled placeholder="Select date..." />
    </div>
  ),
};
