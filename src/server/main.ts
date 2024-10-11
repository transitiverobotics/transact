import express from "express";
import ViteExpress from "vite-express";

const app = express();
const port = process.env.PORT || 3000;

app.get("/hello", (_, res) => {
  res.send("Hello Vite + React + TypeScript!");
});


ViteExpress.listen(app, port, () =>
  console.log(`Server is listening on port ${port}...`),
);
