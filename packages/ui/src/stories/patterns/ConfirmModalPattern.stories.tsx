import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Button } from "../../components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/dialog";
import { Trash2, AlertTriangle } from "lucide-react";

const meta: Meta = {
  title: "Patterns/Confirm Modal Pattern",
  parameters: {
    layout: "padded",
  },
};

export default meta;

type Story = StoryObj;

export const DeleteConfirmationModal: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);
    const [deleted, setDeleted] = React.useState(false);

    return (
      <div className="space-y-4">
        {deleted ? (
          <div className="p-4 rounded-lg border border-destructive/30 bg-destructive/10 text-destructive text-sm font-medium">
            Partner #2049 has been deleted.
          </div>
        ) : (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="destructive">
                <Trash2 className="mr-2 size-4" />
                Delete Partner Account
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <div className="flex items-center gap-2 text-destructive">
                  <AlertTriangle className="size-5" />
                  <DialogTitle className="text-destructive">Delete Partner Account</DialogTitle>
                </div>
                <DialogDescription className="pt-2">
                  Are you sure you want to delete <span className="font-semibold text-foreground">GHN Express (#2049)</span>? This action cannot be undone and will cancel active shipments.
                </DialogDescription>
              </DialogHeader>

              <DialogFooter className="gap-2 sm:gap-0 pt-4">
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    setDeleted(true);
                    setOpen(false);
                  }}
                >
                  Confirm Delete
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    );
  },
};
