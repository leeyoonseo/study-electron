import fs from 'fs';

class FileManager {
  saveFile(filePath, text){
    return new Promise((resolve), () => {
      fs.writeFileSync(filePath, text);
      resolve();
    });
  }
}

function createFileManager() {
  return new FileManager();
}

export default createFileManager;