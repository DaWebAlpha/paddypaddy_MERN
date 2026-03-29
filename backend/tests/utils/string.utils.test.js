import { 
    normalizeString, 
    cleanValue, 
    normalizeValue,
    formatTitle,
    formatSlug
} from "@src/utils/string.utils.js";

describe("string utility helpers", () => {    
    
    describe("normalizeString", () => {
        test("Normalizes string by removing accents/diacritics.", () => {
            expect(normalizeString("café")).toBe("cafe");
        });
    
        test("Return non string values exactly as they are", () => {
            expect(normalizeString(20)).toBe(20);
            expect(normalizeString(true)).toBe(true);
        });
    });

    describe("cleanValue", () => {
        test("Cleans name: trims and collapses multiple spaces.", () => {
            expect(cleanValue("  John   Doe  ")).toBe("John Doe");
        });

        test("Return non string values exactly as they are", () => {
            expect(cleanValue(20)).toBe(20);
            expect(cleanValue(true)).toBe(true);
        }); 
    });

    describe("normalizeValue", () => {
        test("Trims and changes string to lowercase", () => {
            expect(normalizeValue(" GhanA ")).toBe("ghana");
        });

        test("Return non string values exactly as they are", () => {
            expect(normalizeValue(20)).toBe(20);
            expect(normalizeValue(true)).toBe(true);
        }); 
    });

    describe("formatTitle", () => {
        test("Converts string to Title Case and cleans spaces", () => {
            expect(formatTitle("greater accra")).toBe("Greater Accra");
            expect(formatTitle("  JANE   dOE  ")).toBe("Jane Doe");
        });

        test("Return non string values exactly as they are", () => {
            expect(formatTitle(20)).toBe(20);
        });
    });

    describe("formatSlug", () => {
        test("Slug: removes accents, lowercases, removes symbols, and replaces spaces with hyphens", () => {
            expect(formatSlug("new york")).toBe("new-york");
            expect(formatSlug("Café & Restaurant!!")).toBe("cafe-restaurant");
        });

        test("handles multiple spaces and leading/trailing hyphens", () => {
            expect(formatSlug("  Hello    World  ")).toBe("hello-world");
        });

        test("returns non-string values exactly as they are", () => {
            expect(formatSlug(500)).toBe(500);
        });
    });
});
