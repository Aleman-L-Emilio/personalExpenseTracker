const { app, BrowserWindow } = require('electron');
const electron = require('electron');
const path = require('path');
const url = require('url');

let win;

app.on('ready', () => {
    const electronScreen = electron.screen;
    // const { width, height } = electronScreen.getPrimaryDisplay().workAreaSize
    win = new BrowserWindow({ width: 1400, height: 800 })

    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file',
        slashes: true
    }));

    win.on('closed', () => {
        win = null;
    })
});

app.on('window-all-closed', () => {
    // app won't fully close if it's on mac so this line is here just to make sure it doesn't get left open accidentally
    if (process.platform !== 'darwin') {
        app.quit();
    }
});