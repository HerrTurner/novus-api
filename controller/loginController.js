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
    let token;
  
    connection.query(sql, [body.username, body.password], (err, result, fields) => {
      if (err) { throw err
        //res.send(err);
      } 
      else {

        if (result.length > 0) {
          idUser = result[0].id;
          message = "User logged in successfully";
          token = jwt.sign(payload, config.key, { expiresIn: 7200 })
          res.json({ idUser, message, token });
        } 
        else {
          message = "User not found or incorrect password";
          res.json({ message });
        }
      }
    });
};