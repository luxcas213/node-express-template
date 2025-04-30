const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const token = req.cookies.token; 

  if (!token) {
    return res.send("necesita token"); 
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    req.idUsuario = decoded.id;
    next();
  } catch {
    return res.send("error verificando token");
  }
}

module.exports = verifyToken;