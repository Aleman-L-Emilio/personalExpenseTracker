const { app, BrowserWindow } = require('electron');
const electron = require('electron');
const path = require('path');
const url = require('url');
const fs = require('fs');

let win;

app.on('ready', () => {
    const electronScreen = electron.screen;
    const { width, height } = electronScreen.getPrimaryDisplay().workAreaSize
    win = new BrowserWindow({
        width: 1400,
        height: 800,
        useContentSize: true
    })

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
    // app won't fully close if it's on mac so this line is here just to make sure it doesn't get left open accidentally
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

function addExpense(date, payee, category, payment) {
    // TODO: Make sure payee and category are strings/words, and make sure that payment is a number
    fs.appendFile('app/expenses.txt', date + ';' +
        payee + ';' + category + ';' + payment + '\n ',
        function(err) {
            if (err) throw err;
            console.log('Added payment information');
        });
}