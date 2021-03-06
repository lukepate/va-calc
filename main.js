'use strict';

var app = require('app');
var BrowserWindow = require('browser-window');
var globalShortcut = require('global-shortcut');
var configuration = require('./configuration');
var ipc = require('ipc');

var mainWindow = null;
var settingsWindow = null;
var path = require('path');

var cp = require('child_process');

var handleSquirrelEvent = function() {
   if (process.platform != 'win32') {
      return false;
   }

   function executeSquirrelCommand(args, done) {
      var updateDotExe = path.resolve(path.dirname(process.execPath),
         '..', 'update.exe');
      var child = cp.spawn(updateDotExe, args, { detached: true });
      child.on('close', function(code) {
         done();
      });
   };

   function install(done) {
      var target = path.basename(process.execPath);
      executeSquirrelCommand(["--createShortcut", target], done);
   };

   function uninstall(done) {
      var target = path.basename(process.execPath);
      executeSquirrelCommand(["--removeShortcut", target], done);
   };

   var squirrelEvent = process.argv[1];
   switch (squirrelEvent) {
      case '--squirrel-install':
         install(app.quit);
         return true;
      case '--squirrel-updated':
         install(app.quit);
         return true;
      case '--squirrel-obsolete':
         app.quit();
         return true;
      case '--squirrel-uninstall':
         uninstall(app.quit);
         return true;
   }
   return false;
};

if (handleSquirrelEvent()) {
   return;
}


// begins and defines window for electron
app.on('ready', function() {
    if (!configuration.readSettings('shortcutKeys')) {
        configuration.saveSettings('shortcutKeys', ['ctrl', 'shift']);
    }

    mainWindow = new BrowserWindow({
        frame: false,
        height: 641,
        resizable: false,
        width: 370
    });

    mainWindow.loadUrl('file://' + __dirname + '/app/index.html');

    setGlobalShortcuts();
});

// shortcuts
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

// close icon configure
ipc.on('close-main-window', function () {
    app.quit();
});

// settings icon configure
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

// close icon configure
ipc.on('close-settings-window', function () {
    if (settingsWindow) {
        settingsWindow.close();
    }
});

//sets global shortcuts
ipc.on('set-global-shortcuts', function () {
    setGlobalShortcuts();
});
