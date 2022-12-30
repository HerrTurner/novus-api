const res = require('express/lib/response');
const mysql = require('mysql');
const mysqlConfig = require('../helpers/mysql-config');
const { NULL } = require('mysql/lib/protocol/constants/types');
const conexion = mysql.createConnection(mysqlConfig);

module.exports.signUp = (req,res) =>{

    const body= req.body;
    let mensaje = "El usuario ya se encuentra registrado";


    const sqlInsert = `INSERT INTO user(username, password, email) VALUES (?,SHA2(?,224),?)`

    const sql = `SELECT id FROM user WHERE username = ? OR email = ?`
    
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    let resultUser;

    async function Fun(){

        conexion.query(sql, [username, email], (error,results,fields)=>{

            if (error)
                //res.send(error)
                throw error

            else{
                resultUser = results[0];
                console.log("resultUser, first query");
                console.log(resultUser);

                if (resultUser == undefined){

                    conexion.query(sqlInsert, [username, password, email], (error, resultsInsert, fields)=>{

                        if(error){
                            //res.send(error);
                            throw error;
                        }
    
                        else{
                            console.log(resultUser);
                            mensaje = 'Usuario insertado correctamente';   
                            res.json({mensaje});
                        }  
                    })
                }
                else{
                    res.json({mensaje});
                }
            }
        })
    }
    Fun();
}