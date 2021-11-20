import { app } from 'electron';
import creatMainWindow from './creatMainWindow';

let mainWindow = null;

app.on('ready', () => {
  mainWindow = creatMainWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', (_, hasVisibleWindow) => {
  if (!hasVisibleWindow) {
    mainWindow = creatMainWindow();
  }
});