const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');

dotenv.config(); // Carregar as variáveis de ambiente do arquivo .env

const app = express();
app.use(express.json()); // Para interpretar o JSON no corpo das requisições

// Habilitar Dominio Cruzado (CORS)
app.use(cors({
  origin: 'http://127.0.0.1:49677' // Permitir requisições apenas desta origem
}));

// Conectar ao banco de dados MongoDB
mongoose.connect(process.env.DB_URI)
  .then(() => console.log('Banco de dados conectado'))
  .catch(err => console.log('Erro ao conectar ao banco de dados: ' + err));

// Usar as rotas de autenticação
app.use('/api/auth', authRoutes);

// Iniciar o servidor na porta 3000
app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
