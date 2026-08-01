import type { Preview } from "@storybook/react";
import "../src/styles.css";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#ffffff" },
        { name: "dark", value: "#0a0a0f" },
      ],
    },
    viewport: {
      viewports: {
        mobile: {
          name: "Mobile (iPhone 15 Pro)",
          styles: { width: "393px", height: "852px" },
        },
        tablet: {
          name: "Tablet (iPad Air)",
          styles: { width: "820px", height: "1180px" },
        },
        desktop: {
          name: "Desktop HD",
          styles: { width: "1440px", height: "900px" },
        },
      },
    },
  },
  decorators: [
    (Story, context) => {
      const isDark = context.globals.backgrounds?.value === "#0a0a0f";
      if (typeof document !== "undefined") {
        if (isDark) {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      }
      return Story();
    },
  ],
};

export default preview;
