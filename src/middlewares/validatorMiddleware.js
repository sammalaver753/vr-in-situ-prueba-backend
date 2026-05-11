import { body, validationResult } from 'express-validator';

export const validateCatalog = [
    body('title').notEmpty().withMessage('El título es obligatorio'),
    body('type').isIn(['pelicula', 'serie']).withMessage('El tipo debe ser pelicula o serie'),
    body('contentUrl').isURL().withMessage('Debe ser una URL válida de YouTube'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];