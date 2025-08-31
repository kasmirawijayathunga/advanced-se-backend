import { PrismaClient } from '@prisma/client'
import config from './config'

const db = new PrismaClient({
    datasourceUrl: `mysql://${config.db.user}:${config.db.password}@${config.db.host}:${config.db.port}/${config.db.database}`
})

export default db;