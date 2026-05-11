import User from '../models/User.js';

// @desc    Obtener todos los usuarios
// @route   GET /api/users
// @access  Privado (Solo Admin)
export const getUsers = async (req, res) => {
    try {
        const users = await User.find({}).select('-password'); // Excluimos las contraseñas por seguridad
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener usuarios' });
    }
};

// @desc    Actualizar usuario (ej: cambiar Rol)
// @route   PUT /api/users/:id
// @access  Privado (Solo Admin)
export const updateUser = async (req, res) => {
    try {
        // Usamos findByIdAndUpdate para una actualización directa y eficiente
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id, 
            { $set: req.body },
            { new: true, runValidators: true } // new: true devuelve el doc actualizado
        ).select('-password');

        if (updatedUser) {
            res.json(updatedUser);
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Error al actualizar: datos inválidos' });
    }
};

// @desc    Eliminar usuario
// @route   DELETE /api/users/:id
// @access  Privado (Solo Admin)
export const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            await user.deleteOne();
            res.json({ message: 'Usuario eliminado correctamente' });
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar usuario' });
    }
};