const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '8431David',
    database: 'josino',
    port:'8080',
});

module.exports= {

findById:function(id){
    connection.promise().query('select * from users where id=?',[id])
},

findByUsername: function(username) {
    return connection.promise().query('select * from users whare nome=?', [username])
}

}