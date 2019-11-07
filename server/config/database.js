/* Database Config file (Defines the connection with the database) */
import Sequelize from 'sequelize'
require('dotenv').config()

let db

console.log(
  process.env.POSTGRES_DB,
  process.env.POSTGRES_USER,
  process.env.POSTGRES_PASSWORD
)

if (process.env.DATABASE_URL) {
  db = new Sequelize(process.env.DATABASE_URL)
} else {
  db = new Sequelize(
    process.env.POSTGRES_DB,
    process.env.POSTGRES_USER,
    process.env.POSTGRES_PASSWORD,
    {
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST || 'localhost',
      pool: { max: 5, min: 0, acquire: 30000, idle: 10000 },
    }
  )
}

export default db
