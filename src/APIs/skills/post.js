// Imports de framework y modulos MySQL
const express = require('express');
const router = express.Router();
const app = express();
const mysqlDB = require('../../db_connection/conexion.js');
const cors = require('cors');
const { json } = require('body-parser');
app.use(express.json());
app.use(cors());

//Imports de Variables
const {createSkill} = require('../../Routes/skillsRoutes.js');


// Post de competiciones
router.post(createSkill, async (req, res) => {

    const idCompetition=req.params.idCompetition
    try {
        const conexion = await mysqlDB.conexionDB();

        //Obtener los datos del body
        const { skillName, competitionName, numberOfCompetitors, imageName, description } = req.body;

        //Insertar los datos en tabla
        await conexion.execute("INSERT INTO skills (skillName,competitionName,numberOfCompetitors,imageName,description,idCompetition) VALUES(?,?,?,?,?,?)",
             [skillName, competitionName,numberOfCompetitors, imageName, description,idCompetition ]);

        res.send("Nueva Habilidad agregada");
    } catch (error) {
        res.status(500).send({
            mensaje: error.message,
            detalles: error.stack //detalles del error
        });
    }
}
);

module.exports = router
