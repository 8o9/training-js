export const replaceEscapeELIF = (input: string) => {
  let replaced = "";
  for (const c of input) {
    if (c === "\0") {
      replaced += `\\0`;
    } else if (c === "\b") {
      replaced += `\\b`;
    } else if (c === "\t") {
      replaced += `\\t`;
    } else if (c === "\n") {
      replaced += `\\n`;
    } else if (c === "\v") {
      replaced += `\\v`;
    } else if (c === "\f") {
      replaced += `\\f`;
    } else if (c === "\r") {
      replaced += `\\r`;
    } else if (c === '"') {
      replaced += `\\"`;
    } else if (c === "'") {
      replaced += `\\'`;
    } else {
      replaced += c;
    }
  }
  return replaced;
};

export const replaceEscapeSWITCH = (input: string) => {
  let replaced = "";
  for (const c of input) {
    switch (c) {
      case "\0":
        replaced += `\\0`;
        break;
      case "\b":
        replaced += `\\b`;
        break;
      case "\t":
        replaced += `\\t`;
        break;
      case "\n":
        replaced += `\\n`;
        break;
      case "\v":
        replaced += `\\v`;
        break;
      case "\f":
        replaced += `\\f`;
        break;
      case "\r":
        replaced += `\\r`;
        break;
      case '"':
        replaced += `\\"`;
        break;
      case "'":
        replaced += `\\'`;
        break;
      default:
        replaced += c;
    }
  }
  return replaced;
};
