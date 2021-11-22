import { app, screen, BrowserWindow } from 'electron';

app.on('ready', () => {
  const display = screen.getAllDisplays()[0];
  const { x, y, width, height } = display.bounds;
  const win = new BrowserWindow({
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    x, y, width, height
  });
});