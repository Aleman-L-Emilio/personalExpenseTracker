const { app, BrowserWindow } = require('electron');
const electron = require('electron');
const path = require('path');
const url = require('url');

let win;

app.on('ready', () => {
    const electronScreen = electron.screen;
    const { width, height } = electronScreen.getPrimaryDisplay().workAreaSize
    win = new BrowserWindow({
        height: 800,
        width: 1400,
        useContentSize: true
    })

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
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
