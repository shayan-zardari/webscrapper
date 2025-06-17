import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRouter from "./routes/auth.routes.js";
import puppeteerRouter from "./routes/puppeteer.routes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());


app.use('/auth', authRouter);

app.use('/puppeteer', puppeteerRouter);


app.listen( process.env.PORT || 3000, () => {
    console.log(`Listen on port ${process.env.PORT || 3000}`);
});

process.on('exit', (code) => console.log('Exit with code:', code));
