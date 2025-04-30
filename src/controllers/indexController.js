const path = require('path');

function hola(req, res) {
    res.send("hola mundo desde index");
}

module.exports = {
  hola,
};