import { BrowserWindow } from 'electron';

class CaptureWindow {
  constructor() {
    this.win = new BrowserWindow();
    this.win.loadURL(`file://${__dirname}/../../captureWindow.html`);
  }

  close() {
    this.win.close();
  }
}

function createCaptureWindow() {
  return new CaptureWindow();
}

export default createCaptureWindow;