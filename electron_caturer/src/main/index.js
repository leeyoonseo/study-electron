import { app, shell } from 'electron';
import createFileManager from './createFileManager';
import createCaptureWindow from './createCaptureWindow';
import trimDesktop from './trimDesktop';

let captureWindow;

function captureAndOpenItem() {
  const fileManager = createFileManager();
  return trimDesktop()
    .then(captureWindow.capture.bind(captureWindow))
    .then(image => {
      // 임시 파일 저장 전용 폴더에 추출한 이미지 저장
      const createdFilename = fileManager.writeImage(app.getPath('temp'), image);
      return createdFilename;
    })
    .then(shell.openItem.bind(shell))
    .then(() => {
      if (process.platform !== 'darwin') {
        app.quit();
      }
    })
    .catch(error => console.log(error));
}

app.on('ready', () => {
  captureWindow = createCaptureWindow();
  captureAndOpenItem();
});