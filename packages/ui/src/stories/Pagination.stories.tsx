import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Pagination } from "../components/pagination";

const meta: Meta<typeof Pagination> = {
  title: "Data Display/Pagination",
  component: Pagination,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  render: () => {
    const [page, setPage] = React.useState(1);
    return <Pagination currentPage={page} totalPages={10} onPageChange={setPage} />;
  },
};

export const MiddlePage: Story = {
  render: () => {
    const [page, setPage] = React.useState(5);
    return <Pagination currentPage={page} totalPages={15} onPageChange={setPage} />;
  },
};
