var express = require('express');
///const {render} = require('../app')
var router = express.Router();

var dao = require('../models/db')

router.get('/', function (request, response){
        dao.list().then( ( [rows] )=>{
            response.render('alunos/list', {alunos:rows})
        }).catch(err => {
            console.log(err)
             response.render('alunos/list', {alunos: [] })
        })
});

router.post('/delete', function (request, response){
    dao.remove(request.body.id)
    .then(([result]) =>{
        console.log(result)
        if (result.affectedRows >0)
            request.flash('success','aluno excluido com sucesso')
            else
            request.flash('sucess',` Não foi encontrado no banco aluno com id =${request.body.id}`)

         response.redirect('/alunos')
    }).catch(err =>{
        console.log(err)
        request.flash('error', 'Ocorreu um erro na exclusão do aluno.')
        response.redirect('/alunos')
    })

   
})

router.get('/form', async function (request, response){

    let row = {
        id:'',
        nome:'',
        email:'',
        curso:''
    }

    if(request.query.id){
    [result]= await dao.findById(request.query.id)
    console.log(result)
    row = result[0]
    console.log(row)
     }
    
        
    response.render('alunos/form' , {aluno : row})
})

router.post('/save',function (request,response){

        let operations;
        if (request .body.id){
            operacao = dao.update
        success = `Dados do aluno catualizados com sucesso`
        }else{
           operacao = dao.save
           success = `Aluno cadastrado com sucesso`
        }

    operacao(request.body)
    .then(([result]) =>{
        request.flash('sucess',success)
        response.redirect('/alunos');

    }).catch(err =>{
        console.log(err)
        request.flash('error',`Não foi possivel cadastrar o aluno`)
        response.redirect('/alunos');
    })

})

router.get('/search',function(request,response){
    if(request.query.nome){
        dao.search(request.query.nome)
        .then(([rows]) =>{
            response.render('alunos/list',{alunos: rows})
        }).catch(err =>{
            console.log(err)
            request.flash('error','Não foi possivel efetuar a busca por nome')
            response.redirect('/alunos')
        })
    }else{
        response.redirect('/alunos')
    }


})

module.exports = router;