let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
const session = require('express-session')

let optodoRouter = require('./routes/optodo');
let pritodoRouter = require('./routes/pritodo');
let blacklistRouter = require('./routes/blacklist')
let messagesRouter = require('./routes/messages');
let usersRouter = require('./routes/users');

let app = express();
// app.use(bodyParser.json())   //JSON解析
// app.use(bodyParser.urlencoded({ extended: true }))
// //use()方法还有一个可选的路径字符串，对传入请求的URL的开始匹配。
// //use方法来维护一个中间件队列

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

const redisClient = require('./db/redis')
const RedisStore = require('connect-redis')(session)  
const sessionStore = new RedisStore({
  client : redisClient
})
app.use(session({
  secret:"WJiol$_123115",
  cookie:{
    path:'/',
    httpOnly:true,
    maxAge: 24 * 60 * 60 * 1000
  },
  store:sessionStore
}))

app.use('/api/optd',optodoRouter);
app.use('/api/pritd',pritodoRouter);
app.use('/api/black',blacklistRouter)
app.use('/api/mes',messagesRouter)
app.use('/api/user', usersRouter);


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
