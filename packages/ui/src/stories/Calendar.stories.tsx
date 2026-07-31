import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Calendar } from "../components/calendar";

const meta: Meta<typeof Calendar> = {
  title: "Data Pickers/Calendar",
  component: Calendar,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Calendar>;

export const Default: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date());
    return (
      <div className="border border-border rounded-xl p-2 w-fit">
        <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md" />
      </div>
    );
  },
};
