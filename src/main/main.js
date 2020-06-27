const { app, BrowserWindow } = require("electron");
const path = require("path");

let mainWindow = null;

app.on("ready", () => 
{
    mainWindow = new BrowserWindow({ width: 1600, height:900 });
    
    mainWindow.loadFile(path.join("renderer", "index.html"));
});