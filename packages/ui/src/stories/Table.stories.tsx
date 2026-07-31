import type { Meta, StoryObj } from "@storybook/react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/table";
import { Badge } from "../components/badge";

const meta: Meta = {
  title: "Data Display/Table",
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj;

const invoices = [
  { invoice: "INV001", status: "Paid", amount: "$250.00", method: "Credit Card" },
  { invoice: "INV002", status: "Pending", amount: "$150.00", method: "PayPal" },
  { invoice: "INV003", status: "Unpaid", amount: "$350.00", method: "Bank Transfer" },
  { invoice: "INV004", status: "Paid", amount: "$450.00", method: "Credit Card" },
];

export const Default: Story = {
  render: () => (
    <div className="max-w-2xl border border-border rounded-lg p-2">
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((inv) => (
            <TableRow key={inv.invoice}>
              <TableCell className="font-medium">{inv.invoice}</TableCell>
              <TableCell>
                <Badge variant={inv.status === "Paid" ? "default" : inv.status === "Pending" ? "secondary" : "destructive"}>
                  {inv.status}
                </Badge>
              </TableCell>
              <TableCell>{inv.method}</TableCell>
              <TableCell className="text-right font-mono">{inv.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  ),
};
