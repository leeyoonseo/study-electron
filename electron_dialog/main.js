const { app, BrowserWindow } = require('electron');

let win = null;
const createBrowserWindow = () => {
  win = new BrowserWindow({
    width: 800,
    height: 600
  });

  win.loadURL(`file://${__dirname}/index.html`);
  win.on('closed', () => {  
    win = null;
  });
}

app.on('ready', () => {
  createBrowserWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', (_, hasVisibleWindow) => {
  if (!hasVisibleWindow) {
    win = createBrowserWindow();
  }
});