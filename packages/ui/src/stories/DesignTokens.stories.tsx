import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  title: "Design System/Design Tokens",
  parameters: {
    layout: "padded",
  },
};

export default meta;

type Story = StoryObj;

const colorTokens = [
  { name: "Brand", varName: "--color-brand", cssVar: "--brand", description: "Primary brand identifier" },
  { name: "Primary", varName: "--color-primary", cssVar: "--primary", description: "Primary action elements & buttons" },
  { name: "Secondary", varName: "--color-secondary", cssVar: "--secondary", description: "Secondary actions & neutral fills" },
  { name: "Muted", varName: "--color-muted", cssVar: "--muted", description: "Disabled / subtle background containers" },
  { name: "Accent", varName: "--color-accent", cssVar: "--accent", description: "Hover state highlights & focus accents" },
  { name: "Destructive", varName: "--color-destructive", cssVar: "--destructive", description: "Dangerous / delete actions & errors" },
  { name: "Success", varName: "--color-success", cssVar: "--success", description: "Success states, active badges" },
  { name: "Warning", varName: "--color-warning", cssVar: "--warning", description: "Warning notices, pending status" },
  { name: "Info", varName: "--color-info", cssVar: "--info", description: "Information callouts" },
  { name: "Card", varName: "--color-card", cssVar: "--card", description: "Surface cards & containers" },
  { name: "Popover", varName: "--color-popover", cssVar: "--popover", description: "Dropdowns & floating overlays" },
  { name: "Border", varName: "--color-border", cssVar: "--border", description: "Component dividers & outlines" },
];

const radiiTokens = [
  { name: "Small", class: "rounded-sm", varName: "--radius-sm", value: "6px" },
  { name: "Medium", class: "rounded-md", varName: "--radius-md", value: "8px" },
  { name: "Large", class: "rounded-lg", varName: "--radius-lg", value: "12px" },
  { name: "Extra Large", class: "rounded-xl", varName: "--radius-xl", value: "16px" },
  { name: "Full", class: "rounded-full", varName: "--radius-full", value: "9999px" },
];

export const Overview: Story = {
  render: () => (
    <div className="space-y-10 p-4 max-w-5xl font-sans text-foreground">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">FlashShip Ecom — Design Tokens</h1>
        <p className="text-muted-foreground mt-1">
          System tokens for colors, border-radii, elevation, and layer z-index.
        </p>
      </div>

      {/* Color Palette */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold border-b border-border pb-2">Color Palette</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {colorTokens.map((token) => (
            <div
              key={token.name}
              className="p-4 rounded-xl border border-border bg-card shadow-xs flex items-center gap-4"
            >
              <div
                className="w-12 h-12 rounded-lg border border-border shrink-0 shadow-inner"
                style={{ backgroundColor: `var(${token.cssVar})` }}
              />
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-sm">{token.name}</p>
                <p className="text-xs font-mono text-muted-foreground truncate">{token.varName}</p>
                <p className="text-xs text-muted-foreground/80 mt-0.5">{token.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Border Radii */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold border-b border-border pb-2">Border Radii</h2>
        <div className="flex flex-wrap gap-6 items-end">
          {radiiTokens.map((item) => (
            <div key={item.name} className="flex flex-col items-center gap-2">
              <div
                className={`w-24 h-24 bg-primary/15 border-2 border-primary ${item.class} flex items-center justify-center font-mono text-xs font-semibold`}
              >
                {item.value}
              </div>
              <span className="text-xs font-medium">{item.name}</span>
              <span className="text-[10px] font-mono text-muted-foreground">{item.varName}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Elevation & Shadows */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold border-b border-border pb-2">Elevation & Shadows</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          <div className="p-6 bg-card rounded-lg border border-border shadow-xs text-center font-medium text-sm">
            shadow-xs
          </div>
          <div className="p-6 bg-card rounded-lg border border-border shadow-sm text-center font-medium text-sm">
            shadow-sm
          </div>
          <div className="p-6 bg-card rounded-lg border border-border shadow-md text-center font-medium text-sm">
            shadow-md
          </div>
          <div className="p-6 bg-card rounded-lg border border-border shadow-lg text-center font-medium text-sm">
            shadow-lg
          </div>
        </div>
      </section>
    </div>
  ),
};
