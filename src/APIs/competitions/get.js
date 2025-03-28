// Imports de framework y modulos MySQL
const express = require('express');
const router = express.Router();
const app = express();
const mysqlDB = require('../../db_connection/conexion.js');
const cors = require('cors');
app.use(cors());

//Imports de Variables
const { getCompetitions} = require('../../Routes/competitionsRoutes.js');

//Get de competiciones//
router.get(getCompetitions, async (req, res) => {
    try {
        //Conectar a la base de datos 
        const conexion = await mysqlDB.conexionDB();

        //Consulta SQL
        const [filas] = await conexion.execute("SELECT * FROM competitions");

        // Enviar los resultados como respuesta
        res.send(filas)
    } catch (error) {
        //Enviar error en caso de falla
        res.status(500).send(error);
    }
});

module.exports = router








