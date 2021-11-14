import { BrowserWindow } from 'electron';

let win;
const createWindow = () => {
  win = new BrowserWindow();
  win.loadURL(`file://${__dirname}/../../index.html`);
  win.on('close', () => {
    win = null;
  });
};

export default createWindow;