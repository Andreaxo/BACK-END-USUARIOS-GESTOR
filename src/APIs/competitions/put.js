// Imports de requerimientos
const express = require('express');
const router = express.Router();
const app = express();
const mysqlDB = require('../../db_connection/conexion.js');
const cors = require('cors');
const { json } = require('body-parser');
app.use(express.json());
app.use(cors());

//Imports de Variables
const { updateCompetitions} = require('../../Routes/competitionsRoutes.js');


// Update de competiciones
router.put(updateCompetitions, async (req, res) => {
    const id = req.params.idCompetition;

    try {
        const conexion = await mysqlDB.conexionDB();

        //Obtener los datos de la propiedad
        const { competitionName, competitionDate, place, imagenName, description, competitorsAge} = req.body;

        //Cambiar la nota en la tabla
        await conexion.execute("UPDATE competitions SET competitionName=?,competitionDate=?,place=?,imagenName=?,description=?,competitorsAge=? where idCompetitions=? ", [competitionName, competitionDate, place, imagenName, description, competitorsAge, id]);

        res.send("Competicion modificada");
    } catch (error) {
        res.status(500).send(error);
    }
}
);

module.exports = router