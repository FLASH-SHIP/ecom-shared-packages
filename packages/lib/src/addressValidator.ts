import { translate } from "@flash-ship/ecom-i18n";

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
): PostalCodeValidationResult {
  const iso2 = normalizeCountryCode(countryInput);
  const valid = validatePostalCode(iso2, zipCodeInput);
  const formattedZipCode = valid ? formatPostalCode(iso2, zipCodeInput) : null;
  const ruleInfo = getPostalCodeRuleInfo(iso2);

  let message: string | undefined;
  if (!valid) {
    if (ruleInfo) {
      message = `Mã bưu chính không đúng định dạng cho quốc gia ${iso2}. ${ruleInfo.description}`;
    } else {
      message = `Mã bưu chính không đúng định dạng cho quốc gia ${iso2} (yêu cầu từ 3-10 ký tự)`;
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
          message: `Mã bưu chính ${zip} không khớp với Bang ${state} tại Hoa Kỳ (US)`,
        };
      }
    }
  }

  return { match: true };
}

/**
 * Validate State format according to Country.
 * US: Exactly 2 uppercase letters (e.g. CA, NY, WA)
 * Other countries: Max 50 characters
 */
export function validateReceiverState(
  countryCode: string,
  state: string,
  locale?: string,
): { valid: boolean; message?: string } {
  if (!state || state.trim() === "") {
    return {
      valid: false,
      message: translate("customerOrder.validation.receiverStateRequired", locale),
    };
  }
  const cleanCountry = normalizeCountryCode(countryCode);
  const cleanState = state.trim();

  if (cleanCountry === "US") {
    if (!/^[A-Z]{2}$/.test(cleanState.toUpperCase())) {
      return {
        valid: false,
        message: translate("customerOrder.validation.receiverStateUsFormat", locale),
      };
    }
  } else {
    if (cleanState.length > 50) {
      return {
        valid: false,
        message: translate("customerOrder.validation.receiverStateMax", locale),
      };
    }
  }
  return { valid: true };
}

/**
 * Validate Receiver Name: Required, max 100 chars, no special characters.
 * Allows letters, numbers, spaces, Vietnamese/accented characters, hyphens, apostrophes, dots.
 */
export function validateReceiverName(name: string): { valid: boolean; message?: string } {
  if (!name || name.trim() === "") {
    return { valid: false, message: "Vui lòng nhập tên người nhận" };
  }
  const cleanName = name.trim();
  if (cleanName.length > 100) {
    return { valid: false, message: "Tên người nhận không được vượt quá 100 ký tự" };
  }
  const validPattern = /^[a-zA-Z0-9\s\u00C0-\u024F\u1EA0-\u1EF9'.-]+$/;
  if (!validPattern.test(cleanName)) {
    return { valid: false, message: "Tên người nhận không được chứa ký tự đặc biệt" };
  }
  return { valid: true };
}

/**
 * Validate Receiver Phone: Optional, max 15 chars.
 */
export function validateReceiverPhone(phone?: string | null): { valid: boolean; message?: string } {
  if (!phone || phone.trim() === "") {
    return { valid: true };
  }
  const cleanPhone = phone.trim();
  if (cleanPhone.length > 15) {
    return { valid: false, message: "Số điện thoại không được vượt quá 15 ký tự" };
  }
  return { valid: true };
}

/**
 * Validate Receiver Email: Optional, valid email format.
 */
export function validateReceiverEmail(email?: string | null): { valid: boolean; message?: string } {
  if (!email || email.trim() === "") {
    return { valid: true };
  }
  const cleanEmail = email.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(cleanEmail)) {
    return { valid: false, message: "Email không đúng định dạng chuẩn (VD: example@domain.com)" };
  }
  return { valid: true };
}
