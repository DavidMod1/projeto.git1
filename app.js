var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var cadastroRouter= require('./routes/cadastro');
const passport = require('passport');
const LocalStrategy = require('passaport-local').Strategy

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret:'notSoSecret',
  cookie: {maxAge: 2 * 60 * 1000},
  resave: false,
  saveUninitialized: false,
}))

app.use(passport.initialize())
app.use(passport.session())
let dao =require('./models/dao')

passport.serializeUser( function (user,done){
  done(null,user.id)
})
passport.deserializeUser(function( id, done){
  dao.findById(id)
  .then(([rows])=>{
    let user = rows[0]
    return done(null,user)
  }).cath( err => {
    return done(err,null)
  })
})

app.use('/index', indexRouter);
app.use('/users', usersRouter);
app.use('/criar-conta',usersRouter);
app.use('/cadastro', cadastroRouter);


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
