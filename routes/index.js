const { application } = require('express');
var express = require('express');
var router = express.Router();
const passport = require('passport')


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { message : null });
});

router.post('/' , passport.authenticate('local',{
  successRedirect:'/alunos' ,
  failureRedirect:'/alunos'
}))

module.exports = router;
