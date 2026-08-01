import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { SearchableSelect } from "../components/searchable-select";

const sampleOptions = [
  { value: "express", label: "Express Shipping", icon: "🚀" },
  { value: "standard", label: "Standard Shipping", icon: "📦" },
  { value: "economy", label: "Economy Freight", icon: "🚚" },
  { value: "same-day", label: "Same Day Courier", icon: "⚡" },
  { value: "international", label: "International Air Mail", icon: "✈️" },
];

const meta: Meta<typeof SearchableSelect> = {
  title: "Form/SearchableSelect",
  component: SearchableSelect,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof SearchableSelect>;

export const Default: Story = {
  render: () => {
    const [val, setVal] = React.useState("");
    return (
      <div className="w-[320px]">
        <SearchableSelect
          value={val}
          onValueChange={setVal}
          options={sampleOptions}
          placeholder="Select shipping method..."
        />
      </div>
    );
  },
};

export const Preselected: Story = {
  render: () => {
    const [val, setVal] = React.useState("express");
    return (
      <div className="w-[320px]">
        <SearchableSelect
          value={val}
          onValueChange={setVal}
          options={sampleOptions}
          placeholder="Select shipping method..."
        />
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="w-[320px]">
      <SearchableSelect
        value="standard"
        options={sampleOptions}
        disabled
        placeholder="Select shipping method..."
      />
    </div>
  ),
};
