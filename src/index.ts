import express = require('express')
import cors = require('cors')
import parser = require('body-parser')
import userRoutes from './routes/users'
import transactionRoutes from './routes/transactions'
import payableRoutes from './routes/payables';
import syncTables from './database/init-tables'

const app = express()

app.use(parser.json())
app.use(parser.urlencoded({ extended: true }))
app.use(cors())
app.use('/users', userRoutes)
app.use('/transactions', transactionRoutes)
app.use('/payables', payableRoutes)

syncTables()

module.exports = app