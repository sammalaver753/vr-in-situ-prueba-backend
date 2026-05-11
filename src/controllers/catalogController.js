import Catalog from '../models/Catalog.js';

// @desc    Obtener catálogo con paginación y filtros
// @route   GET /api/catalog
export const getCatalog = async (req, res) => {
    try {
        const pageSize = Number(req.query.limit) || 10;
        const page = Number(req.query.page) || 1;

        // Si el usuario envía ?type=serie, esto filtrará automáticamente
        const query = req.query.type ? { type: req.query.type } : {};

        const count = await Catalog.countDocuments(query);
        const items = await Catalog.find(query)
            .limit(pageSize)
            .skip(pageSize * (page - 1));

        res.json({
            items,
            page,
            pages: Math.ceil(count / pageSize),
            total: count
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el catálogo' });
    }
};

// @desc    Crear un nuevo ítem (Solo Admin)
// @route   POST /api/catalog
export const createCatalogItem = async (req, res) => {
    try {
        const { title, label, imageUrl, contentUrl, type } = req.body;
        const newItem = new Catalog({ title, label, imageUrl, contentUrl, type });
        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (error) {
        res.status(400).json({ message: 'Datos inválidos' });
    }
};

// @desc    Actualizar ítem (Solo Admin)
export const updateCatalogItem = async (req, res) => {
    try {
        const item = await Catalog.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (item) res.json(item);
        else res.status(404).json({ message: 'Ítem no encontrado' });
    } catch (error) {
        res.status(400).json({ message: 'Error al actualizar' });
    }
};

// @desc    Eliminar ítem (Solo Admin)
export const deleteCatalogItem = async (req, res) => {
    try {
        const item = await Catalog.findById(req.params.id);
        if (item) {
            await item.deleteOne();
            res.json({ message: 'Ítem eliminado' });
        } else {
            res.status(404).json({ message: 'Ítem no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar' });
    }
};