/**
 * Pagination input for list queries.
 */
export interface PaginationInput {
  page?: number;
  perPage?: number;
}

/**
 * Paginated response wrapper.
 */
export interface PaginatedResult<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    perPage: number;
    totalPages: number;
  };
}

/**
 * Sort direction for list queries.
 */
export type SortDirection = "asc" | "desc";

/**
 * Base sort input.
 */
export interface SortInput {
  field: string;
  direction: SortDirection;
}

/**
 * Authenticated user context passed through tRPC and NestJS.
 */
export interface AuthUser {
  id: string;
  email: string;
  name: string | null;
  username: string | null;
  locale: string | null;
  permissions: string[];
}

export interface BaseAuthUser {
  id: string;
  email: string;
  name: string | null;
  displayName?: string | null;
  tokenVersion?: number;
}

/**
 * Response shape for Admin login REST endpoint (/api/v1/auth/login)
 */
export interface AdminAuthResponse {
  success: boolean;
  data: {
    user: BaseAuthUser;
    accessToken: string;
    refreshToken: string;
    expiresIn?: number;
  };
}

/**
 * Response shape for Customer login REST endpoint (/api/v1/customer/auth/login)
 */
export interface CustomerAuthResponse {
  success: boolean;
  data: {
    user: BaseAuthUser;
    customer?: BaseAuthUser & Record<string, unknown>;
    accessToken: string;
    refreshToken: string;
    expiresIn?: number;
  };
}

export type PartnerStatus = "ACTIVE" | "INACTIVE";
export const PartnerStatus = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
} as const;

export type ServiceType = "PICKUP" | "EXPORT" | "IMPORT" | "LASTMILE";
export const ServiceType = {
  PICKUP: "PICKUP",
  EXPORT: "EXPORT",
  IMPORT: "IMPORT",
  LASTMILE: "LASTMILE",
} as const;

export enum ShippingOrigin {
  HAN = "HAN",
  SGN = "SGN",
}

export const SHIPPING_ORIGIN_LABELS: Record<ShippingOrigin, string> = {
  [ShippingOrigin.HAN]: "HAN (Hà Nội)",
  [ShippingOrigin.SGN]: "SGN (TP. HCM)",
};

export function getShippingOriginLabel(origin?: ShippingOrigin | string | null): string {
  if (!origin) return "";
  return SHIPPING_ORIGIN_LABELS[origin as ShippingOrigin] ?? origin;
}

export const SHIPPING_ORIGIN_OPTIONS = Object.values(ShippingOrigin).map((value) => ({
  value,
  label: getShippingOriginLabel(value),
}));

export enum ShippingMethod {
  EXPRESS = "EXPRESS",
  EPACKET = "EPACKET",
}

export const SHIPPING_METHOD_LABELS: Record<ShippingMethod, string> = {
  [ShippingMethod.EPACKET]: "ePacket",
  [ShippingMethod.EXPRESS]: "Express",
};

export function getShippingMethodLabel(method?: ShippingMethod | string | null): string {
  if (!method) return "";
  return SHIPPING_METHOD_LABELS[method as ShippingMethod] ?? method;
}

export const SHIPPING_METHOD_OPTIONS = Object.values(ShippingMethod).map((value) => ({
  value,
  label: getShippingMethodLabel(value),
}));

/**
 * Topup Transaction Status Enum
 * 1 = Waiting, 2 = Confirmed, 3 = Reject
 */
export enum TopupStatus {
  WAITING = 1,
  CONFIRMED = 2,
  REJECT = 3,
}

export type OrderStatus =
  | "DRAFT"
  | "PENDING"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED"
  | "RETURNED"
  | "LABEL_CREATED"
  | "PENDING_LABEL"
  | "PACKAGE_RECEIVED"
  | "ON_THE_WAY"
  | "PICK_UP"
  | "DELIVERY";

export type PackingBoxType = "BOX" | "BAG" | "PALLET" | "ENVELOPE";

export type RateCardStatus =
  | "ACTIVE"
  | "INACTIVE"
  | "DRAFT"
  | "ARCHIVED"
  | "PUBLISHED"
  | "PENDING"
  | "REVIEW"
  | "REJECTED";

export type RateCardType = "DEFAULT" | "CUSTOM" | "STANDARD" | "SPECIAL" | "PROMOTIONAL";

export type ContentStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED" | "PENDING" | "REVIEW" | "REJECTED";

/**
 * Shared phone number validation regex for all apps (backend & frontend):
 * - Optional '+' at the start
 * - Followed by 9 to 15 digits (0-9)
 */
export const PHONE_REGEX = /^\+?[0-9]{9,15}$/;

/**
 * Standardized Vietnamese validation error messages for phone numbers.
 */
export const PHONE_VALIDATION_MESSAGES = {
  SENDER: "Số điện thoại người gửi chỉ được chứa chữ số, dấu + ở đầu và từ 9-15 ký tự.",
  RECEIVER: "Số điện thoại người nhận chỉ được chứa chữ số, dấu + ở đầu và từ 9-15 ký tự.",
} as const;

/**
 * Whitelist of supported sender country codes (ISO 2-letter).
 * Easily expandable in the future (e.g. ['VN', 'US', 'TH']).
 */
export const ALLOWED_SENDER_COUNTRIES = ["VN"] as const;
export type AllowedSenderCountry = (typeof ALLOWED_SENDER_COUNTRIES)[number];

export const SENDER_COUNTRY_VALIDATION_MESSAGE = "Quốc gia người gửi (senderCountry) chưa được hỗ trợ";

export function isAllowedSenderCountry(country?: string | null): country is AllowedSenderCountry {
  if (!country) return false;
  return (ALLOWED_SENDER_COUNTRIES as readonly string[]).includes(country.toUpperCase().trim());
}

/**
 * Shared limits for order parcel dimensions & weight in logistics.
 */
export const MAX_DECLARED_WEIGHT_GRAMS = 70000; // 70 kg
export const MAX_DIMENSION_CM = 300; // 300 cm

export const PARCEL_VALIDATION_MESSAGES = {
  WEIGHT_MAX: "Trọng lượng khai báo (declaredWeight) không được vượt quá 70,000 grams (70kg)",
  LENGTH_MAX: "Chiều dài (dimensionLength) không được vượt quá 300 cm",
  WIDTH_MAX: "Chiều rộng (dimensionWidth) không được vượt quá 300 cm",
  HEIGHT_MAX: "Chiều cao (dimensionHeight) không được vượt quá 300 cm",
  EMAIL_SENDER_INVALID: "Email người gửi (senderEmail) không đúng định dạng email",
  EMAIL_RECEIVER_INVALID: "Email người nhận (receiverEmail) không đúng định dạng email",
} as const;


