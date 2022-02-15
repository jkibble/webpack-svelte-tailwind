import * as functions from "firebase-functions";
import express from "express";
const app = express();

const randomWord = () => {
  return Math.random().toString(36).slice(2);
};

app.get("/table", (req, res) => {
  functions.logger.info("Hello logs from express!", { structuredData: true });
  let body = [];
  let header = [];

  for (let h = 0; h < 10; h++) {
    header.push(randomWord());
  }

  for (let r = 0; r < 10; r++) {
    const row = [];
    for (let c = 0; c < 10; c++) {
      row.push(randomWord());
    }
    body.push(row);
  }

  res.send({ header: header, body: body });
});

export const index = functions.https.onRequest(app);
