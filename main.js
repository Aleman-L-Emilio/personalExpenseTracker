const { app, BrowserWindow } = require('electron');
const electron = require('electron');
const path = require('path');
const url = require('url');
const prompt = require('electron-prompt');

var firstAccount;
let win;

app.on('ready', () => {
    win = new BrowserWindow({
        width: 1450,
        height: 800,
        useContentSize: true,
        webPreferences: {
            nodeIntegration: true
        }
    })

    firstAccount = prompt({
        title: 'Add Account',
        label: 'First Account Name',
        value: 'Bank Account #1',
        inputAttrs: {
            type: 'text'
        },
        type: 'input',
        height: 180
    }, win)

    win.loadURL(url.format({
        pathname: path.join(__dirname, 'app/index.html'),
        protocol: 'file',
        slashes: true
    }));

    win.on('closed', () => {
        win = null;
    })
});

app.on('window-all-closed', () => {
    // app won't fully close if it's on mac so this line is here just to make sure it doesn't get left open in the background accidentally
    if (process.platform !== 'darwin') {
        app.quit();
    }
});