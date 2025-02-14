const express = require('express');
const response = require('../network/responses');
const router = express.Router();
const controller = require('../modules/clientes/controller');



// Asignación de rutas
router.get('/', all); // Obtener todos los clientes
router.get('/:id', onlyOne); // Obtener un cliente por ID
router.post('/', add) // Añadir un cliente o actualizarlo
router.delete('/', deleteAll); // Eliminar todos los clientes



// Obtener todos los clientes
async function all(req, res, next) {
    try {
        const items = await controller.all();
        response.success(req, res, items, 200);
    } catch (error) {
        next(error);
    }
}

// Obtener un cliente por ID
async function onlyOne(req, res, next) {
    try {
        const items = await controller.onlyOne(req.params.id);
        response.success(req, res, items, 200);
    } catch (error) {
        next(error);
    }
}


async function add(req, res, next) {
    try{
        const items = await controller.add(req.body);
        if(req.body.id == 0){
            message = 'Usuario creado con esito';
        }else{
            message = 'Usuario actualizado con esito';
        }
        response.success(req, res, message, 201);
    }catch(error){
        next(error);
    }
    
}

// Eliminar todos los clientes
async function deleteAll(req, res, next) {
    try {
        await controller.deleteAll(req.body);
        response.success(req, res, 'Clientes eliminados satisfactoriamente', 200);
    } catch (error) {
        next(error);
    }
}





module.exports = router;
