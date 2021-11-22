import { throwStatement } from 'babel-types';
import fs from 'fs';

class FileManager {
  constructor() {
    this.filePath = '';
  }

  saveFile(filePath, text){
    return new Promise((resolve), () => {
      fs.writeFileSync(filePath, text);
      this.filePath = filePath;
      resolve();
    }).catch(error => console.log(error));
  }

  readFile(filePath) {
    return new Promise((resolve) => {
      const text = fs.readFileSync(filePath, 'utf8');
      this.filePath = filePath;
      resolve(text);
    }).catch(error => console.log(error));
  }

  overwriteFile(text) {
    return this.saveFile(this.filePath, text);
  }

  writePdf(filePath, pdf) {
    return new Promise((resolve) => {
      fs.writeFileSync(filePath, pdf);
      resolve();
    });
  }
}

function createFileManager() {
  return new FileManager();
}

export default createFileManager;