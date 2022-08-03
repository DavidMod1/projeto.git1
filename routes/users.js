var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('criar-conta', { title: 'Express' })
});


router.post('/',function (req , res ){
  console.log(req.body)
  res.redirect('/criar-conta')
})


module.exports = router;
