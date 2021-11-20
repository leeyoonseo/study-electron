import { app } from 'electron';
// import creatMainWindow from './creatMainWindow';
import createMainWindow from './createMainWindow';

let mainWindow = null;

app.on('ready', () => {
  mainWindow = createMainWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', (_, hasVisibleWindow) => {
  if (!hasVisibleWindow) {
    mainWindow = createMainWindow();
  }
});