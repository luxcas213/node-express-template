require('dotenv').config();

const cors = require('cors');
const express = require('express');
const cookieParser = require('cookie-parser');

const verifyToken = require('./middlewares/auth.middleware');
const indexRoutes = require('./routes/index');
const authRoutes = require("./routes/auth")
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());


// Rutas
app.use('/', authRoutes);
app.use('/index',indexRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});