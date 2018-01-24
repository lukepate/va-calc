'use strict';

var ipc = require('ipc');
var remote = require('remote');
var Tray = remote.require('tray');
var Menu = remote.require('menu');
var path = require('path');

var soundButtons = document.querySelectorAll('.button-sound');
var closeEl = document.querySelector('.close');
var settingsEl = document.querySelector('.settings');
var lr = document.getElementById('lr')
var two = document.getElementById('two')
var three = document.getElementById('three')
var four = document.getElementById('four')
var five = document.getElementById('five')
var six = document.getElementById('six')
var seven = document.getElementById('seven')
var eight = document.getElementById('eight')
var nine = document.getElementById('nine')

var ul = document.getElementById('ul')
var cc = document.getElementById('cc')


var trayIcon = null;
var trayMenu = null;

for (var i = 0; i < soundButtons.length; i++) {
    var soundButton = soundButtons[i];
    var soundName = soundButton.attributes['data-sound'].value;

    prepareButton(lr, lr);

}

function prepareButton(buttonEl, soundName) {
    // buttonEl.querySelector('span').style.backgroundImage = 'url("img/icons/' + soundName + '.png")';

    // var audio = new Audio(__dirname + '/wav/' + soundName + '.wav');

}
lr.addEventListener('click', function () {
    ipc.send('lr');

});




ipc.on('global-shortcut', function (arg) {
    var event = new MouseEvent('click');
    lr.dispatchEvent(event);
});



one.addEventListener('click', function () {
  ipc.send('one');
});

ipc.on('one', function (arg) {
    var event = new MouseEvent('click');
    one.dispatchEvent(event);
});

two.addEventListener('click', function () {
  ipc.send('two');
});

ipc.on('two', function (arg) {
    var event = new MouseEvent('click');
    two.dispatchEvent(event);
});

three.addEventListener('click', function () {
  ipc.send('three');
});

ipc.on('three', function (arg) {
    var event = new MouseEvent('click');
    three.dispatchEvent(event);
});

four.addEventListener('click', function () {
  ipc.send('four');
});

ipc.on('four', function (arg) {
    var event = new MouseEvent('click');
    four.dispatchEvent(event);
});

five.addEventListener('click', function () {
  ipc.send('five');
});

ipc.on('five', function (arg) {
    var event = new MouseEvent('click');
    five.dispatchEvent(event);
});

six.addEventListener('click', function () {
  ipc.send('six');
});

ipc.on('six', function (arg) {
    var event = new MouseEvent('click');
    six.dispatchEvent(event);
});

seven.addEventListener('click', function () {
  ipc.send('seven');
});

ipc.on('seven', function (arg) {
    var event = new MouseEvent('click');
    seven.dispatchEvent(event);
});

eight.addEventListener('click', function () {
  ipc.send('eight');
});

ipc.on('eight', function (arg) {
    var event = new MouseEvent('click');
    eight.dispatchEvent(event);
});

nine.addEventListener('click', function () {
  ipc.send('nine');
});

ipc.on('nine', function (arg) {
    var event = new MouseEvent('click');
    nine.dispatchEvent(event);
});

ul.addEventListener('click', function () {
  ipc.send('ul');
});

ipc.on('ul', function (arg) {
    var event = new MouseEvent('click');
    ul.dispatchEvent(event);
});

ur.addEventListener('click', function () {
  ipc.send('ur');
});

ipc.on('ur', function (arg) {
    var event = new MouseEvent('click');
    ur.dispatchEvent(event);
});

ll.addEventListener('click', function () {
  ipc.send('ll');
});

ipc.on('ll', function (arg) {
    var event = new MouseEvent('click');
    ll.dispatchEvent(event);
});

lr.addEventListener('click', function () {
  ipc.send('lr');
});

ipc.on('lr', function (arg) {
    var event = new MouseEvent('click');
    lr.dispatchEvent(event);
});

cc.addEventListener('click', function () {
  ipc.send('cc');
});

ipc.on('cc', function (arg) {
    var event = new MouseEvent('click');
    cc.dispatchEvent(event);
});






closeEl.addEventListener('click', function () {
  ipc.send('close-main-window');
});

settingsEl.addEventListener('click', function () {
  ipc.send('open-settings-window');
});

if (process.platform === 'darwin') {
    trayIcon = new Tray(path.join(__dirname, 'img/tray-iconTemplate.png'));
}
else {
    trayIcon = new Tray(path.join(__dirname, 'img/tray-icon-alt.png'));
}

var trayMenuTemplate = [
    {
        label: 'Sound machine',
        enabled: false
    },
    {
        label: 'Settings',
        click: function () {
            ipc.send('open-settings-window');
        }
    },
    {
        label: 'Quit',
        click: function () {
            ipc.send('close-main-window');
        }
    }
];
trayMenu = Menu.buildFromTemplate(trayMenuTemplate);
trayIcon.setContextMenu(trayMenu);
