"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
var isDev = require("electron-is-dev");
var path = require("path");
var mainWindow;
function createWindow() {
  mainWindow = new electron_1.BrowserWindow({
    titleBarStyle: "hidden",
    center: true,
    kiosk: !isDev,
    width: 800,
    height: 600,
    resizable: true,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false,
    },
  });
  if (isDev) {
    mainWindow.loadURL("http://localhost:3000");
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, "../build/index.html"));
  }
  mainWindow.on("closed", function () {
    mainWindow = undefined;
  });
}
electron_1.app.on("ready", createWindow);
electron_1.app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    electron_1.app.quit();
  }
});
electron_1.app.on("activate", function () {
  if (mainWindow === null) {
    createWindow();
  }
});
electron_1.app.commandLine.appendSwitch("disable-features", "OutOfBlinkCors");
