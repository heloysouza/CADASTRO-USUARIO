// seed/seedUsers.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "../models/User.js"; // ajuste o caminho conforme seu projeto

dotenv.config();

// Conectar ao MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB conectado com sucesso!");
    seedUsers();
  })
  .catch((err) => {
    console.error("Erro ao conectar ao MongoDB:", err);
  });

// Função para popular usuários
async function seedUsers() {
  try {
    // Limpar usuários existentes (opcional)
    await User.deleteMany({});
    console.log("Usuários existentes removidos.");

    // Criar usuários de exemplo
    const users = [
      { name: "Heloy", email: "heloy@example.com", password: "123456" },
      { name: "Maria", email: "maria@example.com", password: "abcdef" },
    ];

    // Criptografar senhas
    for (let user of users) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    }

    // Salvar usuários
    await User.insertMany(users);
    console.log("Usuários criados com sucesso!");

    // Fechar conexão
    mongoose.connection.close();
  } catch (err) {
    console.error("Erro ao popular usuários:", err);
    mongoose.connection.close();
  }
}
