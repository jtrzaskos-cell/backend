require('dotenv').config();
const express = require('express');
const cors = require('cors');
const chatRoutes = require('./routes/chat');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api', chatRoutes);

app.get('/', (req, res) => {
  res.json({ 
    mensagem: 'Backend do Sabidão rodando! 🦉',
    escola: 'Colégio Helena Wysocki'
  });
});

app.listen(PORT, () => {
  console.log(`Sabidão rodando em http://localhost:${PORT}`);
});