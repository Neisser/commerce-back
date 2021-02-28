const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')
const database = require('./network/utils/databases')
const indexRouter = require('./network/utils/routes')
const {SentryErrors, errorHandler} = require('./network/handlers/error_handlers')
const { config } = require('./config')
const helmet = require('helmet')
const app = express()
//app.use(cors())
app.set('port', 3000);
database(config.DB_SRV)
app.use(logger('dev'))
const server = require('http').Server(app)
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(helmet())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/api/v1', indexRouter)

// app.use(SentryErrors)
app.use(errorHandler)



server.listen(app.get('port'), () => {
	console.log(`Servidor corriendo en/`, app.get('port'))
})

module.exports = app
