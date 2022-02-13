import * as functions from "firebase-functions";

const randomWord = () => {
  return Math.random().toString(36).slice(2);
};

export const table = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", { structuredData: true });
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

  response.send({ header: header, body: body });
});
