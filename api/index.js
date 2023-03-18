const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let musicLinks = [];

// verificar se o link é do YouTube
function isValidYouTubeLink(url) {
  const regex = /^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
  return url.match(regex);
}

// Rota para adicionar um link de música
app.post('/api/music', (req, res) => {
  const { link } = req.body;

  if (!link) {
    return res.status(400).json({ error: 'O campo link é obrigatório.' });
  }

  if (!isValidYouTubeLink(link)) {
    return res.status(400).json({ error: 'O link fornecido não é um link válido do YouTube.' });
  }

  musicLinks.push(link);
  res.status(201).json({ message: 'Link de música adicionado com sucesso.' });
});

// Rota para listar os links de músicas
app.get('/api/music', (req, res) => {
  res.json(musicLinks);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});