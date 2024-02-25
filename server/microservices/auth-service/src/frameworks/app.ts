import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { start } from 'simple-auth-connection';
import { authRouter } from '../adapters/routes/auth.route';

dotenv.config();
const app : Express = express();
const port = process.env.PORT;

start(process.env.MONGODB_URI!)
app.use(cookieParser());
app.use(cors());

app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(authRouter)



app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});    