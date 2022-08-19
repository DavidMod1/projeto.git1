var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var cadastroRouter= require('./routes/cadastro');
var alunosRouter = require('./routes/alunos');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/alunos',alunosRouter);

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


let StrategyConfig = {
  usernameFild:'username',
  passwordFild:'password'
}
passport.use(new LocalStrategy(StrategyConfig,function(username,password,done){

  dao.findByUsername(username)
  .then(([rows]) =>{
    if (rows.length == 0) return done (null,false)

    let login = rows[0]
    if (login.password != password ) return done(null,false)

    else return done(null , login )
  }).catch(err =>{
    console.log(err)
    return done(err,null)
  })

}))

let middlewareAutorization = function (req , resp, next){
  if (req.isAuthenticated()) return next()
  else resp.redirect('/index')
}

app.use('/index', indexRouter);
app.use('/users', usersRouter);
app.use('/criar-conta',usersRouter);
app.use('/cadastro', cadastroRouter);

//

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
