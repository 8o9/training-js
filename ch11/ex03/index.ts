function swapEndian(value: number): number {
  return (
    ((value & 0x000000ff) << 24) |
    ((value & 0x0000ff00) << 8) |
    ((value & 0x00ff0000) >> 8) |
    ((value & 0xff000000) >> 24)
  );
}

function endianSwap(array: Uint32Array): Uint32Array {
  return array.map(swapEndian);
}

// 1バイト単位で並び替えるだけなので同じ
const little2Big = endianSwap;
const big2Little = endianSwap;

// テストとさせてください
const littleEndianArray = new Uint32Array([0x01eeffc0]);
const bigEndianArray = little2Big(littleEndianArray);
bigEndianArray.forEach((value) => {
  console.log(value.toString(16));
});

const bigEndianArray2 = new Uint32Array([0xbeef0123]);
const littleEndianArray2 = big2Little(bigEndianArray2);
littleEndianArray2.forEach((value) => {
  console.log(value.toString(16));
});
