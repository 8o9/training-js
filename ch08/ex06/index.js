const m = function (...arg) {
  console.log(arg[1]);
};
m("a", "b"); // -> 'b'

const m2 = (...arg) => {
  console.log(arg[1]);
};
m2("a", "b"); // -> 'b'
