import fs from "fs";

export const checkEntry = (path) => {
  return new Promise((resolve, reject) => {
    fs.stat(path, (err, stats) => {
      if (err) {
        reject("error");
      } else if (stats.isFile()) {
        resolve("file");
      } else if (stats.isDirectory()) {
        resolve("directory");
      } else {
        // シンボリックリンクとかソケットファイル？、/dev/null?
        resolve("other");
      }
    });
  });
};

// run locally (ex. node index.js)
checkEntry("./index.js")
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });

checkEntry(".")
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });

  checkEntry("./imaginary_dir")
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });
