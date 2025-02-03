let a, x, y;
const r = 10;

// eslintでwithの警告が出た。prettierで修正できなかったので手で直した
a = Math.PI * r * r;
x = r * cos(PI);
y = r * sin(PI / 2);

console.log(a, x, y);
