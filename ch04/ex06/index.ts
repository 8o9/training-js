/* js
function resize(params) {
  let maxWidth = 600;
  let maxHeight = 480;

  if (params && params.maxWidth) {
    maxWidth = params.maxWidth;
  }

  if (params && params.maxHeight) {
    maxHeight = params.maxHeight;
  }

  console.log({ maxWidth, maxHeight });
}
*/
export type Params = {
  maxWidth: number;
  maxHeight: number;
};

export const resize1 = (params: Params | undefined) => {
  // 今回はmaxWidthが正の前提だが、
  // params.maxWidthが0の場合は0でなく600が設定されてしまう
  const maxWidth = (params && params.maxWidth) || 600;
  const maxHeight = (params && params.maxHeight) || 480;
  console.log({ maxWidth, maxHeight });
};

export const resize2 = (params: Params | undefined) => {
  const maxWidth = params?.maxWidth ?? 600;
  const maxHeight = params?.maxHeight ?? 480;
  console.log({ maxWidth, maxHeight });
};
