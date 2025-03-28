const express = require('express');
const router = express.Router();
const app = express();
const mysqlDB = require('../../db_connection/conexion.js');
const cors = require('cors');
app.use(cors());
const multer = require('multer');
const {postByCompetition} = require('../../Routes/documentsRoutes.js');

// Configurar la ruta del multer, la key del archivo siempre debe ser pdf.
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, '../documents/');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    },
  });
  
  const upload = multer({ storage });

//Aqui se crea el endpoint   
router.post(postByCompetition, upload.single('pdf'), async (req, res) => {
    
    try {      
        const conexion = await mysqlDB.conexionDB();

        //Obtener fecha en formato SQL
        const getCurrentDateFormatted = () => {
            const date = new Date();
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Sumar 1 porque los meses empiezan en 0
            const day = String(date.getDate()).padStart(2, '0'); // Asegura que el día tenga 2 dígitos
            return `${year}-${month}-${day}`;
          };

        //Establecer los datos a enviar
        const uploadDate = getCurrentDateFormatted();
        const fileName=req.file.filename;
        const competitionId=req.params.idCompetition;
        // body
        const {nombre,description} = req.body;

        //Verificar que no hayan campos vacios, esto se podria hacer en el front
        if (!nombre || !description || !competitionId) {
            return res.status(400).send({
                mensaje: "Todos los campos son obligatorios y se debe subir un archivo."
            });
        }

        //Insertar los datos en tabla
        await conexion.execute("INSERT INTO documents (fileName,documentName, description, uploadDate, competitionId) VALUES(?,?,?,?,?)",
             [fileName,nombre, description, uploadDate, competitionId]);

        res.status(200).json({
            mensaje: "Nuevo documento agregado exitosamente.",
            datos: {
                filename:req.file.filename,
                originalName: req.file.originalname,
                nombre,
                description,
                uploadDate,
                competitionId,
            },
        });
    } catch (error) {
        res.status(500).send({
            mensaje: error.message,
            detalles: error.stack //detalles del error
        });
    }

});

module.exports = router

