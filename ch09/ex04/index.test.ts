import { Warr, MagicWarr } from "./index.ts";

describe(">>> Warr <<3", () => {
  test("should correctly calculate attack pawa-", () => {
    const warr = new Warr(10, 2.0);
    expect(warr.attack).toBe(20);
  });

  test("should correctly update/set atk and atkratio", () => {
    const warr = new Warr();
    warr.atk = 5;
    warr.atkratio = 3.0;
    expect(warr.attack).toBe(15);
  });
});

describe("** MagicWarr ***", () => {
  test("should correctly calculate attack pawa-", () => {
    const magicWarr = new MagicWarr(10, 2.0, 2.4);
    expect(magicWarr.attack).toBe(48);
  });

  test("should correctly update/set atk, atkratio and mgc", () => {
    const magicWarr = new MagicWarr();
    magicWarr.atk = 5;
    magicWarr.atkratio = 3.0;
    magicWarr.mgc = 2.0;
    expect(magicWarr.attack).toBe(30);
  });
});
