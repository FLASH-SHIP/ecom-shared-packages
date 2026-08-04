import { translate } from "@flash-ship/ecom-i18n";
import { PHONE_REGEX } from "@flash-ship/ecom-types";

export interface PostalCodeRule {
  regex: RegExp;
  description: string;
  example: string;
  isOptional?: boolean;
}

export interface PostalCodeValidationResult {
  valid: boolean;
  formattedZipCode: string | null;
  message?: string;
  ruleInfo?: PostalCodeRule | null;
}

/**
 * ISO3 and Country Name mappings to ISO2 (alpha-2) country codes.
 * Ensures robust resolution when users/Excel imports provide "USA", "UK", "VNM", "DEU", etc.
 */
export const COUNTRY_ISO_MAP: Record<string, string> = {
  // ISO3 -> ISO2
  USA: "US",
  GBR: "GB",
  CAN: "CA",
  AUS: "AU",
  NZL: "NZ",
  KOR: "KR",
  JPN: "JP",
  CHN: "CN",
  VNM: "VN",
  THA: "TH",
  SGP: "SG",
  MYS: "MY",
  IDN: "ID",
  PHL: "PH",
  DEU: "DE",
  FRA: "FR",
  ITA: "IT",
  ESP: "ES",
  NLD: "NL",
  CHE: "CH",
  AUT: "AT",
  BEL: "BE",
  PRT: "PT",
  MEX: "MX",
  BRA: "BR",
  ARE: "AE",
  QAT: "QA",
  BHR: "BH",
  KWT: "KW",
  OMN: "OM",
  BHS: "BS",
  JAM: "JM",
  HKG: "HK",
  MAC: "MO",
  GHA: "GH",
  UGA: "UG",
  ZWE: "ZW",
  // Common Aliases
  UK: "GB",
  "UNITED STATES": "US",
  "UNITED KINGDOM": "GB",
  "VIET NAM": "VN",
  VIETNAM: "VN",
  GERMANY: "DE",
  FRANCE: "FR",
  JAPAN: "JP",
  CHINA: "CN",
  CANADA: "CA",
  AUSTRALIA: "AU",
};

/**
 * Normalizes any country input (ISO2, ISO3, common name) into standard 2-letter ISO2 uppercase code.
 */
export function normalizeCountryCode(countryInput?: string | null): string {
  if (!countryInput) return "";
  const cleaned = countryInput.trim().toUpperCase();
  return COUNTRY_ISO_MAP[cleaned] || cleaned;
}

/**
 * Set of countries that do NOT use zipcodes or where zipcodes are optional / "N/A".
 * O(1) lookup performance.
 */
export const NO_ZIPCODE_COUNTRIES: ReadonlySet<string> = new Set([
  "AE", // UAE
  "QA", // Qatar
  "BH", // Bahrain
  "KW", // Kuwait
  "OM", // Oman
  "BS", // Bahamas
  "JM", // Jamaica
  "HK", // Hong Kong
  "MO", // Macau
  "GH", // Ghana
  "UG", // Uganda
  "ZW", // Zimbabwe
]);

// Rule Presets for common numeric postal code patterns
const RULE_NUMERIC_3: Omit<PostalCodeRule, "example"> = {
  regex: /^\d{3}$/,
  description: "3 chữ số",
};
const RULE_NUMERIC_4: Omit<PostalCodeRule, "example"> = {
  regex: /^\d{4}$/,
  description: "4 chữ số",
};
const RULE_NUMERIC_5: Omit<PostalCodeRule, "example"> = {
  regex: /^\d{5}$/,
  description: "5 chữ số",
};
const RULE_NUMERIC_6: Omit<PostalCodeRule, "example"> = {
  regex: /^\d{6}$/,
  description: "6 chữ số",
};

/**
 * Master regex table for 240+ countries based on Global_Zipcode_Validation_Master PDF.
 */
