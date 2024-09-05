export const retryWithExponentialBackoff = (
  func: () => Promise<boolean>,
  maxRetry: number,
): Promise<boolean> => {
  let trialTimes = 0;

  function execute(): Promise<boolean> {
    return func().then((result) => {
      if (result === true) {
        // success!
        return true;
      }

      trialTimes++;
      if (trialTimes > maxRetry) {
        // all failure!
        return false;
      }

      const waitSec = Math.pow(2, trialTimes - 1) * 1000;
      return new Promise((resolve) => setTimeout(resolve, waitSec))
        .then(execute)
        .catch((error) => {
          console.log(`err ${error}`);
          return false;
        });
    });
  }

  return execute();
};

// 実施例
const exampleTask = async (): Promise<boolean> => {
  const dice = Math.random();
  const success = dice > 0.5;
  console.log(`dice: ${dice} ${success ? "succeeded" : "failed"}`);
  return success;
};

retryWithExponentialBackoff(exampleTask, 5)
  .then((result) => {
    if (result) {
      console.log("Task completed");
    } else {
      console.log("Task failed. reached max retry...");
    }
  })
  .catch((error) => {
    console.log("error:", error);
  });
