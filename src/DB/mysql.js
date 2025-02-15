const mysql = require('mysql');
const config = require('../config');

// Consultas -> Para la BD ( se requieren algunos parametros como la tabla, el ID)
// Dependiendo que se necesite.
const DBconfig = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
}

let conection;

function conectionMYSQL(){
    conection = mysql.createConnection(DBconfig);

    conection.connect((err) => {
        if(err){
            console.log('DB error: ', err);
            setTimeout(conectionMYSQL, 200);
        }else{
            console.log('DB conectada satisfactoriamente');
        }
    })


    conection.on('Error', (err) => {
        console.log('DB ERROR: ', err);
        if(err.code === 'PROTECOL_CONNECTION_LOST'){
            conectionMYSQL();
        }
        else{
            throw err;
        }
    })
}

conectionMYSQL();

function all(table){
    return new Promise( (resolve, reject) => {
        conection.query(`SELECT * FROM ${table}`, (error, result) =>{
            if(error) return reject(error);
            resolve(result);
        })
    })
}

function onlyOne(table, id){
    return new Promise( (resolve, reject) => {
        conection.query(`SELECT * FROM ${table} WHERE id=${id}`, (error, result) =>{
            if(error) return reject(error);
            resolve(result);
        })
    })
}

function add(table, data){
    if(data && data.id == 0){
        return addUser(table,data);
    }
}

function addUser(table, data){
    return new Promise( (resolve, reject) => {
        conection.query(`INSERT INTO ${table} SET ?`, data, (error, result) =>{
            if(error) return reject(error);
            resolve(result);
        })
    })
}

function updateUser(table, id, data) {
    return new Promise((resolve, reject) => {
        conection.query(
            `UPDATE ${table} SET ? WHERE id = ?`, 
            [data, id], 
            (error, result) => {
                if(error) return reject(error);
                resolve(result);
            }
        );
    });
}




function deleteAll(table, id) {
    return new Promise( (resolve, reject) => {
        conection.query(`DELETE FROM ${table} WHERE id = ${id}`, (error, result) =>{
            if(error) return reject(error);
            resolve(result);
        })
    })
}



function uploadProfilePhoto(table, data){
    return new Promise( (resolve, reject) => {
        conection.query(
            `INSERT INTO ${table} (id, photo_url) VALUES (?, ?) 
             ON DUPLICATE KEY UPDATE photo_url = VALUES(photo_url)`,
            [data.id, data.photo_url],
            (error, result) => {
            if(error) return reject(error);
            resolve(result);
        })
    })
}

module.exports = {
    all,
    onlyOne,
    add,
    updateUser,
    deleteAll,
    uploadProfilePhoto
}