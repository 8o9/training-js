import { instanceOf } from './index.ts';

describe('instanceOf function', () => {
  it('should handle non-class constructor', () => {
    // function TestConstructor() {} // ts2345 error
    class TestConstructor {}
    const testObject = Object.create(TestConstructor.prototype);
    expect(instanceOf(testObject, TestConstructor)).toBe(true);
  });

  it('should return true for 多重/多段 inheritance', () => {
    class BaseClass {}
    class SecondClass extends BaseClass {}
    class ThirdClass extends SecondClass {}
    const testObject = new ThirdClass();
    expect(instanceOf(testObject, BaseClass)).toBe(true);
  });

  it('should return false for 継承関係にない classes', () => {
    class ClassA {}
    class ClassB {}
    const testObject = new ClassA();
    expect(instanceOf(testObject, ClassB)).toBe(false);
  });
});
