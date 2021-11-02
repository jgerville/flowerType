const express = require('express');
const fetch = require('node-fetch');
const path = require('path');

const deepai = require('deepai');
deepai.setAPIKey(process.env.DEEPAI_KEY);
// export const test = () => {
//   console.log(process.env.DEEPAI_KEY);
// };
require('dotenv').config();

const app = express();
app.use(express.static('dist'));

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/dist/index.html`)
});

app.get('/api', async (req, res) => {
  const input = req.query.value;
  console.log('Fetching:')
  const resp = await deepai.callStandardApi("text-generator", {
    text: input,
  });
  return resp;
})

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Now listening at localhost:${PORT}`);
});