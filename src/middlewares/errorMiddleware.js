// Middleware para manejar rutas que no existen (404)
export const notFound = (req, res, next) => {
    const error = new Error(`No encontrado - ${req.originalUrl}`);
    res.status(404);
    next(error);
};

// Middleware global para manejar errores de lógica o servidor (500)
export const errorHandler = (err, req, res, next) => {
    // Si el error tiene un código de estado, lo usamos; si no, por defecto es 500
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    
    res.status(statusCode).json({
        message: err.message,
        // Solo mostramos el stack trace (detalle del error) si no estamos en producción
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};