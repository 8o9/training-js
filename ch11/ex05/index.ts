// https://en.wikipedia.org/wiki/List_of_file_signatures
const fileSignaturesMap = new Map<string, number[]>();
fileSignaturesMap.set("PDF", [0x25, 0x50, 0x44, 0x46]); // PDFのバージョンにもよる気がする
fileSignaturesMap.set("ZIP", [0x50, 0x4b]);
fileSignaturesMap.set("GIF", [0x47, 0x49, 0x46, 0x38]);
fileSignaturesMap.set("PNG", [0x89, 0x50, 0x4e, 0x47]);

export function detectFileType(buffer: ArrayBuffer): string {
  const data = new Uint8Array(buffer);

  for (const [fileType, fileSignature] of fileSignaturesMap) {
    if (
      data
        .subarray(0, fileSignature.length)
        .every((byte, i) => byte === fileSignature[i])
    ) {
      return fileType;
    }
  }

  return "UNKNOWN";
}
