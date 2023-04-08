const express = require("express");
const awsUtil = require("./awsUtil");

require("dotenv").config();

const app = express();
app.use(express.static("dist"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (_req, res) => {
  res.sendFile(`${__dirname}/dist/index.html`);
});

app.get("/api", async (_req, res) => {
  const key = { deepaiKEY: process.env.DEEPAI_KEY };
  res.send(key);
});

app.get("/special", async (_req, res) => {
  const text = { text: process.env.TEXT };
  res.send(text);
});

app.post("/postScore", async (req, res) => {
  const { kind, name, wpm, errors } = req.body;
  await awsUtil.postScore(kind, name, wpm, errors);
  const scores = await awsUtil.fetchScores(kind);
  res.send(scores);
});

app.get("/getScores/:kind", async (req, res) => {
  const kind = req.params.kind;
  const scores = await awsUtil.fetchScores(kind);
  res.send(scores);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Now listening at localhost:${PORT}`);
});
