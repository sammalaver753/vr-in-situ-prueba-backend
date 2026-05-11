import User from '../models/User.js';
import generateToken from '../config/generateToken.js';

// @desc    Registrar nuevo usuario
// @route   POST /api/auth/register
export const registerUser = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }

        const user = await User.create({
            name,
            email,
            password,
            role // El modelo se encarga de encriptar la contraseña 
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),
            });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

// @desc    Autenticar usuario y obtener token
// @route   POST /api/auth/login
export const authUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: 'Correo o contraseña inválidos' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor' });
    }
};