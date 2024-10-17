import express from "express";
import ViteExpress from "vite-express";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import session from 'express-session';
import bcrypt from 'bcrypt';
import { createAccount, getAccount, login, requireLogin } from "./auth.js";
import utils from '@transitive-sdk/utils';
import { COOKIE_NAME } from "@/common/constants.js";

dotenv.config({path: './.env'});

const log = utils.getLogger('main');
log.setLevel('debug');

const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());

// Set up session middleware
app.use(session({
  secret: process.env.TR_SESSION_SECRET, // used to sign the session ID cookie
  resave: false,
  saveUninitialized: true,
  cookie: {domain: `.${process.env.TR_HOST}`, sameSite: 'strict'}
}));

// if username and password are provided as env vars, create account if it
// doesn't yet exists. This is used for initial bringup.
if (process.env.TR_USER && process.env.TR_PASS) {
  createAccount({
    name: process.env.TR_USER,
    password: process.env.TR_PASS,
    email: process.env.TR_EMAIL || '',
    admin: true
  });
}


app.get('/hello', (_, res) => {
  res.send('Hello Vite + React + TypeScript!');
});

/** Login with password */
app.post('/login', async (req, res) => {
  log.debug('/login:', req.body.name);

  const fail = (error: string | Error) =>
    res.clearCookie(COOKIE_NAME).status(401).json({error, ok: false});

  if (!req.body.name || !req.body.password) {
    log.debug('missing credentials', req.body);
    return fail('no account name or password given');
    // on purpose not disclosing that the account doesn't exist
  }

  const account = await getAccount(req.body.name);
  if (!account) {
    log.info('no such account', req.body.name);
    return fail('invalid credentials');
    // on purpose not disclosing that the account doesn't exist
  }

  const valid = await bcrypt.compare(req.body.password, account.bcryptPassword);
  if (!valid) {
    log.info('wrong password for account', req.body.name);
    return fail('invalid credentials');
  }

  login(req, res, {account, redirect: false});
});


app.post('/logout', async (req, res, next) => {
  log.debug('logout', req.session.user);
  req.session.user = null
  req.session.save((err) => {
    if (err) next(err);
    req.session.regenerate((err) => {
      if (err) next(err);
      res.clearCookie(COOKIE_NAME).json({status: 'ok'});
    });
  })
});


// /** Called by client to refresh the session cookie */
// app.get('/refresh', requireLogin, async (req, res) => {
//   log.debug('refresh');

//   const fail = (error) =>
//     res.clearCookie(COOKIE_NAME).status(401).json({error, ok: false});

//   const account = await getAccount(req.session.user._id);
//   if (!account) {
//     log.info('no account for user', req.session.user._id);
//     return fail('invalid session');
//   }

//   login(req, res, {
//     account,
//     redirect: false
//   });
// });

app.post('/api/getJWT', requireLogin, (req, res) => {
  console.log('getJWT', req.body, req.session.user._id);
  req.body.capability ||= 'ignore';

  if (req.body.capability.endsWith('_robot-agent')) {
    const msg =
      'We do not sign agent tokens. But capability tokens provide read-access.';
    log.warn(msg);
    return res.status(400).send(msg);
  }

  const token = jwt.sign({
      ...req.body,
      id: process.env.VITE_TRANSITIVE_USER, // Transitive portal user id
      userId: req.session.user._id,  // user name on dashboard
      validity: 86400,   // number of seconds
    }, process.env.JWT_SECRET);
  res.json({token});
});


ViteExpress.listen(app, port, () =>
  console.log(`Server is listening on port ${port}...`),
);
