import mysql from 'mysql2';
const pool = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'Ash@2004',
    database:'ToDo'
});

export default pool.promise();