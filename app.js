const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')
const database = require('./network/utils/databases')
const indexRouter = require('./network/utils/routes')
const usersRouter = require('./routes/users')

const app = express()
//app.use(cors())
//database(?)
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/api/v1', indexRouter)

module.exports = app
