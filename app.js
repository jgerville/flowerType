const express = require('express');

require('dotenv').config();

const app = express();
app.use(express.static('dist'));

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/dist/index.html`)
});

app.get('/api', async (req, res) => {
  const key = { deepaiKEY: process.env.DEEPAI_KEY}
  res.send(key);
})

app.get('/special', async (req, res) => {
  const text = { text: process.env.TEXT}
  res.send(text);
})

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Now listening at localhost:${PORT}`);
});