import fs from 'fs';

class FileManager {
  saveFile(filePath, text){
    return new Promise((resolve), () => {
      fs.writeFileSync(filePath, text);
      resolve();
    }).catch(error => console.log(error));
  }

  readFile(filePath) {
    return new Promise((resolve) => {
      const text = fs.readFileSync(filePath, 'utf8');
      resolve(text);
    }).catch(error => console.log(error));
  }
}

function createFileManager() {
  return new FileManager();
}

export default createFileManager;