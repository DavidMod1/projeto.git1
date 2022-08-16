const express = require('express')
const router = express.Router()

router.get('/',function(req,res){
    res.render('cadastro',{ message : null})
})
router.get('/',function(req,res){
    res.render('cadastro',{ title :'Projeto dv',
    conditon : true
})
})

router.post('/',function (req , res ){
    console.log(req.body)
    res.redirect('/cadastro')
})


module.exports = router