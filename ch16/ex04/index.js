import fs from "fs";
import iconv from "iconv-lite";

fs.readFile("hello.txt", function (err, data) {
  if (err) {
    throw err;
  }
  const txt = iconv.decode(data, "shiftjis");
  console.log(txt);
});
