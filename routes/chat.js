const express = require('express');
const router = express.Router();
const Groq = require('groq-sdk');

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

let historico = [];

router.post('/perguntar', async (req, res) => {
  try {
    const { pergunta, aluno } = req.body;

    if (!pergunta) {
      return res.status(400).json({ erro: 'Envie a pergunta' });
    }

    const systemPrompt = `
Você é o Sabidão, uma IA amigável e paciente criada para ajudar os alunos do Colégio Helena Wysocki.
Responda de forma clara, didática e motivadora.
Use linguagem adequada para estudantes do ensino fundamental e médio.
Se a pergunta for de alguma matéria, explique o passo a passo.
Sempre incentive o aluno a estudar e a pensar.
`;

    const completion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: pergunta }
      ],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.7,
      max_tokens: 1024
    });

    const resposta = completion.choices[0]?.message?.content || 'Desculpe, não consegui responder agora.';

    historico.push({
      aluno: aluno || 'Anônimo',
      pergunta,
      resposta,
      data: new Date().toISOString()
    });

    if (historico.length > 50) historico.shift();

    res.json({
      sucesso: true,
      resposta,
      aluno: aluno || 'Anônimo'
    });

  } catch (erro) {
    console.error(erro);
    res.status(500).json({ 
      erro: 'Erro ao processar a pergunta',
      detalhes: erro.message 
    });
  }
});

router.get('/historico', (req, res) => {
  res.json(historico);
});

module.exports = router;