import { wait } from "../ch13.ts";

// function g1() {
//   // TODO: then のネストを無くしなさい
//   return wait(1000).then(() => {
//     console.log("A");
//     return wait(2000).then(() => {
//       console.log("B");
//       return wait(3000).then(() => {
//         console.log("C");
//       });
//     });
//   });
// }
export function g1() {
  return wait(1000)
    .then(() => console.log("A"))
    .then(() => wait(2000))
    .then(() => console.log("B"))
    .then(() => wait(3000))
    .then(() => console.log("C"));
}
export async function g1_() {
  await wait(1000);
  console.log("A");
  await wait(2000);
  console.log("B");
  await wait(3000);
  console.log("C");
}

// function g2() {
//   // TODO: new Promise を使わないように書き換えなさい
//   return new Promise((resolve, reject) => {
//     wait(1000)
//       .then(() => console.log("A"))
//       .then(() => wait(2000))
//       .then(() => console.log("B"))
//       .then(() => wait(3000))
//       .then(() => console.log("C"))
//       .then(resolve, reject);
//   });
// }
// try-catchで書いたらnon-useless-catchとリンターに怒られた。
export async function g2() {
  await wait(1000);
  console.log("A");
  await wait(2000);
  console.log("B");
  await wait(3000);
  console.log("C");
}

// function g3() {
//   // 以下2つの関数が存在するとします (中身は適当)
//   function fetchUser() {
//     return Promise.resolve({ id: 42, name: "John" });
//   }
//   function fetchUserFriends(user) {
//     return Promise.resolve([
//       { name: "Sam", id: 100 },
//       { name: "Bob", id: 1 },
//     ]);
//   }

//   // TODO: var, let, const による変数宣言を無くしなさい。async/awaitは使用しないこと。
//   let temp = 0;
//   return fetchUser()
//     .then((user) => {
//       temp = user;
//       return fetchUserFriends(user);
//     })
//     .then((friends) => {
//       console.log(`${temp.name} has ${friends.length} friends!`);
//     });
// }
export function g3() {
  // 以下2つの関数が存在するとします (中身は適当)
  function fetchUser() {
    return Promise.resolve({ id: 42, name: "John" });
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function fetchUserFriends(user: unknown) {
    return Promise.resolve([
      { name: "Sam", id: 100 },
      { name: "Bob", id: 1 },
    ]);
  }

  return fetchUser().then((user) => {
    fetchUserFriends(user).then((friends) =>
      console.log(`${user.name} has ${friends.length} friends!`),
    );
  });
}

// function g4() {
//   function someFunction() {
//     return 42;
//   }

//   // NOTE: この関数 g4 は Promise を返す必要があるものとする
//   // (利用しているフレームワークはライブラリがそういう関数を要求するとでも思って下さい)
//   // TODO: new Promise を使わないように書き換えなさい。async/awaitは使用しないこと。
//   return new Promise((resolve) => {
//     let value = someFunction();
//     return value;
//   });
// }
export function g4() {
  function someFunction() {
    return 42;
  }

  return Promise.resolve(someFunction());
}
