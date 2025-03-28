// Imports de framework y modulos MySQL
const express = require('express');
const router = express.Router();
const app = express();
const mysqlDB = require('../../db_connection/conexion.js');
const cors = require('cors');
app.use(cors());

//Imports de Variables
const {deleteCompetitions} = require('../../Routes/competitionsRoutes.js');


//Delete de notas
router.delete(deleteCompetitions, async (req, res) => {
    const id = req.params.idCompetition;

    try {
        const conexion = await mysqlDB.conexionDB();

        //Eliminar la competicion
        await conexion.execute("DELETE from competitions  where idCompetitions=? ", [id]);

        res.send("Competicion eliminada");
    } catch (error) {
        res.status(500).send(error);

    }
}
);

module.exports = router