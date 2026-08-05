import type React from "react";

export interface ZaloIconProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  className?: string;
  width?: number;
  height?: number;
}

export function ZaloIcon({
  className = "w-4 h-4 mr-2 shrink-0 inline-block object-contain",
  width = 16,
  height = 16,
  alt = "Zalo Icon",
  ...props
}: ZaloIconProps) {
  return (
    <img
      src="/assets/icons/social/ZaloIcon.jpg"
      alt={alt}
      width={width}
      height={height}
      className={className}
      {...props}
    />
  );
}