export const COUNTRY_POSTAL_CODE_RULES: Record<string, PostalCodeRule> = {
  // Complex & Unique Rules
  US: {
    regex: /^\d{5}(-\d{4})?$/,
    description: "Đúng 5 chữ số (VD: 90210) hoặc ZIP+4 (VD: 98665-7842)",
    example: "90210",
  },
  GB: {
    regex: /^[A-Za-z]{1,2}\d[A-Za-z\d]?\s*\d[A-Za-z]{2}$/,
    description: "Mã bưu chính Anh dạng SW1A 1AA hoặc RH20 3HD",
    example: "SW1A 1AA",
  },
  UK: {
    regex: /^[A-Za-z]{1,2}\d[A-Za-z\d]?\s*\d[A-Za-z]{2}$/,
    description: "Mã bưu chính Anh dạng SW1A 1AA hoặc RH20 3HD",
    example: "SW1A 1AA",
  },
  CA: {
    regex: /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/,
    description: "Dạng xen kẽ A1A 1A1 (VD: K1A 0B1, M5V 2T6)",
    example: "K1A 0B1",
  },
  JP: {
    regex: /^\d{3}-?\d{4}$/,
    description: "7 chữ số dạng 100-0001 hoặc 1000001",
    example: "100-0001",
  },
  VN: { regex: /^\d{5,6}$/, description: "5 hoặc 6 chữ số", example: "70000" },
  NL: {
    regex: /^\d{4}\s?[A-Za-z]{2}$/,
    description: "4 số + 2 chữ dạng 1012 JS",
    example: "1012 JS",
  },
  PT: { regex: /^\d{4}-\d{3}$/, description: "Dạng 1000-001", example: "1000-001" },
  BR: {
    regex: /^\d{5}-?\d{3}$/,
    description: "Dạng 01001-000 hoặc 01001000",
    example: "01001-000",
  },
  AR: {
    regex: /^[A-Za-z]\d{4}[A-Za-z]{3}$/,
    description: "8 ký tự chữ và số (VD: C1064AAM)",
    example: "C1064AAM",
  },

  // 3-digit Group
  PG: { ...RULE_NUMERIC_3, example: "111" },

  // 4-digit Group
  AU: { ...RULE_NUMERIC_4, example: "2000" },
  NZ: { ...RULE_NUMERIC_4, example: "1010" },
  PH: { ...RULE_NUMERIC_4, example: "1000" },
  CH: { ...RULE_NUMERIC_4, example: "8000" },
  AT: { ...RULE_NUMERIC_4, example: "1010" },
  BE: { ...RULE_NUMERIC_4, example: "1000" },
  ZA: { ...RULE_NUMERIC_4, example: "8001" },
  TN: { ...RULE_NUMERIC_4, example: "1000" },

  // 5-digit Group
  KR: { ...RULE_NUMERIC_5, example: "04524" },
  TH: { ...RULE_NUMERIC_5, example: "10100" },
  MY: { ...RULE_NUMERIC_5, example: "50000" },
  ID: { ...RULE_NUMERIC_5, example: "10110" },
  DE: { ...RULE_NUMERIC_5, example: "10115" },
  FR: { ...RULE_NUMERIC_5, example: "75001" },
  IT: { ...RULE_NUMERIC_5, example: "00100" },
  ES: { ...RULE_NUMERIC_5, example: "28001" },
  MX: { ...RULE_NUMERIC_5, example: "01000" },
  EG: { ...RULE_NUMERIC_5, example: "12561" },
  DZ: { ...RULE_NUMERIC_5, example: "16000" },

  // 6-digit Group
  CN: { ...RULE_NUMERIC_6, example: "100000" },
  SG: { ...RULE_NUMERIC_6, example: "018989" },
  TW: { ...RULE_NUMERIC_6, example: "100001" },
  IN: { ...RULE_NUMERIC_6, example: "282001" },
  KH: { ...RULE_NUMERIC_6, example: "120000" },
  CO: { ...RULE_NUMERIC_6, example: "110111" },
  EC: { ...RULE_NUMERIC_6, example: "170150" },
  NG: { ...RULE_NUMERIC_6, example: "900001" },
  MW: { ...RULE_NUMERIC_6, example: "312100" },
};

/**
 * Checks whether a given country code belongs to the No-Zipcode list.
 */
export function isNoZipcodeCountry(countryInput?: string | null): boolean {
  if (!countryInput) return false;
  const iso2 = normalizeCountryCode(countryInput);
  return NO_ZIPCODE_COUNTRIES.has(iso2);
}

