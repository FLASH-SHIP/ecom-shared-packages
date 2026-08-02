import { describe, expect, it } from "vitest";
import {
  formatPostalCode,
  isNoZipcodeCountry,
  normalizeCountryCode,
  validateAndFormatPostalCode,
  validatePostalCode,
  validateStateZipMatch,
} from "../addressValidator";

describe("addressValidator - Global Zipcode Master Suite", () => {
  describe("normalizeCountryCode", () => {
    it("should normalize ISO2, ISO3, and common country names to ISO2", () => {
      expect(normalizeCountryCode("US")).toBe("US");
      expect(normalizeCountryCode("USA")).toBe("US");
      expect(normalizeCountryCode("United States")).toBe("US");
      expect(normalizeCountryCode("UK")).toBe("GB");
      expect(normalizeCountryCode("GBR")).toBe("GB");
      expect(normalizeCountryCode("VNM")).toBe("VN");
      expect(normalizeCountryCode("Vietnam")).toBe("VN");
      expect(normalizeCountryCode("DEU")).toBe("DE");
      expect(normalizeCountryCode("Germany")).toBe("DE");
    });
  });

  describe("isNoZipcodeCountry", () => {
    it("should correctly identify countries where Zipcode is optional / no zipcode", () => {
      expect(isNoZipcodeCountry("HK")).toBe(true);
      expect(isNoZipcodeCountry("HKG")).toBe(true);
      expect(isNoZipcodeCountry("AE")).toBe(true);
      expect(isNoZipcodeCountry("ARE")).toBe(true);
      expect(isNoZipcodeCountry("QA")).toBe(true);
      expect(isNoZipcodeCountry("BS")).toBe(true);

      expect(isNoZipcodeCountry("US")).toBe(false);
      expect(isNoZipcodeCountry("VN")).toBe(false);
    });
  });

  describe("validatePostalCode", () => {
    it("should validate No-Zipcode countries as valid when empty or N/A", () => {
      expect(validatePostalCode("HK", "")).toBe(true);
      expect(validatePostalCode("HK", null)).toBe(true);
      expect(validatePostalCode("HK", "N/A")).toBe(true);
      expect(validatePostalCode("AE", "00000")).toBe(true);
      expect(validatePostalCode("AE", "999")).toBe(true);
    });

    it("should validate US zipcodes (5-digit & ZIP+4)", () => {
      expect(validatePostalCode("US", "90210")).toBe(true);
      expect(validatePostalCode("US", "98665-7842")).toBe(true);
      expect(validatePostalCode("US", "9021")).toBe(false);
      expect(validatePostalCode("US", "902101")).toBe(false);
      expect(validatePostalCode("US", "ABCDE")).toBe(false);
    });

    it("should validate UK postcodes (GB / UK)", () => {
      expect(validatePostalCode("GB", "SW1A 1AA")).toBe(true);
      expect(validatePostalCode("UK", "RH20 3HD")).toBe(true);
      expect(validatePostalCode("GB", "sw1a1aa")).toBe(true); // Tolerant
      expect(validatePostalCode("GB", "INVALID_POSTCODE")).toBe(false);
    });

    it("should validate Canada postcodes (CA A1A 1A1)", () => {
      expect(validatePostalCode("CA", "K1A 0B1")).toBe(true);
      expect(validatePostalCode("CA", "M5V2T6")).toBe(true); // Tolerant without space
      expect(validatePostalCode("CA", "12345")).toBe(false);
    });

    it("should validate Vietnam postcodes (VN 5 & 6 digits)", () => {
      expect(validatePostalCode("VN", "70000")).toBe(true);
      expect(validatePostalCode("VN", "700000")).toBe(true);
      expect(validatePostalCode("VN", "7000")).toBe(false);
      expect(validatePostalCode("VN", "7000000")).toBe(false);
    });

    it("should validate Japan postcodes (JP 7 digits with or without hyphen)", () => {
      expect(validatePostalCode("JP", "100-0001")).toBe(true);
      expect(validatePostalCode("JP", "1000001")).toBe(true);
      expect(validatePostalCode("JP", "100-00")).toBe(false);
    });

    it("should validate Brazil postcodes (BR 8 digits with or without hyphen)", () => {
      expect(validatePostalCode("BR", "01001-000")).toBe(true);
      expect(validatePostalCode("BR", "01001000")).toBe(true);
      expect(validatePostalCode("BR", "1234")).toBe(false);
    });

    it("should fallback to 3-10 chars for unconfigured 210+ countries", () => {
      // Fiji (FJ) is unconfigured
      expect(validatePostalCode("FJ", "12345")).toBe(true);
      expect(validatePostalCode("FJ", "ABC-12")).toBe(true);
      expect(validatePostalCode("FJ", "12")).toBe(false); // < 3 chars
      expect(validatePostalCode("FJ", "12345678901")).toBe(false); // > 10 chars
    });
  });

  describe("formatPostalCode", () => {
    it("should auto-format zipcodes to carrier-ready format", () => {
      expect(formatPostalCode("CA", "k1a0b1")).toBe("K1A 0B1");
      expect(formatPostalCode("GB", "sw1a1aa")).toBe("SW1A 1AA");
      expect(formatPostalCode("NL", "1012js")).toBe("1012 JS");
      expect(formatPostalCode("JP", "1000001")).toBe("100-0001");
      expect(formatPostalCode("PT", "1000001")).toBe("1000-001");
      expect(formatPostalCode("BR", "01001000")).toBe("01001-000");
      expect(formatPostalCode("HK", "")).toBe("N/A");
    });
  });

  describe("validateAndFormatPostalCode", () => {
    it("should return detailed result object", () => {
      const resOk = validateAndFormatPostalCode("CA", "k1a0b1");
      expect(resOk.valid).toBe(true);
      expect(resOk.formattedZipCode).toBe("K1A 0B1");

      const resFail = validateAndFormatPostalCode("US", "123");
      expect(resFail.valid).toBe(false);
      expect(resFail.formattedZipCode).toBeNull();
      expect(resFail.message).toContain("US");
    });
  });

  describe("validateStateZipMatch", () => {
    it("should cross-validate US state and zip prefix", () => {
      expect(validateStateZipMatch("US", "CA", "90210").match).toBe(true);
      expect(validateStateZipMatch("US", "NY", "90210").match).toBe(false);
      expect(validateStateZipMatch("US", "NY", "10001").match).toBe(true);
    });
  });
});
