import path from 'path';
import fs from 'fs';
import crypto from 'crypto';

function getHash(buffer) {
  const shasum = crypto.createHash('sha1');
  shasum.update(buffer);
  return shasum.digest('hex');
}

class FileManager {
  writeImage(dir, image) {
    return new Promise((resolve, reject) => {
      // NativeImages는 데이터 변환 전용 유틸리티를 제공한다.
      // toPNG와 같은 메서드를 사용하면 간단히 Node.js의 Buffer 형식으로 변환할 수 있다.
      const buffer = image.toPNG();
      const filename = path.join(dir, `${getHash(buffer)}.png`);
      fs.writeFile(filename, buffer, error => {
        if (error) {
          reject(error);
        } else {
          resolve(filename);
        }
      });
    });
  }
}

function createFileManager() {
  return new FileManager();
}

export default createFileManager;