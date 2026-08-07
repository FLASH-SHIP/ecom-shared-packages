"use client";

import * as React from "react";
import { cn } from "../lib/utils";

export interface NumberInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value" | "prefix"> {
  value?: number | string | null;
  onChange?: (value: number | null, rawString: string) => void;
  precision?: number;
  allowNegative?: boolean;
  disableWheelScroll?: boolean;
  showSpinner?: boolean;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  min?: number;
  max?: number;
  className?: string;
}

export const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  (
    {
      value,
      onChange,
      precision,
      allowNegative = false,
      disableWheelScroll = true,
      showSpinner = false,
      prefix,
      suffix,
      min,
      max,
      className,
      onBlur,
      onFocus,
      onKeyDown,
      onPaste,
      onWheel,
      disabled,
      placeholder,
      id,
      ...props
    },
    ref,
  ) => {
    // Internal display state string to maintain seamless cursor movements when typing (e.g., "0.")
    const [displayValue, setDisplayValue] = React.useState<string>(() => {
      if (value === null || value === undefined || value === "") return "";
      return String(value);
    });

    const isFocusedRef = React.useRef(false);

    // Keep internal string in sync when external controlled value changes (if not actively editing)
    React.useEffect(() => {
      if (!isFocusedRef.current) {
        if (value === null || value === undefined || value === "") {
          setDisplayValue("");
        } else {
          setDisplayValue(String(value));
        }
      }
    }, [value]);

    const sanitizeInput = React.useCallback(
      (val: string): { str: string; num: number | null } => {
        if (!val) return { str: "", num: null };

        // Convert comma to dot
        let cleaned = val.replace(/,/g, ".");

        // Remove invalid characters
        if (allowNegative) {
          cleaned = cleaned.replace(/[^0-9.-]/g, "");
          // Ensure minus only at index 0
          if (cleaned.lastIndexOf("-") > 0) {
            cleaned =
              cleaned.charAt(0) === "-"
                ? `-${cleaned.replace(/-/g, "")}`
                : cleaned.replace(/-/g, "");
          }
        } else {
          cleaned = cleaned.replace(/[^0-9.]/g, "");
        }

        // Allow only one decimal point
        const parts = cleaned.split(".");
        if (parts.length > 2) {
          cleaned = `${parts[0]}.${parts.slice(1).join("")}`;
        }

        // Precision check
        if (precision === 0) {
          cleaned = cleaned.replace(/\./g, "");
        } else if (precision !== undefined && precision > 0 && parts.length === 2) {
          const p0 = parts[0] ?? "";
          const p1 = parts[1] ?? "";
          cleaned = `${p0}.${p1.slice(0, precision)}`;
        }

        if (cleaned === "" || cleaned === "-") {
          return { str: cleaned, num: null };
        }

        const parsed = parseFloat(cleaned);
        if (Number.isNaN(parsed)) {
          return { str: "", num: null };
        }

        return { str: cleaned, num: parsed };
      },
      [allowNegative, precision],
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const rawInput = e.target.value;
      const { str, num } = sanitizeInput(rawInput);
      setDisplayValue(str);
      onChange?.(num, str);
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
      onPaste?.(e);
      if (e.defaultPrevented) return;

      e.preventDefault();
      const pastedText = e.clipboardData.getData("text");
      const { str, num } = sanitizeInput(pastedText);
      setDisplayValue(str);
      onChange?.(num, str);
    };

    const handleWheel = (e: React.WheelEvent<HTMLInputElement>) => {
      if (disableWheelScroll) {
        (e.target as HTMLElement).blur();
      }
      onWheel?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      isFocusedRef.current = false;
      let finalNum: number | null = null;
      let finalStr = displayValue;

      if (displayValue && displayValue !== "-") {
        let parsed = parseFloat(displayValue);
        if (!Number.isNaN(parsed)) {
          if (min !== undefined && parsed < min) parsed = min;
          if (max !== undefined && parsed > max) parsed = max;

          finalNum = parsed;
          if (precision !== undefined) {
            finalStr = parsed.toFixed(precision);
            // Trim unnecessary trailing zeros if precision is non-zero, or keep fixed based on needs
            // E.g. for simple display:
            finalStr = String(parseFloat(finalStr));
          } else {
            finalStr = String(parsed);
          }
        } else {
          finalStr = "";
        }
      } else {
        finalStr = "";
      }

      setDisplayValue(finalStr);
      onChange?.(finalNum, finalStr);
      onBlur?.(e);
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      isFocusedRef.current = true;
      onFocus?.(e);
    };

    return (
      <div className="relative flex w-full items-center">
        {prefix && (
          <div className="absolute left-2.5 z-10 flex items-center text-xs text-muted-foreground pointer-events-none select-none">
            {prefix}
          </div>
        )}
        <input
          {...props}
          id={id}
          ref={ref}
          type="text"
          inputMode={precision === 0 ? "numeric" : "decimal"}
          disabled={disabled}
          placeholder={placeholder}
          value={displayValue}
          onChange={handleChange}
          onPaste={handlePaste}
          onWheel={handleWheel}
          onBlur={handleBlur}
          onFocus={handleFocus}
          onKeyDown={onKeyDown}
          className={cn(
            "file:text-foreground placeholder:text-muted-foreground flex h-10 w-full rounded-lg border border-input bg-background py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-ring-error/20 aria-invalid:focus-visible:ring-ring-error transition-colors duration-200",
            prefix ? "pl-7" : "px-3",
            suffix ? "pr-8" : "",
            !showSpinner && "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
            className,
          )}
        />
        {suffix && (
          <div className="absolute right-2.5 z-10 flex items-center text-xs text-muted-foreground pointer-events-none select-none">
            {suffix}
          </div>
        )}
      </div>
    );
  },
);

NumberInput.displayName = "NumberInput";
