// Imports de framework y modulos MySQL
const express = require('express');
const router = express.Router();
const app = express();
const mysqlDB = require('../../db_connection/conexion.js');
const cors = require('cors');
const path = require('path');
const { json } = require('body-parser');
app.use(express.json());
app.use(cors());
const multer = require('multer');

// Imports de Variables
const { createCompetitions } = require('../../Routes/competitionsRoutes.js');
const aleatorio=Date.now();


// Configuración de almacenamiento de imágenes con multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../../public/assets/img/competitionsImg'));
    },
    filename: (req, file, cb) => {
 const reformImgName= aleatorio+file.originalname;
        cb(null, reformImgName); // Guarda el archivo con su nombre original
    },
});

const upload = multer({ storage });

// Post de competiciones
router.post(createCompetitions, upload.single('image'), async (req, res) => {
    try {
        const conexion = await mysqlDB.conexionDB();

        // Obtener los datos del body
        const { competitionName, competitionDate, place, description, competitorsAge } = req.body;
        
        // Obtener el nombre del archivo de la imagen subido
        const image = req.file ? aleatorio+req.file.originalname : null;

        // Insertar los datos en la base de datos
        await conexion.execute(
            "INSERT INTO competitions (competitionName, competitionDate, place, imagenName, description, competitorsAge) VALUES(?,?,?,?,?,?)",
            [competitionName, competitionDate, place, image, description, competitorsAge]
        );

        res.send("Nueva competencia agregada");
    } catch (error) {
        res.status(500).send({
            mensaje: error.message,
            detalles: error.stack, // detalles del error
        });
    }
});

module.exports = router;