'use strict'

import { app, BrowserWindow, ipcMain, dialog,Menu,shell } from 'electron'
app.name = 'i18n-tools';
const template = [
  {
    label:'刷新',
    click:async()=>{
      console.log('刷新')
      mainWindow.reload()
      //location.reload()
    }
  },
  {
    label: '关于',
    click:async()=>{
      let aboutMe =  new BrowserWindow({
        icon: './build/icons/icon.ico',
        nodeIntegration: false,
        webSecurity: false,
        width: 500,
        height: 370,
        useContentSize: true,
        fullscreen:true,
        fullscreenable:false,
        skipTaskbar:true,
        autoHideMenuBar:true
        // thickFrame:false,
        // opacity:0.99,
        // transparent:true,
        // titleBarStyle:'hidden',
        // titleBarStyle: 'hiddenInset'
        // frame: true, // 去除默认窗口栏
      })
      aboutMe.loadFile('./static/about.html')
    }
  }
]
//console.log(app)
const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)
app.on('browser-window-created',(ev,win)=>{
  win.webContents.on('context-menu',(ev,params)=>{
    menu.popup(win,params.x,params.y)
  })
})
ipcMain.on('show-context-menu',(ev)=>{
  //const win = BrowserWindow.fromWebContents(event.sender)
  //menu.popup(win)
})
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
  mainWindow = new BrowserWindow({
    icon: './build/icons/icon.ico',
    nodeIntegration: false,
    webSecurity: false,
    width: 1000,
    height: 563,
    useContentSize: true,
    webPreferences: {
      nodeIntegration: true
    },
    show:false,
    // thickFrame:false,
    // opacity:0.99,
    // transparent:true,
    // titleBarStyle:'hidden',
    // titleBarStyle: 'hiddenInset'
    // frame: true, // 去除默认窗口栏
  })

  mainWindow.loadURL(winURL)
  mainWindow.on('closed', () => {
    mainWindow = null
  })
  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
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
// ipcMain.on('asynchronous-message', (event, arg) => {
//   console.log(arg) // prints "ping"
//   // 回复消息
//   event.sender.send('asynchronous-reply', 'asyn-pong')
// })
ipcMain.on('save-dialog', (event,arg) => {
  let filename = '未命名.json';
  if(arg){
    filename = arg
  }
  let saveOptions = {
    title:'导出语言包',
    defaultPath:filename,
    properties:['openFile','openDirectory'],
    filters:[
      {name:'All files',extensions:["js","json","ts"]}
    ]
  }
  dialog.showSaveDialog(saveOptions).then(path=>{
    event.sender.send('save-file', path)
  })
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
