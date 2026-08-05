import type React from "react";

export interface ZaloIconProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  className?: string;
  width?: number;
  height?: number;
  alt?: string;
}

export function ZaloIcon({
  className = "w-4 h-4 shrink-0 inline-block object-contain",
  width = 19,
  height = 20,
  alt = "Zalo Icon",
  ...props
}: ZaloIconProps) {
  return (
    <img
      src="/assets/icons/social/ZaloIcon.svg"
      alt={alt}
      width={width}
      height={height}
      className={className}
      {...props}
    />
  );
}
