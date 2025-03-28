// Imports de framework y modulos MySQL
const express = require('express');
const router = express.Router();
const app = express();
const mysqlDB = require('../../db_connection/conexion.js');
const cors = require('cors');
app.use(cors());

//Imports de Variables
const {getSkills} = require('../../Routes/skillsRoutes.js');


//Get de competiciones//
router.get(getSkills, async (req, res) => {
    const idCompetition=req.params.idCompetition
    try {
        //Conectar a la base de datos 
        const conexion = await mysqlDB.conexionDB();

        //Consulta SQL
        const [filas] = await conexion.execute("SELECT * FROM skills where idCompetition=?",[idCompetition]);

        // Enviar los resultados como respuesta
        res.send(filas)
    } catch (error) {
        //Enviar error en caso de falla
        res.status(500).send(error);
    }
});

module.exports = router








