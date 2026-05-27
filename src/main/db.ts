import { PrismaClient } from '@prisma/client'
import { PrismaLibSql } from '@prisma/adapter-libsql'
import { join } from 'path'
import { app } from 'electron'

function getDbUrl(): string {
  if (app.isPackaged) {
    return `file:${join(app.getPath('userData'), 'app.db')}`
  }
  return `file:${join(app.getAppPath(), 'prisma/db/dev.db')}`
}

export const prisma = new PrismaClient({
  adapter: new PrismaLibSql({ url: getDbUrl() })
})
