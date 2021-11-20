import { BrowserWindow, ipcMain } from 'electron';

class MainWindow{ 
  constructor() {
    this.window = new BrowserWindow({
      width: 800,
      height: 600
    });

    this.window.loadURL(`file://${__dirname}/../../index.html`);
    this.window.on('closed', () => {  
        this.window = null;
    });
  }

  requestText() {
    return new Promise((resolve) => {
      this.window.webContents.send('REQUEST_TEXT');
      ipcMain.once('REPLY_TEXT', (_, text) => resolve(text));
    }).catch(error => console.log(error));
  }

  sendText(text) {
    this.window.webContents.send('SEND_TEXT', text);
  }
}

function createMainWindow() {
  return new MainWindow();
}

export default createMainWindow;