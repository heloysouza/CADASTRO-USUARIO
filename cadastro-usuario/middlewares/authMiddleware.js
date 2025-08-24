const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || "minha_chave_super_secreta";

function autenticarToken(req, res, next) {
  // Pega token do header Authorization: Bearer <token>
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token não fornecido!" });
  }

  // Verifica token
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Token inválido ou expirado!" });
    }
    req.user = user; // salva dados do token para usar na rota
    next();
  });
}

module.exports = autenticarToken;
