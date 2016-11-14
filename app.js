var express = require('express')
var path = require('path')
var favicon = require('serve-favicon')
var logger = require('morgan')
var bodyParser = require('body-parser')
var session = require('express-session')

var index = require('./routes/index')
var login = require('./routes/login')
var logout = require('./routes/logout')
var clone = require('./routes/clone')
var vmInfo = require('./routes/vm')

var app = express()

let sess = {
  secret: 'jh12k3hj&^*&^& gsdafjkg@#',
  cookie: {
  },
  resave: false,
  saveUninitialized: true
}

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(session(sess))

app.use(async (req, res, next) => {
  if (req.path === '/login') {
    next()
  } else if (!req.session.username || req.session.username === '') {
    res.redirect('/login')
    res.end()
  } else {
    next()
  }
})

app.use('/', index)
app.use('/login', login)
app.use('/logout', logout)
app.use('/clone', clone)
app.use('/domain', vmInfo)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
