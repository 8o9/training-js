import fs from "fs";
import {Buffer} from 'buffer'

// very, very, WIP
export function* readLines(filePath: string): Generator<string> {
  
  const startPos = 0;
  const readLength = 1024;
  let readBuffer = Buffer.alloc(readLength);
  let fileDesc;
  let beforeLineBreak = '';

  try {
    fileDesc = fs.openSync(filePath, 'r');
    let readBytes;
    while(readBytes = fs.readSync(fileDesc, readBuffer, 0, readLength, startPos) > 0) {
      let data = beforeLineBreak + readBuffer.toString('utf-8', 0, readBytes);
    }

  } finally {
    fs.closeSync(fileDesc);
  }
}
