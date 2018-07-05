global.__base = __dirname + '/';

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var register = require('./routes/register');
var messages = require('./lib/messages');
var login = require('./routes/login');
var user = require('./lib/middleware/user');
var entries = require('./routes/entries');
var validate = require('./lib/middleware/validate');
var page = require('./lib/middleware/page');
var entry = require('./lib/entry');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: '1234'
}));
app.use(user);
app.use(messages);
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/post', entries.form);
app.post('/post',
  validate.auth,
  validate.required('title'),
  validate.lengthAbove('title', 4),
  validate.required('body'),
  entries.submit);
app.get('/register', register.form);    // 添加注册路由
app.post('/register', register.submit);   // 添加注册路由
app.get('/login', login.form);    // 添加登入路由
app.post('/login', login.submit);
app.get('/logout', login.logout);
app.get('/:page?', page(entry.count, 5),
	entries.list);
app.get('/', page(entry.count, 5),
	entries.list);

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