function formatCountrySpecificPostalCode(iso2: string, value: string): string {
  switch (iso2) {
    case "CA":
      if (/^[A-Z]\d[A-Z]\d[A-Z]\d$/.test(value)) {
        return `${value.slice(0, 3)} ${value.slice(3)}`;
      }
      break;
    case "GB":
    case "UK":
      if (/^[A-Z]{1,2}\d[A-Z\d]?\d[A-Z]{2}$/.test(value)) {
        const splitIdx = value.length - 3;
        return `${value.slice(0, splitIdx)} ${value.slice(splitIdx)}`;
      }
      break;
    case "NL":
      if (/^\d{4}[A-Z]{2}$/.test(value)) {
        return `${value.slice(0, 4)} ${value.slice(4)}`;
      }
      break;
    case "JP":
      if (/^\d{7}$/.test(value)) {
        return `${value.slice(0, 3)}-${value.slice(3)}`;
      }
      break;
    case "PT":
      if (/^\d{7}$/.test(value)) {
        return `${value.slice(0, 4)}-${value.slice(4)}`;
      }
      break;
    case "BR":
      if (/^\d{8}$/.test(value)) {
        return `${value.slice(0, 5)}-${value.slice(5)}`;
      }
      break;
  }
  return value;
}

/**
 * Standardizes and formats zipcode into carrier-ready format.
 * E.g. Canada "k1a0b1" -> "K1A 0B1", UK "sw1a1aa" -> "SW1A 1AA", No-zipcode -> "N/A"
 */
export function formatPostalCode(
  countryInput?: string | null,
  zipCodeInput?: string | null,
): string {
  const iso2 = normalizeCountryCode(countryInput);
  const trimmed = (zipCodeInput || "").trim();

  if (isNoZipcodeCountry(iso2)) {
    return trimmed === "" || /^(NA|N\/A|NONE|00000)$/i.test(trimmed)
      ? "N/A"
      : trimmed.toUpperCase();
  }

  if (!trimmed) return "";

  const value = ["GB", "UK", "CA", "NL", "AR"].includes(iso2) ? trimmed.toUpperCase() : trimmed;
  return formatCountrySpecificPostalCode(iso2, value);
}

/**
 * Validate postal code / zip code dynamically according to country code.
 */
export function validatePostalCode(
  countryInput?: string | null,
  zipCodeInput?: string | null,
): boolean {
  const iso2 = normalizeCountryCode(countryInput);
  const zipCode = (zipCodeInput || "").trim();

  // 1. If country does not require Zipcode
  if (isNoZipcodeCountry(iso2)) {
    if (!zipCode || /^(NA|N\/A|NONE|00000)$/i.test(zipCode)) return true;
    return zipCode.length <= 10;
  }

  // 2. Mandatory for other countries
  if (!zipCode) return false;

  // 3. Match against Master Rules if available
  const rule = COUNTRY_POSTAL_CODE_RULES[iso2];
  if (rule) {
    const formatted = formatPostalCode(iso2, zipCode);
    return rule.regex.test(zipCode) || rule.regex.test(formatted);
  }

  // 4. Default Fallback for unconfigured 210+ countries: 3 to 10 chars (alphanumeric, space, hyphen)
  return /^[A-Za-z0-9\s-]{3,10}$/.test(zipCode);
}

/**
 * Enterprise validation & formatting result object.
 */
export function validateAndFormatPostalCode(
  countryInput?: string | null,
  zipCodeInput?: string | null,
  locale?: string,
): PostalCodeValidationResult {
  const iso2 = normalizeCountryCode(countryInput);
  const valid = validatePostalCode(iso2, zipCodeInput);
  const formattedZipCode = valid ? formatPostalCode(iso2, zipCodeInput) : null;
  const ruleInfo = getPostalCodeRuleInfo(iso2);

  let message: string | undefined;
  if (!valid) {
    if (ruleInfo) {
      message =
        translate("customerOrder.validation.zipCodeInvalidFormat", locale, { country: iso2 }) ||
        `Mã bưu chính không đúng định dạng cho quốc gia ${iso2}. ${ruleInfo.description}`;
    } else {
      message =
        translate("customerOrder.validation.zipCodeInvalidFormat", locale, { country: iso2 }) ||
        `Mã bưu chính không đúng định dạng cho quốc gia ${iso2} (yêu cầu từ 3-10 ký tự)`;
    }
  }

  return {
    valid,
    formattedZipCode,
    message,
    ruleInfo,
  };
}

/**
 * Get human-readable format requirement description or example for a country's postal code.
 */
export function getPostalCodeRuleInfo(countryInput?: string | null): PostalCodeRule | null {
  const iso2 = normalizeCountryCode(countryInput);
  if (isNoZipcodeCountry(iso2)) {
    return {
      regex: /^.*$/,
      description: "Quốc gia này không bắt buộc nhập Zipcode (có thể để trống hoặc điền N/A)",
      example: "N/A",
      isOptional: true,
    };
  }
  return COUNTRY_POSTAL_CODE_RULES[iso2] || null;
}

