let start = Date.now();
let sampleObj = { success: false, trialTimes: 99, memo: "yes" };

let i = 0;
while (i < 1000000) {
  let result = [sampleObj.success, sampleObj.trialTimes, sampleObj.memo];
  result.length; // for removing lint error
  i++;
}

console.log(`time: ${(Date.now() - start) / 1000.0} [sec]`);

start = Date.now();

i = 0;
while (i < 1000000) {
  with (sampleObj) {
    let result = [success, trialTimes, memo];
    result.length; // for removing lint error
    i++;
  }
}

console.log(`time: ${(Date.now() - start) / 1000.0} [sec]`);

start = Date.now();

i = 0;
while (i < 1000000) {
  with (sampleObj) {
    let result = [sampleObj.success, sampleObj.trialTimes, sampleObj.memo];
    result.length; // for removing lint error
    i++;
  }
}

console.log(`time: ${(Date.now() - start) / 1000.0} [sec]`);
