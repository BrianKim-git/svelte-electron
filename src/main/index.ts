import { app, BrowserWindow, shell } from 'electron'
import { join } from 'path'
import { setupSampleHandlers } from './sample'
import { prisma } from './db.js'

function createWindow(): void {
  console.log('App is running in', app.isPackaged ? 'production' : 'development', 'mode.')
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: join(__dirname, '../preload/index.cjs'),
      contextIsolation: true,
      nodeIntegration: false,
    }
  })

  win.on('ready-to-show', () => win.show())

  win.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url)
    return { action: 'deny' }
  })

  if (!app.isPackaged) {
    win.loadURL(process.env.ELECTRON_RENDERER_URL || 'http://localhost:4173')
    win.webContents.openDevTools()
  } else {
    win.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

app.whenReady().then(() => {
  setupSampleHandlers()
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', async () => {
  await prisma.$disconnect()
  app.quit()
})
