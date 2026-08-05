import type { SVGProps } from "react";

export function ZaloIcon({
  className = "w-4 h-4 mr-2 shrink-0",
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Zalo Logo</title>
      <rect width="48" height="48" rx="10" fill="#0068FF" />
      <path
        d="M14.5 15.5H23.5L16 26.5H25.5"
        stroke="white"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M26.5 22C26.5 20.3431 27.8431 19 29.5 19C31.1569 19 32.5 20.3431 32.5 22V26.5C32.5 28.1569 31.1569 29.5 29.5 29.5C27.8431 29.5 26.5 28.1569 26.5 26.5V22Z"
        stroke="white"
        strokeWidth="3.5"
      />
      <path
        d="M34 15.5V29.5"
        stroke="white"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
