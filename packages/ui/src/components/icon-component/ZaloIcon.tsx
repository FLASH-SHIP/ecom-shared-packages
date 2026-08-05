import type { SVGProps } from "react";

const ZALO_BASE64_IMAGE =
  "data:image/png;base64,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";

export function ZaloIcon({
  className = "w-4 h-4 mr-2 shrink-0",
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 19 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      className={className}
      {...props}
    >
      <g filter="url(#filter0_d_971_17052)">
        <rect
          x="1"
          y="1"
          width="16.6667"
          height="16.6667"
          fill="url(#pattern0_971_17052)"
          shapeRendering="crispEdges"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_971_17052"
          x="0"
          y="0"
          width="18.6665"
          height="18.6666"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="0.5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_971_17052"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_971_17052"
            result="shape"
          />
        </filter>
        <pattern
          id="pattern0_971_17052"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use xlinkHref="#image0_971_17052" transform="scale(0.000833333)" />
        </pattern>
        <image
          id="image0_971_17052"
          width="1200"
          height="1200"
          preserveAspectRatio="none"
          xlinkHref={ZALO_BASE64_IMAGE}
          href={ZALO_BASE64_IMAGE}
        />
      </defs>
    </svg>
  );
}
