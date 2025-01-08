import { checkEntry } from './index.js';

describe('checkEntry', () => {
  it('should return "file" for a file path', async () => {
    const result = await checkEntry('./ch16/ex07/index.js'); // 実際のファイル
    expect(result).toBe('file');
  });

  it('should return "directory" for a directory path', async () => {
    const result = await checkEntry('.'); // 実際のディレクトリ
    expect(result).toBe('directory');
  });

  it('should return "error" for other types of paths', async () => {
    try {
      await checkEntry('./imaginary_dir'); // 存在しないパス
    } catch (error) {
      expect(error).toBe('error');
    }
  });

  it('should return "error" for an invalid path', async () => {
    try {
      await checkEntry(':'); // 無効/存在しないパスを指定
    } catch (error) {
      expect(error).toBe('error');
    }
  });

  it('should return "other" for an invalid path', async () => {
    try {
      await checkEntry('/dev/null');
    } catch (error) {
      expect(error).toBe('other');
    }
  });
});