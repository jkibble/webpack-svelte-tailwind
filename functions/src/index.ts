import functions from "firebase-functions";
import express from "express";
const app = express();

const randomWord = (max = 1) => {
  let result = [];
  for (let count = 0; count < max; count++) {
    result.push(Math.random().toString(36).slice(2));
  }

  return result.join(" ");
};

app.get("/", (req, res) => {
  res.redirect(307, "/home");
});

app.get("/table", (req, res) => {
  let body = [];
  let header = [];

  for (let h = 0; h < 10; h++) {
    header.push(randomWord(2));
  }

  for (let r = 0; r < 20; r++) {
    const row = [];
    for (let c = 0; c < 10; c++) {
      row.push(randomWord(2));
    }
    body.push(row);
  }

  res.send({ header: header, body: body });
});

export const index = functions.https.onRequest(app);
