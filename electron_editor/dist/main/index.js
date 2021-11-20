/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 195);
/******/ })
/************************************************************************/
/******/ ({

/***/ 13:
/***/ (function(module, exports) {

module.exports = require("electron");

/***/ }),

/***/ 194:
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),

/***/ 195:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _electron = __webpack_require__(13);

var _createMainWindow = __webpack_require__(83);

var _createMainWindow2 = _interopRequireDefault(_createMainWindow);

var _setAppMenu = __webpack_require__(84);

var _setAppMenu2 = _interopRequireDefault(_setAppMenu);

var _showSaveAsNewFileDialog = __webpack_require__(86);

var _showSaveAsNewFileDialog2 = _interopRequireDefault(_showSaveAsNewFileDialog);

var _createFileManager = __webpack_require__(82);

var _createFileManager2 = _interopRequireDefault(_createFileManager);

var _showOpenFileDialog = __webpack_require__(85);

var _showOpenFileDialog2 = _interopRequireDefault(_showOpenFileDialog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mainWindow = null;
var fileManager = null;

_electron.app.on('ready', function () {
  mainWindow = (0, _createMainWindow2.default)();
  fileManager = (0, _createFileManager2.default)();

  (0, _setAppMenu2.default)({
    openFile: openFile,
    saveFile: saveFile,
    saveAsNewFile: saveAsNewFile,
    exportPDF: exportPDF
  });
});

_electron.app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    _electron.app.quit();
  }
});

_electron.app.on('activate', function (_, hasVisibleWindow) {
  if (!hasVisibleWindow) {
    mainWindow = (0, _createMainWindow2.default)();
  }
});

function openFile() {
  if (_electron.app.isReady()) {
    (0, _showOpenFileDialog2.default)().then(function (filePath) {
      fileManager.readFile(filePath);
    }).then(function (text) {
      mainWindow.sendText(text);
    }).catch(function (error) {
      console.log(error);
    });
  }
}

function saveFile() {
  console.log('saveFile');
}

function saveAsNewFile() {
  Promise.all([(0, _showSaveAsNewFileDialog2.default)(), mainWindow.requestText()]).then(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        filePath = _ref2[0],
        text = _ref2[1];

    return fileManager.saveFile(filePath, text);
  }).catch(function (error) {
    console.log(error);
  });
}

function exportPDF() {
  console.log('exportPDF');
}

/***/ }),

/***/ 82:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = __webpack_require__(194);

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FileManager = function () {
  function FileManager() {
    _classCallCheck(this, FileManager);
  }

  _createClass(FileManager, [{
    key: 'saveFile',
    value: function saveFile(filePath, text) {
      return new Promise(resolve, function () {
        _fs2.default.writeFileSync(filePath, text);
        resolve();
      }).catch(function (error) {
        return console.log(error);
      });
    }
  }, {
    key: 'readFile',
    value: function readFile(filePath) {
      return new Promise(function (resolve) {
        var text = _fs2.default.readFileSync(filePath, 'utf8');
        resolve(text);
      }).catch(function (error) {
        return console.log(error);
      });
    }
  }]);

  return FileManager;
}();

function createFileManager() {
  return new FileManager();
}

exports.default = createFileManager;

/***/ }),

/***/ 83:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _electron = __webpack_require__(13);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MainWindow = function () {
  function MainWindow() {
    var _this = this;

    _classCallCheck(this, MainWindow);

    this.window = new _electron.BrowserWindow({
      width: 800,
      height: 600
    });

    this.window.loadURL('file://' + __dirname + '/../../index.html');
    this.window.on('closed', function () {
      _this.window = null;
    });
  }

  _createClass(MainWindow, [{
    key: 'requestText',
    value: function requestText() {
      var _this2 = this;

      return new Promise(function (resolve) {
        _this2.window.webContents.send('REQUEST_TEXT');
        _electron.ipcMain.once('REPLY_TEXT', function (_, text) {
          return resolve(text);
        });
      }).catch(function (error) {
        return console.log(error);
      });
    }
  }, {
    key: 'sendText',
    value: function sendText(text) {
      this.window.webContents.send('SEND_TEXT', text);
    }
  }]);

  return MainWindow;
}();

function createMainWindow() {
  return new MainWindow();
}

exports.default = createMainWindow;

/***/ }),

/***/ 84:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _electron = __webpack_require__(13);

function setAppMenu(options) {
  var template = [{
    label: "File",
    submenu: [{
      label: 'Open',
      accelerator: 'CmdOrCtrl+O',
      click: function click() {
        options.openFile();
      }
    }, {
      label: 'Save',
      accelerator: 'CmdOrCtrl+S',
      click: function click() {
        options.saveFile();
      }
    }, {
      label: 'Save As...',
      click: function click() {
        options.saveAsNewFile();
      }
    }, {
      label: 'Export PDF',
      click: function click() {
        options.exportPDF();
      }
    }]
  }, {
    label: "Edit",
    submenu: [{
      label: 'Copy',
      accelerator: 'CmdOrCtrl+C',
      role: 'copy'
    }, {
      label: 'Paste',
      accelerator: 'CmdOrCtrl+V',
      role: 'paste'
    }, {
      label: 'Cut',
      accelerator: 'CmdOrCtrl+X',
      role: 'cut'
    }, {
      label: 'Select All',
      accelerator: 'CmdOrCtrl+A',
      role: 'selectall'
    }]
  }, {
    label: "View",
    submenu: [{
      label: 'Toggle DevTools',
      accelerator: 'Alt+Command+I',
      click: function click() {
        _electron.BrowserWindow.getFocusedWindow().toggleDevTools();
      }
    }]
  }];

  if (process.platform === 'darwin') {
    template.unshift({
      label: 'MarkdownEditor',
      submenu: [{
        label: 'Quit',
        accelerator: 'CmdOrCtrl+Q',
        click: function click() {
          _electron.app.quit();
        }
      }]
    });
  }
  _electron.Menu.setApplicationMenu(_electron.Menu.buildFromTemplate(template));
}

exports.default = setAppMenu;

/***/ }),

/***/ 85:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _electron = __webpack_require__(13);

function showOpenFileDialog() {
  return new Promise(function (resolve, reject) {
    var files = _electron.dialog.showOpenDialog({
      title: 'open',
      properties: ['openFile'],
      filters: [{
        name: 'markdown file',
        extensions: ['md']
      }]
    });

    if (files && files.length > 0) {
      resolve(files[0]);
    } else {
      reject();
    }
  }).catch(function (error) {
    return console.log(error);
  });
}

exports.default = showOpenFileDialog();

/***/ }),

/***/ 86:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _electron = __webpack_require__(13);

function showSaveAsNewFileDialog() {
  return new Promise(function (resolve, reject) {
    var file = _electron.dialog.showSaveDialog({
      title: 'save',
      filters: [{
        name: 'markdown file',
        extensions: ['md']
      }]
    });

    if (file) {
      resolve(file);
    } else {
      reject();
    }
  }).catch(function (error) {
    return console.log(error);
  });
}

exports.default = showSaveAsNewFileDialog;

/***/ })

/******/ });
//# sourceMappingURL=index.js.map