/**
 * Validate State & Zipcode alignment (Cross-validation for US, UK, etc.).
 */
export function validateStateZipMatch(
  countryInput?: string | null,
  stateInput?: string | null,
  zipCodeInput?: string | null,
  locale?: string,
): { match: boolean; message?: string } {
  const iso2 = normalizeCountryCode(countryInput);
  const state = (stateInput || "").trim().toUpperCase();
  const zip = (zipCodeInput || "").trim();

  if (iso2 === "US" && state && zip) {
    // US State ZIP code prefix verification
    const usZipPrefixes: Record<string, string[]> = {
      CA: ["90", "91", "92", "93", "94", "95", "96"],
      NY: ["10", "11", "12", "13", "14"],
      TX: ["73", "74", "75", "76", "77", "78", "79"],
      FL: ["32", "33", "34"],
      WA: ["98", "99"],
      IL: ["60", "61", "62"],
    };

    const allowedPrefixes = usZipPrefixes[state];
    if (allowedPrefixes) {
      const zipPrefix2 = zip.slice(0, 2);
      if (!allowedPrefixes.includes(zipPrefix2)) {
        return {
          match: false,
          message:
            translate("customerOrder.validation.stateZipMismatch", locale, { zip, state }) ||
            `Mã bưu chính ${zip} không khớp với Bang ${state} tại Hoa Kỳ (US)`,
        };
      }
    }
  }

  return { match: true };
}

/**
 * Validate Receiver Name: Required, max 100 chars, no special characters.
 * Allows letters, numbers, spaces, Vietnamese/accented characters, hyphens, apostrophes, dots.
 */
