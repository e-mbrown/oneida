import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import fs from 'fs'

const run = async () => {
    const db = await open({
        filename: './oneida.db',
        driver: sqlite3.cached.Database
    })
    
    const rows = await db.all("SELECT * FROM ONEIDA")
    fs.writeFileSync('./src/data/places.json', JSON.stringify(rows))
}

run()



