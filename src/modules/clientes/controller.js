const db = require('../../db_connection/mysql');


// Desde acá se llama las tablas que se requieren manejar, y 
// no estar reescribiendo las consultas.

const tabla = 'usuarios';

function all () {
    return db.all(tabla);
}

function onlyOne(id){
    return db.onlyOne(tabla, id);
}

function deleteAll(id) {
    return db.deleteAll(tabla, id);
}

function add(body){
    return db.add(tabla, body);
}

function updateUser(id, body){
    return db.updateUser(tabla,id, body);
}

function uploadProfilePhoto(body){
    return db.uploadProfilePhoto(tabla,body);
}

// function getProfilePhoto(id){
//     return db.getProfilePhoto(tabla,id);
// }


module.exports = {
    all,
    onlyOne,
    deleteAll,
    add,
    updateUser,
    uploadProfilePhoto
}