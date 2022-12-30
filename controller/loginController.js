const jwt = require('jsonwebtoken');
const config = require('../config/jwt');
const mysql = require('mysql');


//create mysql connection to db
const mysqlConfig = require('../helpers/mysql-config');
const connection = mysql.createConnection(mysqlConfig);


module.exports.login = (req, res) => {

    const body = req.body;
    const sql = "SELECT * FROM user WHERE username = ? AND password = SHA2(?,224)";
    let idUser;
    let message;
  
    connection.query(sql, [body.username, body.password], (err, result, fields) => {
      if (err) {
        res.status(500).send(err);
      } 
      else {

        if (result.length > 0) {
          idUser = result[0].idUser;
          message = "User logged in successfully";
          res.status(200).json({ idUser, message });
        } 
        else {
          message = "User not found or incorrect password";
          res.status(404).json({ message });
        }
      }
    });
};