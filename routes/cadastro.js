const express = require('express')
const router = express.Router()

router.get('/',function(req,res){
    res.render('cadastro',{ message : null})
})

router.post('/',function (req , res ){
    console.log(req.body)
    res.redirect('/index')
})


module.exports = router