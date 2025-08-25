require('dotenv').config(); // carrega variáveis do .env
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const usuarioRoutes = require('./routes/usuarioRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Conexão com MongoDB
const MONGO_URI = process.env.MONGO_URI;  // precisa existir!
if (!MONGO_URI) {
  console.error("❌ MONGO_URI não definido!");
  process.exit(1);
}

mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB conectado!"))
  .catch(err => console.error("❌ Erro ao conectar MongoDB:", err));

// Rotas
app.use("/api", usuarioRoutes);

// Rota teste raiz
app.get("/", (req, res) => {
  res.send("Servidor rodando! 🚀");
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
