import express from "express";

const app = express();

const port = 4000;

app.use(`/`, (req, res) => res.send(`Home`));

app.listen(port, () => {
  console.log(`✅listening on: http://localhost:${port}`);
});