export function validateReceiverName(
  name: string,
  locale?: string,
): { valid: boolean; message?: string } {
  if (!name || name.trim() === "") {
    return {
      valid: false,
      message: translate("customerOrder.validation.receiverNameRequired", locale) || "Vui lòng nhập tên người nhận",
    };
  }
  const cleanName = name.trim();
  if (cleanName.length > 100) {
    return {
      valid: false,
      message: translate("customerOrder.validation.receiverNameMax", locale) || "Tên người nhận không được vượt quá 100 ký tự",
    };
  }
  const validPattern = /^[a-zA-Z0-9\s\u00C0-\u024F\u1EA0-\u1EF9'.-]+$/;
  if (!validPattern.test(cleanName)) {
    return {
      valid: false,
      message: translate("customerOrder.validation.receiverNameInvalid", locale) || "Tên người nhận không được chứa ký tự đặc biệt",
    };
  }
  return { valid: true };
}

/**
 * Set of countries that require 2-letter uppercase ISO/ANSI State codes.
 */
export const ISO2_2CHAR_STATE_COUNTRIES: ReadonlySet<string> = new Set([
  "US",
  "CA",
  "AU",
  "BR",
  "MX",
  "IN",
  "IT",
]);

/**
 * Set of countries that do not use State/Province or where State is optional.
 */
export const NO_STATE_COUNTRIES: ReadonlySet<string> = new Set([
  "SG",
  "HK",
  "MO",
  "AE",
  "QA",
  "BH",
  "KW",
  "OM",
  "BS",
  "JM",
  "GH",
  "UG",
  "ZW",
  "VN",
  "TH",
  "PH",
  "ID",
  "MY",
]);

/**
 * Kiểm tra chuỗi chỉ chứa ký tự ASCII / Latin hiển thị được (không chứa tiếng Việt có dấu hoặc Emoji).
 */
export function isAsciiLatinOnly(str: string): boolean {
  return /^[\x20-\x7E]*$/.test(str);
}

/**
 * Kiểm tra xem địa chỉ có phải là Hộp thư P.O. Box / APO / FPO / DPO hay không.
 */
export function isPoBoxAddress(address: string): boolean {
  if (!address) return false;
  return /\b(P\.?\s*O\.?\s*BOX|A\.?\s*P\.?\s*O|F\.?\s*P\.?\s*O)\b/i.test(address);
}

/**
 * Kiểm tra địa chỉ có chứa cả số nhà và tên đường hay không.
 */
export function containsHouseNumberAndStreet(address: string): boolean {
  if (!address) return false;
  const clean = address.trim();
  // Chứa ít nhất 1 chữ số và 1 chữ cái
  return /\d/.test(clean) && /[a-zA-Z]/.test(clean);
}

/**
 * Bộ kiểm tra Bang/Tỉnh người nhận nâng cao (Master State Engine).
 * Áp dụng quy tắc mã 2 ký tự (US, CA, AU...), miễn trừ cho quốc gia không có Bang (SG, HK, AE...), và giới hạn 50 ký tự.
 */
export function validateReceiverState(
  countryCode?: string | null,
  state?: string | null,
  locale?: string,
): { valid: boolean; message?: string } {
  const cleanCountry = normalizeCountryCode(countryCode);
  const cleanState = (state || "").trim();

  // Nếu quốc gia nằm trong danh sách không có Bang, tự động bỏ qua kiểm tra
  if (NO_STATE_COUNTRIES.has(cleanCountry)) {
    return { valid: true };
  }

  if (!cleanState) {
    return {
      valid: false,
      message: translate("customerOrder.validation.receiverStateRequired", locale) || "Vui lòng nhập/chọn bang/tỉnh",
    };
  }

  if (ISO2_2CHAR_STATE_COUNTRIES.has(cleanCountry)) {
    if (!/^[A-Za-z]{2}$/.test(cleanState)) {
      return {
        valid: false,
        message:
          translate("customerOrder.validation.receiverStateUsFormat", locale) ||
          `Bang tại ${cleanCountry} phải là mã 2 ký tự viết hoa (VD: CA, NY, ON)`,
      };
    }
  } else {
    if (cleanState.length > 50) {
      return {
        valid: false,
        message:
          translate("customerOrder.validation.receiverStateMax", locale) ||
          "State không được vượt quá 50 ký tự",
      };
    }
  }
  return { valid: true };
}

/**
 * Kiểm tra Địa chỉ 1 người nhận (Address 1):
 * Bắt buộc nhập, tối đa 50 ký tự ASCII/Latin không dấu, chặn giao P.O. Box / APO / FPO.
 */
export function validateReceiverAddress1(
  address?: string | null,
  locale?: string,
): { valid: boolean; message?: string } {
  if (!address || address.trim() === "") {
    return {
      valid: false,
      message:
        translate("customerOrder.validation.receiverAddress1Required", locale) ||
        "Vui lòng nhập địa chỉ người nhận",
    };
  }
  const clean = address.trim();
  if (clean.length > 50) {
    return {
      valid: false,
      message:
        translate("customerOrder.validation.receiverAddress1Max50", locale) ||
        "Địa chỉ 1 không được vượt quá 50 ký tự ASCII/Latin",
    };
  }
  if (!isAsciiLatinOnly(clean)) {
    return {
      valid: false,
      message:
        translate("customerOrder.validation.addressAsciiOnly", locale) ||
        "Địa chỉ chỉ được chứa ký tự ASCII/Latin không dấu",
    };
  }
  if (isPoBoxAddress(clean)) {
    return {
      valid: false,
      message:
        translate("customerOrder.validation.noPoBox", locale) ||
        "Hệ thống không hỗ trợ giao hàng đến hộp thư P.O. Box / APO / FPO",
    };
  }
  return { valid: true };
}

/**
 * Kiểm tra Địa chỉ 2 người nhận (Address 2):
 * Tùy chọn nhập, tối đa 50 ký tự ASCII/Latin không dấu.
 */
export function validateReceiverAddress2(
  address?: string | null,
  locale?: string,
): { valid: boolean; message?: string } {
  if (!address || address.trim() === "") return { valid: true };
  const clean = address.trim();
  if (clean.length > 50) {
    return {
      valid: false,
      message:
        translate("customerOrder.validation.receiverAddress2Max50", locale) ||
        "Địa chỉ 2 không được vượt quá 50 ký tự ASCII/Latin",
    };
  }
  if (!isAsciiLatinOnly(clean)) {
    return {
      valid: false,
      message:
        translate("customerOrder.validation.addressAsciiOnly", locale) ||
        "Địa chỉ 2 chỉ được chứa ký tự ASCII/Latin không dấu",
    };
  }
  return { valid: true };
}

/**
 * Kiểm tra Thành phố người nhận (City):
 * Bắt buộc nhập, tối đa 50 ký tự ASCII/Latin không dấu.
 */
export function validateReceiverCity(
  city?: string | null,
  locale?: string,
): { valid: boolean; message?: string } {
  if (!city || city.trim() === "") {
    return {
      valid: false,
      message:
        translate("customerOrder.validation.receiverCityRequired", locale) ||
        "Vui lòng nhập/chọn thành phố",
    };
  }
  const clean = city.trim();
  if (clean.length > 50) {
    return {
      valid: false,
      message:
        translate("customerOrder.validation.receiverCityMax50", locale) ||
        "Thành phố không được vượt quá 50 ký tự",
    };
  }
  if (!isAsciiLatinOnly(clean)) {
    return {
      valid: false,
      message:
        translate("customerOrder.validation.cityAsciiOnly", locale) ||
        "Thành phố chỉ được chứa ký tự ASCII/Latin không dấu",
    };
  }
  return { valid: true };
}

/**
 * Kiểm tra Mã đơn hàng người bán (Seller Order ID):
 * Bắt buộc nhập, tối đa 50 ký tự.
 */
export function validateSellerOrderId(
  sellerOrderId?: string | null,
  locale?: string,
): { valid: boolean; message?: string } {
  if (!sellerOrderId || sellerOrderId.trim() === "") {
    return {
      valid: false,
      message:
        translate("customerOrder.validation.sellerOrderIdRequired", locale) ||
        "Vui lòng nhập Mã đơn hàng (Seller Order ID)",
    };
  }
  const clean = sellerOrderId.trim();
  if (clean.length > 50) {
    return {
      valid: false,
      message:
        translate("customerOrder.validation.sellerOrderIdMax50", locale) ||
        "Mã đơn hàng không được vượt quá 50 ký tự",
    };
  }
  return { valid: true };
}

/**
 * Kiểm tra Mô tả chi tiết hàng hóa (Detail Description):
 * Bắt buộc nhập, tối đa 200 ký tự Tiếng Anh / Latin không dấu.
 */
export function validateDetailDescription(
  desc?: string | null,
  locale?: string,
): { valid: boolean; message?: string } {
  if (!desc || desc.trim() === "") {
    return {
      valid: false,
      message:
        translate("customerOrder.validation.detailDescriptionRequired", locale) ||
        "Vui lòng nhập mô tả hàng hóa",
    };
  }
  const clean = desc.trim();
  if (clean.length > 200) {
    return {
      valid: false,
      message:
        translate("customerOrder.validation.detailDescriptionMax200", locale) ||
        "Mô tả hàng hóa không được vượt quá 200 ký tự",
    };
  }
  if (!isAsciiLatinOnly(clean)) {
    return {
      valid: false,
      message:
        translate("customerOrder.validation.descriptionAsciiOnly", locale) ||
        "Mô tả hàng hóa phải là Tiếng Anh / Ký tự Latin không dấu",
    };
  }
  return { valid: true };
}

/**
 * Kiểm tra định dạng Mã HS Code:
 * Bắt buộc gồm từ 6 đến 10 chữ số.
 */
export function validateHSCodeFormat(
  hsCode?: string | null,
  locale?: string,
): { valid: boolean; message?: string } {
  if (!hsCode || hsCode.trim() === "") {
    return {
      valid: false,
      message:
        translate("customerOrder.validation.hsCodeRequired", locale) ||
        "Vui lòng nhập mã HS Code",
    };
  }
  const clean = hsCode.trim().replace(/\D/g, "");
  if (!/^\d{6,10}$/.test(clean)) {
    return {
      valid: false,
      message:
        translate("customerOrder.validation.hsCodeInvalidFormat", locale) ||
        "Mã HS Code phải gồm từ 6 đến 10 chữ số",
    };
  }
  return { valid: true };
}

/**
 * Phân tích & Kiểm tra Trọng lượng hàng hóa (gram):
 * Hỗ trợ chuỗi nhập như "1360g", "1050G", "1.5kg" -> Trả về số nguyên gram > 0.
 */
export function parseAndValidateWeight(
  input?: string | number | null,
  locale?: string,
): { valid: boolean; weightGrams: number | null; message?: string } {
  if (input === undefined || input === null || String(input).trim() === "") {
    return {
      valid: false,
      weightGrams: null,
      message: translate("customerOrder.validation.packageWeightRequired", locale) || "Vui lòng nhập trọng lượng",
    };
  }
  const raw = String(input).trim().replace(/g$/i, "");
  if (!/^[0-9]+$/.test(raw)) {
    return {
      valid: false,
      weightGrams: null,
      message:
        translate("customerOrder.validation.packageWeightIntegerOnly", locale) ||
        "Cân nặng gói hàng chỉ được nhập số nguyên (0-9)",
    };
  }
  const grams = parseInt(raw, 10);
  if (Number.isNaN(grams) || grams <= 0) {
    return {
      valid: false,
      weightGrams: null,
      message: translate("customerOrder.validation.packageWeightMin", locale) || "Cân nặng gói hàng phải lớn hơn 0",
    };
  }
  return { valid: true, weightGrams: grams };
}

/**
 * Phân tích & Kiểm tra Kích thước kiện hàng (cm):
 * Hỗ trợ các định dạng "60,5x60x1,5", "60*60*20" -> Phân tách thành { length, width, height } số thực > 0.
 */
export function parseAndValidateDimensions(
  input?: string | null,
  locale?: string,
): { valid: boolean; length: number; width: number; height: number; message?: string } {
  if (!input || input.trim() === "") {
    return { valid: true, length: 0, width: 0, height: 0 };
  }
  const parts = input.trim().toLowerCase().split(/[x*X]/);
  if (parts.length !== 3) {
    return {
      valid: false,
      length: 0,
      width: 0,
      height: 0,
      message:
        translate("customerOrder.validation.dimensionsInvalidFormat", locale) ||
        "Kích thước phải dạng DàixRộngxCao (VD: 60x40x20 hoặc 60,5x40x20)",
    };
  }

  const p0 = parts[0] ?? "";
  const p1 = parts[1] ?? "";
  const p2 = parts[2] ?? "";
  const l = parseFloat(p0.replace(",", ".").trim());
  const w = parseFloat(p1.replace(",", ".").trim());
  const h = parseFloat(p2.replace(",", ".").trim());

  if (Number.isNaN(l) || Number.isNaN(w) || Number.isNaN(h) || l <= 0 || w <= 0 || h <= 0) {
    return {
      valid: false,
      length: 0,
      width: 0,
      height: 0,
      message:
        translate("customerOrder.validation.dimensionsMin", locale) ||
        "Cả 3 chiều chiều dài, rộng, cao đều phải là số thực lớn hơn 0",
    };
  }

  return { valid: true, length: l, width: w, height: h };
}

/**
 * Phân tích & Kiểm tra Giá trị khai báo USD:
 * Tự động loại bỏ ký tự tiền tệ "$15" hoặc "15$" -> Trả về số thực >= 0.
 */
export function parseAndValidateValue(
  input?: string | number | null,
  locale?: string,
): { valid: boolean; value: number | null; message?: string } {
  if (input === undefined || input === null || String(input).trim() === "") {
    return {
      valid: false,
      value: null,
      message: translate("customerOrder.validation.productValueRequired", locale) || "Vui lòng nhập giá trị",
    };
  }
  const clean = String(input).replace(/[$₫€£\s]/g, "").replace(",", ".").trim();
  const val = parseFloat(clean);
  if (Number.isNaN(val) || val < 0) {
    return {
      valid: false,
      value: null,
      message: translate("customerOrder.validation.productValueMin", locale) || "Giá trị phải là số dương lớn hơn hoặc bằng 0",
    };
  }
  return { valid: true, value: val };
}

/**
 * Hàm kiểm tra Số điện thoại dùng chung cho cả Người gửi và Người nhận.
 * Kiểm tra định dạng số điện thoại quốc tế theo PHONE_REGEX (/^\+?[0-9]{9,15}$/).
 * Cho phép dấu '+' tùy chọn ở đầu và từ 9 đến 15 chữ số.
 */
export function validatePhone(
  phone?: string | null,
  isRequired = false,
  locale?: string,
): { valid: boolean; message?: string } {
  if (!phone || phone.trim() === "") {
    if (isRequired) {
      return {
        valid: false,
        message: translate("customerOrder.validation.senderPhoneRequired", locale) || "Vui lòng nhập số điện thoại",
      };
    }
    return { valid: true };
  }

  const cleanPhone = phone.trim().replace(/[\s()-]/g, "");
  if (!PHONE_REGEX.test(cleanPhone)) {
    return {
      valid: false,
      message:
        translate("customerOrder.validation.senderPhoneInvalid", locale) ||
        "Số điện thoại chỉ được chứa chữ số, dấu + ở đầu và từ 9-15 ký tự",
    };
  }

  return { valid: true };
}

/**
 * Kiểm tra Số điện thoại người gửi (Bắt buộc nhập theo mặc định).
 */
export function validateSenderPhone(
  phone?: string | null,
  locale?: string,
): { valid: boolean; message?: string } {
  return validatePhone(phone, true, locale);
}

/**
 * Kiểm tra Số điện thoại người nhận (Tùy chọn nhập theo mặc định).
 */
export function validateReceiverPhone(
  phone?: string | null,
  locale?: string,
): { valid: boolean; message?: string } {
  return validatePhone(phone, false, locale);
}

/**
 * Kiểm tra Email người nhận: Tùy chọn nhập, đúng định dạng chuẩn RFC.
 */
export function validateReceiverEmail(email?: string | null, locale?: string): { valid: boolean; message?: string } {
  if (!email || email.trim() === "") {
    return { valid: true };
  }
  const cleanEmail = email.trim();
  if (cleanEmail.length > 254) {
    return { valid: false, message: "Email không được vượt quá 254 ký tự" };
  }
  const parts = cleanEmail.split("@");
  const localPart = parts[0] ?? "";
  const domainPart = parts[1] ?? "";
  if (parts.length !== 2 || localPart.length > 64 || !domainPart.includes(".")) {
    return {
      valid: false,
      message:
        translate("customerOrder.validation.receiverEmailInvalid", locale) ||
        "Email không đúng định dạng chuẩn (VD: example@domain.com)",
    };
  }
  return { valid: true };
}

/**
 * Type chứa dữ liệu đầu vào phục vụ kiểm tra toàn bộ thông tin Đơn hàng lẻ.
 */
export interface SingleOrderValidationInput {
  sellerOrderId?: string | null;
  shippingMethod?: string | null;
  senderName?: string | null;
  senderPhone?: string | null;
  senderAddress?: string | null;
  senderCity?: string | null;
  senderCountry?: string | null;
  receiverName?: string | null;
  receiverPhone?: string | null;
  receiverEmail?: string | null;
  receiverAddress1?: string | null;
  receiverAddress2?: string | null;
  receiverCity?: string | null;
  receiverState?: string | null;
  receiverCountry?: string | null;
  receiverZipCode?: string | null;
  detailDescription?: string | null;
  declaredWeight?: number | string | null;
  declaredValue?: number | string | null;
}

/**
 * Bộ kiểm tra dữ liệu Đơn hàng lẻ hàng loạt cấp Doanh nghiệp (Enterprise Batch Validator).
 * Sử dụng nhất quán cho Form UI, Backend TRPC API, và Quy trình Import Excel.
 * Thực thi hiệu quả tất cả quy tắc validate và trả về bản đồ mã lỗi theo từng trường.
 */
export function validateSingleOrderPayload(
  payload: SingleOrderValidationInput,
  locale?: string,
): { valid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  const sellerVal = validateSellerOrderId(payload.sellerOrderId, locale);
  if (!sellerVal.valid && sellerVal.message) errors.sellerOrderId = sellerVal.message;

  const senderPhoneVal = validateSenderPhone(payload.senderPhone, locale);
  if (!senderPhoneVal.valid && senderPhoneVal.message) errors.senderPhone = senderPhoneVal.message;

  if (payload.receiverName) {
    const nameVal = validateReceiverName(payload.receiverName, locale);
    if (!nameVal.valid && nameVal.message) errors.receiverName = nameVal.message;
  }

  const phoneVal = validateReceiverPhone(payload.receiverPhone, locale);
  if (!phoneVal.valid && phoneVal.message) errors.receiverPhone = phoneVal.message;

  const emailVal = validateReceiverEmail(payload.receiverEmail, locale);
  if (!emailVal.valid && emailVal.message) errors.receiverEmail = emailVal.message;

  const addr1Val = validateReceiverAddress1(payload.receiverAddress1, locale);
  if (!addr1Val.valid && addr1Val.message) errors.receiverAddress1 = addr1Val.message;

  if (payload.receiverAddress2) {
    const addr2Val = validateReceiverAddress2(payload.receiverAddress2, locale);
    if (!addr2Val.valid && addr2Val.message) errors.receiverAddress2 = addr2Val.message;
  }

  const cityVal = validateReceiverCity(payload.receiverCity, locale);
  if (!cityVal.valid && cityVal.message) errors.receiverCity = cityVal.message;

  const stateVal = validateReceiverState(payload.receiverCountry, payload.receiverState, locale);
  if (!stateVal.valid && stateVal.message) errors.receiverState = stateVal.message;

  const zipVal = validateAndFormatPostalCode(payload.receiverCountry, payload.receiverZipCode, locale);
  if (!zipVal.valid && zipVal.message) errors.receiverZipCode = zipVal.message;

  const descVal = validateDetailDescription(payload.detailDescription, locale);
  if (!descVal.valid && descVal.message) errors.detailDescription = descVal.message;

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
