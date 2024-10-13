import express from "express";
import ViteExpress from "vite-express";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config({path: './.env'});

const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.get('/hello', (_, res) => {
  res.send('Hello Vite + React + TypeScript!');
});


app.post('/getJWT', (req, res) => {
  console.log('getJWT', req.body, req.user);
  const token = jwt.sign({
      ...req.body,
      id: process.env.VITE_TRANSITIVE_USER, // Transitive portal user id
      userId: req.user,  // user name on dashboard
      validity: 86400,   // number of seconds
    }, process.env.JWT_SECRET);
  res.json({token});
});


ViteExpress.listen(app, port, () =>
  console.log(`Server is listening on port ${port}...`),
);
