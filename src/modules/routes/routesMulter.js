const express = require('express');
const response = require('../../network/responses');
const router = express.Router();
const controller = require('../clientes/controller');

const multer = require('multer');
const path = require('path');
const fs = require('fs');


// Configuración de los directorios.
const uploadPath = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}


//Configuración del almacenamiento.
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadPath),
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now();
        cb(null, 'profile-' + uniqueSuffix + path.extname(file.originalname));
    },
});


// Limite permitido de almacenamiento.
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 },
});


// Rutas para foto de perfil 
router.post('/upload/:id', upload.single('archivo'), uploadProfilePhoto)


// Función para la foto de perfil.
async function uploadProfilePhoto(req, res, next){
try {
        if (!req.file) throw new Error('No se ha proporcionado ningún archivo');

        const data = {
            id: req.params.id,
            photo_url: `${req.file.filename}`,
        };
        await controller.uploadProfilePhoto(data);

        response.success(req, res, {
            message: 'Foto de perfil subida correctamente',
            fileUrl: data.photo_url,
        }, 200);
    } catch (error) {
        next(error);
    }
};



module.exports = router;
