const res = require('express/lib/response');
const mysql = require('mysql');
const mysqlConfig = require('../helpers/mysql-config');
const { NULL } = require('mysql/lib/protocol/constants/types');
const connection = mysql.createConnection(mysqlConfig);


//return all usernames
module.exports.getUserName = (req, res) => {

const sql = `SELECT userName from user`
connection.query(sql, (error, results, fields) => {
    if(error) throw error
            //res.send(error);

    console.log(results);
    res.json(results);
    
    })
}