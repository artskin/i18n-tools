'use strict'

import { app, BrowserWindow } from 'electron'

const { ipcMain } = require('electron')
const dialog = require('electron').dialog;
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9060`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    nodeIntegration: false,
    webSecurity: false,
    icon: './build/icons/icon.ico',
    height: 563,
    useContentSize: true,
    width: 1000
    // titleBarStyle: 'hiddenInset'
    // frame: false, // 去除默认窗口栏
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
// 监听asynchronous-message，接收渲染进程发送的消息
ipcMain.on('asynchronous-message', (event, arg) => {
  console.log(arg) // prints "ping"
  // 回复消息
  
  event.sender.send('asynchronous-reply', 'pong')
})
// 监听synchronous-message，接收渲染进程发送的消息
ipcMain.on('synchronous-message', (event, arg) => {
  //console.log(event) // prints "ping"

  dialog.showOpenDialog({ properties: [ 'openFile', 'openDirectory', 'multiSelections' ]},(path)=>{
    //console.log(path)
    event.sender.send('synchronous-reply', path)
  })
  event.sender.send('synchronous-reply', 'pong')
  // 返回的值
  event.returnValue = 'pong'
})
/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
