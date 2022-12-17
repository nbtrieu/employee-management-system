const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root123',
    database: employees_db
});

connection.connect((error) => {
    if (error) throw error;
});

class DB {
    
}