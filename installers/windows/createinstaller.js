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
    iconUrl: 'file:///C:/xampp/htdocs/luke_calc/assets/favicon.ico',
    noMsi: true,
    outputDirectory: path.join(outPath, 'windows-installer'),
    exe: 'va-calc2.exe',
    description: 'VA Disability Calculator',
    setupExe: 'va-calc-installer.exe'
  })
}
