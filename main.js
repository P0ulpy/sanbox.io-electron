const { app, BrowserWindow } = require("electron");
const path = require("path");

let mainWindow = null;

function createMainWindow()
{
    mainWindow = new BrowserWindow({ width: 800, height: 600 });

    mainWindow.loadFile(path.join("renderer", "index.html"));
}

app.on("ready", createMainWindow);