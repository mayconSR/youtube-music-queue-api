const express = require('express');
const cors = require('cors');
const url = require('url');
const app = express();

app.use(express.json());
app.use(cors());

const corsOptions = {
  origin: 'https://youtube-music-queue-app.vercel.app',
  optionsSuccessStatus: 200
};

let musicLinks = [];

// Rota de inicio
app.get('/', (req, res) => {
  res.send('Bem-vindo à API de fila de músicas do YouTube!');
});

// verificar se o link é do YouTube
function isValidYouTubeLink(link) {
  const { host } = url.parse(link);
  return (host === 'www.youtube.com' || host === 'youtube.com' || host === 'youtu.be');
}

// Extrair o ID do vídeo do link do YouTube
function getYouTubeVideoId(link) {
  const { hostname, pathname, searchParams } = url.parse(link, true);
  if (hostname === 'www.youtube.com' || hostname === 'youtube.com') {
    return searchParams.get('v');
  } else if (hostname === 'youtu.be') {
    return pathname.substr(1);
  } else {
    return null;
  }
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

  const videoId = getYouTubeVideoId(link);
  if (!videoId) {
    return res.status(400).json({ error: 'Não foi possível obter o ID do vídeo do link fornecido.' });
  }

  musicLinks.push(videoId);
  res.status(201).json({ message: 'Link de música adicionado com sucesso.' });
});

// Rota para listar os links de músicas
app.get('/api/music', (req, res) => {
  res.json(musicLinks);
});

module.exports = app;