// import modules ---------------------------------------->
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// app --------------------------------------------------->
const app = express();

// middlewares ------------------------------------------->
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// origin ------------------------------------------------>
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));

// cookie parseing --------------------------------------->
app.use(cookieParser());

// export modules ---------------------------------------->
export default app;
