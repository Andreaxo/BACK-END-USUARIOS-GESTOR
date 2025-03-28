// Imports de framework y modulos MySQL
const express = require('express');
const router = express.Router();
const app = express();
const mysqlDB = require('../../db_connection/conexion.js');
const cors = require('cors');
app.use(cors());

//Imports de Variables
const { getCompetitionsById} = require('../../Routes/competitionsRoutes.js');


//Get de competiciones por id//
router.get(getCompetitionsById, async (req, res) => {
    const id = req.params.idCompetition;
    try {
        //Conectar a la base de datos 
        const conexion = await mysqlDB.conexionDB();

        //Consulta SQL
        const [filas] = await conexion.execute("SELECT * FROM competitions where idCompetitions=?",[id]);

        // Enviar los resultados
        res.send(filas)
    } catch (error) {
        //Enviar error en caso de falla
        res.status(500).send({
            mensaje: error.message,
            detalles: error.stack //detalles del error
        });
    }
});

module.exports = router
