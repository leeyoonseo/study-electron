import { app } from 'electron';
import createMainWindow from './createMainWindow';
import setAppMenu from './setAppMenu';

let mainWindow = null;

app.on('ready', () => {
  mainWindow = createMainWindow();
  setAppMenu({
    openFile,
    saveFile,
    saveAsNewFile,
    exportPDF
  })
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

function openFile() {
  console.log('openFile');
}

function saveFile() {
  console.log('saveFile');
}

function saveAsNewFile() {
  console.log('saveAsNewFile');
}

function exportPDF() {
  console.log('exportPDF');
}
