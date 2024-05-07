type resultObj = { success: boolean; data: string };

export const tryParseJSON = (input: string): resultObj => {
  const res = { success: true, data: input };
  try {
    JSON.parse(input);
  } catch (e: unknown) {
    if (e instanceof Error) {
      res.success = false;
      res.data = e.message;
    }
  } finally {
    //
  }
  return res;
};
