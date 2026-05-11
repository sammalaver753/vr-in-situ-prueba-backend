import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Middleware para verificar que el usuario está autenticado
export const protect = async (req, res, next) => {
    let token;

    // El token debe venir en el Header como 'Bearer <token>'
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Extraer el token del string "Bearer XXXXX"
            token = req.headers.authorization.split(' ')[1];

            // Decodificar el token usando la clave secreta del .env
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Buscar el usuario en la BD (sin la contraseña) y añadirlo al objeto 'req'
            req.user = await User.findById(decoded.id).select('-password');

            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'No autorizado, token fallido' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'No autorizado, no hay token' });
    }
};

// Middleware para verificar si el usuario es Administrador
export const admin = (req, res, next) => {
    if (req.user && req.user.role === 'Admin') {
        next(); // Es admin, puede pasar
    } else {
        res.status(403).json({ message: 'No autorizado como administrador' });
    }
};