const path = require('path');
const jwt = require('jsonwebtoken');
const { getUserByEmail, createUser, login_user } = require('../service/db');


async function register(req, res) {
  const { nombre, apellido, email, password } = req.body;
  if (!nombre || !apellido || !email || !password) {
    return res.status(400).json({ message: 'Faltan campos por llenar' });
  }

  try {
    const existing = await getUserByEmail(email);
    if (existing) {
      return res.status(400).json({ message: 'Email ya registrado' });
    }

    const newUser = await createUser(nombre, email, password);
    return res.status(201).json({ message: 'Usuario registrado con éxito', user: newUser });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Faltan campos por llenar' });
  }

  try {
    const user = await login_user(email, password);
    if (!user) {
      return res.status(400).json({ message: 'Credenciales incorrectas' });
    }

    const token = jwt.sign({ id: user.id }, process.env.SECRET, {
      expiresIn: '30m',
    });

    
    res.cookie('token', token, {
      httpOnly: true,      
      maxAge: 30 * 60 * 1000, 
      sameSite: 'Lax',
      secure: false,       
    });


    return res.status(200).json({ message: 'Usuario logeado con éxito'});

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
}




module.exports = {
  register,
  login,
};