const db = require('../../DB/mysql');


// Desde acá se llama las tablas que se requieren manejar, y 
// no estar reescribiendo las consultas.

const tabla = 'usuarios';

function all () {
    return db.all(tabla);
}

function onlyOne(id){
    return db.onlyOne(tabla, id);
}

function deleteAll(body) {
    if (!body || !body.id) {
        return Promise.reject(new Error('El cuerpo de la solicitud debe incluir un id válido'));
    }
    return db.deleteAll(tabla, body);
}

function add(body){
    return db.add(tabla, body);
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
    uploadProfilePhoto
}