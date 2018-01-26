# VA Calculator

VA Calculator with bilateral calculations built in Electron and Jquery.


## shortcuts

There's a few shortcuts configured for the calculator. While holding alt, press 1-9 (unfortunately no number pad configuration yet)
alt + a,s,d,f are reserved for the limb shortcuts, and alt + c for clear.

## Starting the Calculator

Run `npm run start` to start the electron app.

## Packaging changes

Run `npm run package ` to build a win32 --arch=x64 package of the calculator. No other platform has been configured. After packaging
the package should deliver to the root of va-calc.

## Running the installer

Run `npm run installer ` to build a exe of the calculator. As of now, there's not too many exceptions built into the installer. After the installer completes, you should see a installer folder in the root of the project.

## web-calc

This is a directory for the a web version of the calculator. To test, run the index.html in your browser.

## Further help

If you are having issues run the start script. Try deleting the node modules and running `npm install`.


### Docs
https://electronjs.org/docs
https://medium.com/developers-writing/building-a-desktop-application-with-electron-204203eeb658
