require('dotenv').config()
export const Sequelize = require('sequelize')

const db  = process.env.DATABASE_NAME
const username = process.env.DATABASE_USERNAME
const password = process.env.DATABASE_PASSWORD
const host = process.env.DATABASE_HOST
const port = process.env.DATABASE_PORT

export const sequelize = new Sequelize(`postgres://${username}:${password}@${host}:${port}/${db}`)

sequelize
    .authenticate()
    .then(() => console.log('Connection has been established successfully.'))
    .catch(err => console.error('Unable to connect to the database:', err));