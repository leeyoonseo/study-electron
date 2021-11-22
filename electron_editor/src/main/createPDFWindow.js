import { BrowserWindow, ipcMain } from 'electron';

class PDFWindow {
  constructor(text) {
    this.window = new BrowserWindow({ show: false });
    this.window.loadURL(`file://${__dirname}/../../pdf.html`);
    ipcMain.once('REQUEST_TEXT', e => {
      e.returnValue = text;
    });
  }
}

function createPDFWindow(contents, fileManager) {
  return new PDFWindow(contents, fileManager);
}

export default createPDFWindow;