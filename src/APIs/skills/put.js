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
const {updateSkill} = require('../../Routes/skillsRoutes.js');


// Update de competiciones
router.put(updateSkill, async (req, res) => {
    const id = req.params.idSkill;

    try {
        const conexion = await mysqlDB.conexionDB();

        //Obtener los datos de la propiedad
        const { skillName,competitionName,numberOfCompetitors,imageName,description,idCompetition} = req.body;

        //Cambiar la nota en la tabla
        await conexion.execute("UPDATE skills SET skillName=?,competitionName=?,numberOfCompetitors=?,imageName=?,description=?,idCompetition=? where idSkills=? ", [skillName,competitionName,numberOfCompetitors,imageName,description,idCompetition, id]);

        res.send("Habilidad modificada");
    } catch (error) {
        res.status(500).send({
            mensaje: error.message,
            detalles: error.stack //detalles del error
        });
    }
}
);

module.exports = router