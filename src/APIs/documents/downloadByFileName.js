const express = require('express');
const router = express.Router();
const app = express();
const path = require('path');
const cors = require('cors');
app.use(cors());
/* const multer = require('multer'); */
const {downloadByFileName} = require('../../Routes/documentsRoutes.js');

router.get(downloadByFileName, async (req, res) => {
    try {
      const fileName = req.params.fileName;

      // Obtener la ruta completa del archivo
      const filePath = path.join(__dirname, '..','..','documents', fileName);
  
      // Si el archivo existe, se lo devuelve como respuesta
      res.sendFile(filePath);

    } catch (error) {
      res.status(500).send({
        mensaje: error.message,
        detalles: error.stack,
      });
    }
  });
  
  module.exports = router;