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
/******/ 	return __webpack_require__(__webpack_require__.s = 191);
/******/ })
/************************************************************************/
/******/ ({

/***/ 191:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _electron = __webpack_require__(31);

var _createMainWindow = __webpack_require__(82);

var _createMainWindow2 = _interopRequireDefault(_createMainWindow);

var _setAppMenu = __webpack_require__(83);

var _setAppMenu2 = _interopRequireDefault(_setAppMenu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mainWindow = null;

_electron.app.on('ready', function () {
  mainWindow = (0, _createMainWindow2.default)();
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

/***/ }),

/***/ 31:
/***/ (function(module, exports) {

module.exports = require("electron");

/***/ }),

/***/ 82:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _electron = __webpack_require__(31);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MainWindow = function MainWindow() {
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
};

function createMainWindow() {
  return new MainWindow();
}

exports.default = createMainWindow;

/***/ }),

/***/ 83:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _electron = __webpack_require__(31);

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

/***/ })

/******/ });
//# sourceMappingURL=index.js.map