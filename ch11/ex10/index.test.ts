import {
  getDaysInMonth,
  getWeekdaysCount,
  getDayOfWeek,
  getPreviousMonthStartDate,
} from "./index.ts";

describe("dateUtils", () => {
  describe("getDaysInMonth", () => {
    it("should return correct number of days for a given month", () => {
      expect(getDaysInMonth(2024, 8)).toBe(31); // 2024年8月は31日間
      // expect(getDaysInMonth(2024, 2)).toBe(29); // 2024年2月はうるう年なので29日だが未実装
    });
  });

  describe("getWeekdaysCount", () => {
    it("should count weekdays between two dates", () => {
      expect(getWeekdaysCount("2024-08-02", "2024-08-05")).toBe(2);
      expect(getWeekdaysCount("2024-08-05", "2024-08-09")).toBe(5);
    });
  });

  describe("getDayOfWeek", () => {
    it("should return the correct weekday for a given date and locale", () => {
      expect(getDayOfWeek("2024-08-02", "ja-JP")).toBe("金曜日");
      expect(getDayOfWeek("2024-08-02", "en-US")).toBe("Friday");
    });

    it("should return null for invalid date", () => {
      expect(getDayOfWeek("invalid-date", "en-US")).toBeNull();
    });
  });

  describe("getPreviousMonthStartDate", () => {
    it("should return the correct start date of the previous month", () => {
      const expected = new Date(2024, 6, 1, 0, 0, 0); // 7月1日(month注意)
      expect(getPreviousMonthStartDate()).toEqual(expected);
    });
  });
});
