const express = require('express');
const router = express.Router();
const app = express();
const path = require('path');
const cors = require('cors');
const fs = require('fs');
app.use(cors());
const mysqlDB = require('../../db_connection/conexion.js');
/* const multer = require('multer'); */
const {deleteByFileName} = require('../../Routes/documentsRoutes.js');

router.delete(deleteByFileName, async (req, res) => {
    try {

      const conexion = await mysqlDB.conexionDB();
      const fileName = req.params.fileName;

      // Obtener la ruta completa del archivo
      const filePath = path.join(__dirname, '..','..','documents', fileName);
  
      await conexion.execute("DELETE from documents  where fileName=? ", [fileName]);

      fs.unlink(filePath, (err) => {
        if (err) {
            return res.status(500).send({
                mensaje: 'Error al eliminar el archivo',
                detalles: err.message
            });
        }

        res.status(200).send({
            mensaje: 'Archivo eliminado exitosamente'
        });
    });

    } catch (error) {
      res.status(500).send({
        mensaje: error.message,
        detalles: error.stack,
      });
    }
  });
  
  module.exports = router;