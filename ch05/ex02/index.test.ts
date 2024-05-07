import { replaceEscapeELIF, replaceEscapeSWITCH} from "./index.ts";

describe("replaceEscapeSeq", () => {
  it("should ...", () => {
    expect(replaceEscapeELIF(`a\0b\bc\td\ne\vf\fg\rh"i'`))
    .toBe(`a\\0b\\bc\\td\\ne\\vf\\fg\\rh\\"i\\'`);
  });
  it("should ...", () => {
    expect(replaceEscapeSWITCH(`a\0b\bc\td\ne\vf\fg\rh"i'`))
    .toBe(`a\\0b\\bc\\td\\ne\\vf\\fg\\rh\\"i\\'`);
  });
});