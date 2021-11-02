const express = require('express'); // web framework
// const fetch = require('node-fetch'); // for making AJAX requests
// const path = require('path');
// const fetch = import('node-fetch');
// const path = import('path');
require('dotenv').config();

// const deepai = import('deepai');
// deepai.setAPIKey(process.env.DEEPAI_KEY);
// export const test = () => {
//   console.log(process.env.DEEPAI_KEY);
// };

const app = express();
app.use(express.static('dist'));

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/dist/index.html`)
});

app.get('/api', async (req, res) => {
  // const input = req.query.value;
  // console.log('Fetching:')
  // const resp = await deepai.callStandardApi("text-generator", {
  //   text: input,
  // });
  // return resp;
  // console.log(process.env.DEEPAI_KEY)
  const key = { deepaiKEY: process.env.DEEPAI_KEY}
  res.send(key);
})

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Now listening at localhost:${PORT}`);
});

// module.exports = {
//   deepaiKey: process.env.DEEPAI_KEY
// }