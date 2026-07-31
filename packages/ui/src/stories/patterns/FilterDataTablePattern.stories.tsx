import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Button } from "../../components/button";
import { Input } from "../../components/input";
import { Badge } from "../../components/badge";
import { SearchableSelect } from "../../components/searchable-select";
import { DatePicker } from "../../components/date-picker";
import { Pagination } from "../../components/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/table";
import { Search, RefreshCw } from "lucide-react";

const meta: Meta = {
  title: "Patterns/Filterable Data Table Pattern",
  parameters: {
    layout: "padded",
  },
};

export default meta;

type Story = StoryObj;

const sampleOrders = [
  { id: "ORD-9021", customer: "Nguyen Van A", partner: "GHN Express", date: "2026-07-31", status: "Delivered", amount: "$120.00" },
  { id: "ORD-9022", customer: "Tran Thi B", partner: "Viettel Post", date: "2026-07-30", status: "Processing", amount: "$85.50" },
  { id: "ORD-9023", customer: "Le Van C", partner: "GHTK", date: "2026-07-29", status: "Pending", amount: "$240.00" },
  { id: "ORD-9024", customer: "Pham Minh D", partner: "GHN Express", date: "2026-07-28", status: "Cancelled", amount: "$45.00" },
];

export const OrdersFilterTable: Story = {
  render: () => {
    const [search, setSearch] = React.useState("");
    const [partner, setPartner] = React.useState("");
    const [date, setDate] = React.useState("2026-07-31");
    const [page, setPage] = React.useState(1);

    const filtered = sampleOrders.filter((o) => {
      if (search && !o.id.toLowerCase().includes(search.toLowerCase()) && !o.customer.toLowerCase().includes(search.toLowerCase())) return false;
      if (partner && o.partner !== partner) return false;
      return true;
    });

    return (
      <div className="space-y-4 max-w-4xl p-6 bg-card border border-border rounded-xl shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold">Orders Listing</h2>
            <p className="text-sm text-muted-foreground">Filter and manage customer shipping orders.</p>
          </div>
          <Button variant="outline" size="sm" onClick={() => { setSearch(""); setPartner(""); }}>
            <RefreshCw className="mr-2 size-3.5" />
            Reset Filters
          </Button>
        </div>

        {/* Filter bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 bg-muted/30 rounded-lg border border-border">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Order ID or customer..."
              className="pl-9"
            />
          </div>

          <SearchableSelect
            value={partner}
            onValueChange={setPartner}
            placeholder="Filter partner..."
            options={[
              { value: "GHN Express", label: "GHN Express" },
              { value: "Viettel Post", label: "Viettel Post" },
              { value: "GHTK", label: "GHTK" },
            ]}
          />

          <DatePicker value={date} onChange={setDate} placeholder="Filter date..." />
        </div>

        {/* Table */}
        <div className="border border-border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Carrier Partner</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                    No orders match your filter criteria.
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((o) => (
                  <TableRow key={o.id}>
                    <TableCell className="font-semibold font-mono">{o.id}</TableCell>
                    <TableCell>{o.customer}</TableCell>
                    <TableCell>{o.partner}</TableCell>
                    <TableCell className="text-muted-foreground">{o.date}</TableCell>
                    <TableCell>
                      <Badge variant={o.status === "Delivered" ? "default" : o.status === "Processing" ? "secondary" : o.status === "Pending" ? "outline" : "destructive"}>
                        {o.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-mono font-medium">{o.amount}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination footer */}
        <div className="flex items-center justify-between pt-2">
          <p className="text-xs text-muted-foreground">
            Showing <span className="font-medium text-foreground">{filtered.length}</span> of {sampleOrders.length} entries
          </p>
          <Pagination currentPage={page} totalPages={3} onPageChange={setPage} />
        </div>
      </div>
    );
  },
};
