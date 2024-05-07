const tryCatchFinally = () => {
  const str = "Buzz!";
  try {
    console.log(str);
    throw new Error("bad things happened.");
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.log(e.message);
    }
  } finally {
    console.log("easy come, easy go!");
  }
};

tryCatchFinally();
