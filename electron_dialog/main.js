const { app, BrowserWindow, dialog } = require('electron');

// * 아래와 같이 remote 모듈을 사용하면 renderer 프로세스에서도 dialog 모듈 사용가능
// * 하지만 보안상 main 프로세스에서만 사용하길!!
// const dialog = require('electron').remote.dialog;

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
  dialog.showOpenDialog(win, { 
    // file과 directory 둘 다 지정할 경우 폴더 선택이 우선시된다.
    // properties: ['openFile', 'openDirectory'],
    properties: ['openFile'],
    filters: [
      {
        name: 'Images',
        extensions: ['jpg', 'jpeg', 'png', 'gif'],
      }, 
      {
        name: 'Movies',
        extensions: ['mkv', 'avi', 'mp4'],
      },
      {
        name: 'Custon File Type',
        extensions: ['as'],
      }
    ]
  });
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