const mysql2 = require('mysql2');
const config = require('../config');

// Configuración de la base de datos
const DBconfig = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
}

let connection;

// Función para conectar a la base de datos
function connectionMYSQL() {
    connection = mysql2.createConnection(DBconfig);

    connection.connect((err) => {
        if (err) {
            console.log('DB error: ', err);
            setTimeout(connectionMYSQL, 200);
        } else {
            console.log('DB conectada satisfactoriamente - Usuarios y Form');
        }
    });

    connection.on('error', (err) => {
        console.log('DB ERROR: ', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            connectionMYSQL();
        } else {
            throw err;
        }
    });
}

connectionMYSQL();

// Función para obtener todos los registros de una tabla
function all(table) {
    return connection.promise().query(`SELECT * FROM ${table}`);
}

// Función para obtener un registro específico por ID
function onlyOne(table, id) {
    return connection.promise().query(`SELECT * FROM ${table} WHERE id = ?`, [id]);
}

// Función para agregar un nuevo registro a una tabla
function add(table, data) {
    if (data && data.id == 0) {
        return addUser(table, data);
    } 
}

// Función para agregar un nuevo usuario
function addUser(table, data) {
    return connection.promise().query(`INSERT INTO ${table} SET ?`, data);
}

function updateUser(table, id, data) {
    return connection.promise().query(`UPDATE ${table} SET ? WHERE id = ?`, [data, id]);
}

function deleteAll(table, id) {
    return connection.promise().query(`DELETE FROM ${table} WHERE id = ?`, [id]);
}

function uploadProfilePhoto(table, data) {
    return connection.promise().query(
        `INSERT INTO ${table} (id, photo_url) VALUES (?, ?) 
         ON DUPLICATE KEY UPDATE photo_url = VALUES(photo_url)`,
        [data.id, data.photo_url]
    );
}


/* ------------   Modulo de formulario -----------*/

function sendForm(table, data) {
    if (!data.id) {
        return insert(table, data);
    } else {
        return updateForm(table, data);
    }
}


function insert(table, data) {
    return new Promise((resolve, reject) => {
        connection.query(
            `INSERT INTO ${table} 
            (name, lastname, phone, documentType, documentNumber, email, birthday, indexCourse, programName, formationCenter, competition, skill) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                data.name, 
                data.lastname, 
                data.phone, 
                data.documentType, 
                data.documentNumber, 
                data.email, 
                data.birthday, 
                data.indexCourse, 
                data.programName, 
                data.formationCenter,
                data.competition,
                data.skill
            ],
            (error, result) => {
                return error ? reject(error) : resolve(result);
            }
        );
    });
}


function updateForm( table, data ){
    return new Promise( ( resolve, reject ) => {
        connection.query(`UPDATE ${table} SET ? WHERE id = ?`, [data, data.id], (error, result) => {
            return error ? reject(error) : resolve(result); 
        })
    } )
}

function getForm( table ){
    return new Promise( ( resolve, reject ) => {
        connection.query(`SELECT * FROM ${table}`, (error, result) => {
            return error ? reject(error) : resolve(result); 
        })
    } )
}

function getFormById( table, id ){
    return new Promise( ( resolve, reject ) => {
        connection.query(`SELECT * FROM ${table} WHERE id = ${id}`, (error, result) => {
            return error ? reject(error) : resolve(result); 
        })
    } )
}

function deleteForm( table, data ){
    return new Promise( ( resolve, reject ) => {
        connection.query(`DELETE FROM ${table} WHERE id = ?`, data.id, (error, result) => {
            return error ? reject(error) : resolve(result); 
        })
    } )
}

// Exportar las funciones para su uso en otras partes del proyecto
module.exports = {
    /* Modulo usuarios */
    all,
    onlyOne,
    add,
    updateUser,
    deleteAll,
    uploadProfilePhoto,
    /* Modulo formulario */
    sendForm,
    getForm,
    getFormById,
    updateForm,
    deleteForm
};
