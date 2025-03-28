const { validationResult } = require("express-validator");

const validateHelper = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log('Errores de validación:', errors.array());
        return res.status(400).json({ 
            errors: errors.array(),
            body: req.body // Añade el cuerpo para depuración
        });
    }
    next();
};
module.exports = { validateHelper };
