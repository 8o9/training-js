import { tryParseJSON } from "./index.ts";

describe("tryParseJSON", () => {
  it("should return success", () => {
    expect(
      tryParseJSON(`{"a": 2, "foo": [], "delta": {"c": true}}`),
    ).toStrictEqual({
      success: true,
      data: `{"a": 2, "foo": [], "delta": {"c": true}}`,
    });
  });
  it("should return false", () => {
    expect(tryParseJSON(`{"a": 2, "foo": [], {"c": true}}`)).toStrictEqual({
      success: false,
      data: `Expected double-quoted property name in JSON at position 20 (line 1 column 21)`,
    });
  });
  it("should return success", () => {
    expect(tryParseJSON(`"a"`)).toStrictEqual({
      success: true,
      data: `"a"`,
    });
  });
});
