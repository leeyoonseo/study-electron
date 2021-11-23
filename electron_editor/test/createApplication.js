const Application = require('spectron').Application;
const electron = require('electron');
const path = require('path');

module.exports = function createApplication(args) {
  return new Application({
    path: electron,
    args: [
      '--require', path.join(__dirname, 'preload.js'),
      path.join(__dirname, '..')
    ].concat(args)
  });
}