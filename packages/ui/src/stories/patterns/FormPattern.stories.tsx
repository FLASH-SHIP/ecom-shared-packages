import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Button } from "../../components/button";
import { Input } from "../../components/input";
import { Label } from "../../components/label";
import { Checkbox } from "../../components/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/select";
import { PhoneInput } from "../../components/PhoneInput";
import { Alert } from "../../components/alert";

const meta: Meta = {
  title: "Patterns/Real-World Form Pattern",
  parameters: {
    layout: "padded",
  },
};

export default meta;

type Story = StoryObj;

export const PartnerRegistrationForm: Story = {
  render: () => {
    const [submitted, setSubmitted] = React.useState(false);
    const [phone, setPhone] = React.useState("+84 901234567");

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setSubmitted(true);
    };

    return (
      <div className="max-w-lg p-6 bg-card border border-border rounded-xl shadow-sm space-y-6">
        <div>
          <h2 className="text-xl font-bold">Partner Account Setup</h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            Fill in the logistics partner information to enable FlashShip integration.
          </p>
        </div>

        {submitted && (
          <Alert variant="success" title="Registration Submitted!">
            Your partner account request is under review.
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="companyName">
              Company Name <span className="text-destructive">*</span>
            </Label>
            <Input id="companyName" required placeholder="FlashShip Logistics Ltd." />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="partnerType">Partner Type</Label>
            <Select defaultValue="carrier">
              <SelectTrigger id="partnerType">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="carrier">Shipping Carrier</SelectItem>
                <SelectItem value="fulfillment">Fulfillment Hub</SelectItem>
                <SelectItem value="supplier">Goods Supplier</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <PhoneInput
            id="contactPhone"
            label="Contact Phone"
            value={phone}
            onChange={setPhone}
          />

          <div className="flex items-center space-x-2 pt-2">
            <Checkbox id="terms-agree" required />
            <Label htmlFor="terms-agree" className="text-xs">
              I agree to the FlashShip Logistics Partner Terms & Privacy Policy
            </Label>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-border">
            <Button type="button" variant="outline" onClick={() => setSubmitted(false)}>
              Reset
            </Button>
            <Button type="submit">Submit Registration</Button>
          </div>
        </form>
      </div>
    );
  },
};
