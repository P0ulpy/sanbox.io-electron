const { app, BrowserWindow } = require("electron");
const path = require("path");
require("electron-reload")(path.join(__dirname, ".."));

global.env = require("./env");

let mainWindow = null;

function createMainWindow()
{
    mainWindow = new BrowserWindow({
        width: 1600,
        height: 900,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true
        }
    });

    mainWindow.loadFile(path.join(__dirname, "../renderer/html/index.html"));
    //mainWindow.loadFile(path.join(__dirname, "../renderer/html/loadRoom.html"));
}

app.on("ready", () =>
{
    createMainWindow();
    
    mainWindow.webContents.openDevTools();
});