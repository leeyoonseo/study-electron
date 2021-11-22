import { app, screen, BrowserWindow } from 'electron';
// import trimDesktop from './trimDesktop';
import createCaptureWindow from './createCaptureWindow';

let captureWindow;

app.on('ready', () => {
  // trimDesktop().then(({ sourceDisplay, trimmedBounds }) => {
  //   console.log(sourceDisplay, trimmedBounds);
  // });
  captureWindow = createCaptureWindow();
  
  // const display = screen.getAllDisplays()[0];
  // const { x, y, width, height } = display.bounds;
  // const win = new BrowserWindow({
  //   frame: false,
  //   transparent: true,
  //   alwaysOnTop: true,
  //   x, y, width, height
  // });
});