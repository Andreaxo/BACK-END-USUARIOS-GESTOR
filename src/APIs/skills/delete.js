// Imports de framework y modulos MySQL
const express = require('express');
const router = express.Router();
const app = express();
const mysqlDB = require('../../db_connection/conexion.js');
const cors = require('cors');
app.use(cors());

//Imports de Variables
const { deleteSkill} = require('../../Routes/skillsRoutes.js');


//Delete de notas
router.delete(deleteSkill, async (req, res) => {
    const id = req.params.idSkill;

    try {
        const conexion = await mysqlDB.conexionDB();

        //Eliminar la competicion
        await conexion.execute("DELETE from skills  where idSkills=? ", [id]);

        res.send("Habilidad eliminada");
    } catch (error) {
        res.status(500).send(error);

    }
}
);

module.exports = router