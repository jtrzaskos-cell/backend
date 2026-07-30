require('dotenv').config();
const express = require('express');
const cors = require('cors');
const chatRoutes = require('./routes/chat');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());                 // permite o frontend acessar
app.use(express.json());         // lê JSON do body

// Rotas
app.use('/api', chatRoutes);

// Rota de teste
app.get('/', (req, res) => {
  res.json({ 
    mensagem: 'Backend do Sabidão rodando! 🦉',
    escola: 'Colégio Helena Wysocki'
  });
});

app.listen(PORT, () => {
  console.log(`Sabidão rodando em http://localhost:${PORT}`);
});