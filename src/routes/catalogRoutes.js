import express from 'express';
import { 
    getCatalog, 
    createCatalogItem, 
    updateCatalogItem, 
    deleteCatalogItem 
} from '../controllers/catalogController.js';
import { protect, admin } from '../middlewares/authMiddleware.js';
import { validateCatalog } from '../middlewares/validatorMiddleware.js';

const router = express.Router();

// Ruta Raíz: /api/catalog
router.route('/')
    /**
     * @route   GET /api/catalog
     * @desc    Leer catálogo con filtros (?type=pelicula o ?type=serie) y paginación
     * @access  Privado (Admin y User)
     */
    .get(protect, getCatalog)
    
    /**
     * @route   POST /api/catalog
     * @desc    Crear nueva película o serie
     * @access  Privado (Solo Admin)
     */
    .post(protect, admin, validateCatalog, createCatalogItem);

// Rutas con ID: /api/catalog/:id
router.route('/:id')
    /**
     * @route   PUT /api/catalog/:id
     * @desc    Actualizar datos de un ítem
     * @access  Privado (Solo Admin)
     */
    .put(protect, admin, validateCatalog, updateCatalogItem)
    
    /**
     * @route   DELETE /api/catalog/:id
     * @desc    Eliminar un ítem del catálogo
     * @access  Privado (Solo Admin)
     */
    .delete(protect, admin, deleteCatalogItem);

export default router;