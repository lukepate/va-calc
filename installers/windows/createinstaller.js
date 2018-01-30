const createWindowsInstaller = require('electron-winstaller').createWindowsInstaller
const path = require('path')


getInstallerConfig()
  .then(createWindowsInstaller)
  .catch((error) => {
    console.error(error.message || error)
    process.exit(1)
  })

function getInstallerConfig () {
  console.log('creating windows installer')
  //const rootPath = path.join('./')
  const outPath = './'

  return Promise.resolve({
    appDirectory: path.join(outPath, 'va-calc2-win32-x64'),
    authors: 'Team and Tech',
    iconUrl: 'C:/Users/Public/Desktop/app-icon.ico',
    setupIcon: 'C:/Users/Public/Desktop/app-icon.ico',
    noMsi: true,
    outputDirectory: path.join('C:/ProgramData/Microsoft/Windows/Start Menu/Programs', 'va-calc'),
    exe: 'va-calc2.exe',
    description: 'VA Disability Calculator',
    setupExe: 'va-calc-installer.exe'
  })
}
