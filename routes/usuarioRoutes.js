const express = require('express');
const { cadastrarUsuario, loginUsuario, acessarDashboard } = require('../controllers/usuarioController');
const autenticarToken = require('../middlewares/authMiddleware');

const router = express.Router();

router.post("/cadastro", cadastrarUsuario);
router.post("/login", loginUsuario);
router.get("/dashboard", autenticarToken, acessarDashboard);

module.exports = router;
