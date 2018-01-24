'use strict';

var app = require('app');
var BrowserWindow = require('browser-window');
var globalShortcut = require('global-shortcut');
var configuration = require('./configuration');
var ipc = require('ipc');

var mainWindow = null;
var settingsWindow = null;

app.on('ready', function() {
    if (!configuration.readSettings('shortcutKeys')) {
        configuration.saveSettings('shortcutKeys', ['ctrl', 'shift']);
    }

    mainWindow = new BrowserWindow({
        frame: false,
        height: 700,
        resizable: false,
        width: 368
    });

    mainWindow.loadUrl('file://' + __dirname + '/app/index.html');

    setGlobalShortcuts();
});

function setGlobalShortcuts() {
    globalShortcut.unregisterAll();

    var shortcutKeysSetting = configuration.readSettings('shortcutKeys');
    var shortcutPrefix = shortcutKeysSetting.length === 0 ? '' : shortcutKeysSetting.join('+') + '+';

    globalShortcut.register(shortcutPrefix + shortcutPrefix + '1', function () {
        mainWindow.webContents.send('one', 0);
    });
    globalShortcut.register(shortcutPrefix + '2', function () {
        mainWindow.webContents.send('two', 1);
    });
    globalShortcut.register(shortcutPrefix + '3', function () {
        mainWindow.webContents.send('three', 2);
    });
    globalShortcut.register(shortcutPrefix + '4', function () {
        mainWindow.webContents.send('four', 2);
    });
    globalShortcut.register(shortcutPrefix + '5', function () {
        mainWindow.webContents.send('five', 2);
    });
    globalShortcut.register(shortcutPrefix + '6', function () {
        mainWindow.webContents.send('six', 2);
    });
    globalShortcut.register(shortcutPrefix + '7', function () {
        mainWindow.webContents.send('seven', 2);
    });
    globalShortcut.register(shortcutPrefix + '8', function () {
        mainWindow.webContents.send('eight', 2);
    });
    globalShortcut.register(shortcutPrefix + '9', function () {
        mainWindow.webContents.send('nine', 2);
    });
    globalShortcut.register(shortcutPrefix + 'a', function () {
        mainWindow.webContents.send('ul', 2);
    });
    globalShortcut.register(shortcutPrefix + 's', function () {
        mainWindow.webContents.send('ur', 2);
    });
    globalShortcut.register(shortcutPrefix + 'd', function () {
        mainWindow.webContents.send('ll', 2);
    });
    globalShortcut.register(shortcutPrefix + 'f', function () {
        mainWindow.webContents.send('lr', 2);
    });
    globalShortcut.register(shortcutPrefix + 'c', function () {
        mainWindow.webContents.send('cc', 2);
    });

}

ipc.on('close-main-window', function () {
    app.quit();
});


ipc.on('open-settings-window', function () {
    if (settingsWindow) {
        return;
    }

    settingsWindow = new BrowserWindow({
        frame: false,
        height: 200,
        resizable: false,
        width: 200
    });

    settingsWindow.loadUrl('file://' + __dirname + '/app/settings.html');

    settingsWindow.on('closed', function () {
        settingsWindow = null;
    });
});

ipc.on('close-settings-window', function () {
    if (settingsWindow) {
        settingsWindow.close();
    }
});

ipc.on('set-global-shortcuts', function () {
    setGlobalShortcuts();
});
