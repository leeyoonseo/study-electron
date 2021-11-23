const Application = require('spectron').Application;
const electron = require('electron');
const path = require('path');

module.exports = function createApplication(args) {
  return new Application({
    path: electron,
    args: [path.join(__dirname, '..')].concat(args)
  });
}