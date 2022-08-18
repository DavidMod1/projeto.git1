const mysql =require('mysql2');

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '8431David',
    database: 'josino',
    port:'8080',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit:0
});

module.exports = pool 

let operations = {

    list:function() {
        return pool.promise().query('select * from alunos ')
        
    },

    findById(id){
        return pool.promise().query('select * from alunos where id=? ',[id])
    },
    save: function(aluno){
        return pool.promise().execute('INSERT INTO alunos (nome, email, curso) VALUES (?, ?, ?);', [aluno.nome, aluno.email, aluno.curso])
    },
    update: function(aluno){
        return pool.promise().execute('UPDATA alunos set nome=?,email=?,curso=? where id=?',
        aluno.nome ,anulo.email, aluno.curso, aluno.id)
    },
    remove:function(id){  
        return pool.promise().execute('delete from alunos where id=?', [id])
    },
    search : function(nome){
        return pool.promise().query('select * from alunos where nome like ? ',['%'+nome+'%' ])
    }

}   

    module.exports = operations

