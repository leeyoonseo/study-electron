import { app, screen } from 'electron';

app.on('ready', () => {
  const display = screen.getAllDisplays()[0];
  console.log(display);
});