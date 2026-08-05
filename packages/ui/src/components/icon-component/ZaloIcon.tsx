import type { SVGProps } from "react";

export function ZaloIcon({
  className = "w-4 h-4 mr-2 shrink-0",
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Zalo Logo</title>
      <rect width="24" height="24" rx="5" fill="#0068FF" />
      <path
        d="M5 8.5H11.5L7 15.5H13"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 11.5C14 10.1193 15.1193 9 16.5 9C17.8807 9 19 10.1193 19 11.5V13C19 14.3807 17.8807 15.5 16.5 15.5C15.1193 15.5 14 14.3807 14 13V11.5Z"
        stroke="white"
        strokeWidth="2"
      />
      <path
        d="M20 8.5V15.5"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
