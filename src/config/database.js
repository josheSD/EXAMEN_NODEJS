const mysql = require('mysql');
const colors = require('colors');
const { database } = require('./keys');
const { promisify } = require('util')
const pool = mysql.createPool(database);

pool.getConnection((err,connection)=>{

    if(err){
        console.error(err);
        return;
    }
    if(connection){
        connection.release();
        console.log(`DB is ${colors.green('connected')}`)
        return;
    }

});

pool.query = promisify(pool.query);

module.exports = {
    pool
}
