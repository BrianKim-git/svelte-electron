import { ipcMain } from 'electron'
import { prisma } from '../db.js'

export function setupSampleHandlers(): void {
  ipcMain.handle('ping', () => 'pong')

  ipcMain.handle('notes:findMany', () =>
    prisma.note.findMany({
      orderBy: { createdAt: 'desc' }
    })
  )
}
