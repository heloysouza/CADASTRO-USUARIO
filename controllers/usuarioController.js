const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || "minha_chave_super_secreta";

// Cadastro de usuário
const cadastrarUsuario = async (req, res) => {
  try {
    const { nome, usuario, senha } = req.body;

    if (!nome || !usuario || !senha) {
      return res.status(400).json({ message: "Preencha todos os campos!" });
    }

    // Verifica se usuário já existe
    const existe = await Usuario.findOne({ usuario });
    if (existe) {
      return res.status(400).json({ message: "Usuário já existe!" });
    }

    // Hash da senha
    const salt = await bcrypt.genSalt(10);
    const senhaHash = await bcrypt.hash(senha, salt);

    const novoUsuario = new Usuario({ nome, usuario, senha: senhaHash });
    await novoUsuario.save();

    res.status(201).json({ message: "Usuário cadastrado com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao cadastrar usuário." });
  }
};

// Login de usuário
const loginUsuario = async (req, res) => {
  try {
    const { usuario, senha } = req.body;

    const user = await Usuario.findOne({ usuario });
    if (!user) {
      return res.status(400).json({ message: "Usuário não encontrado!" });
    }

    const senhaValida = await bcrypt.compare(senha, user.senha);
    if (!senhaValida) {
      return res.status(400).json({ message: "Senha inválida!" });
    }

    const token = jwt.sign(
      { id: user._id, usuario: user.usuario },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Login realizado com sucesso!", token });
  } catch (error) {
    res.status(500).json({ message: "Erro no login." });
  }
};

// Dashboard protegido (exemplo)
const acessarDashboard = (req, res) => {
  res.json({ message: `Bem-vindo, ${req.user.usuario}! 🎉` });
};

module.exports = { cadastrarUsuario, loginUsuario, acessarDashboard };
