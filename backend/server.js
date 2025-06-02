import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRouter from "./routes/auth.routes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());


app.use('/auth', authRouter);

app.get("/test", (req , res) => {
    res.send("api is up");
});

console.log("before starting listening");

app.listen( 3000, () => {
    console.log(`Listen on port ${process.env.PORT || 3000}`);
});

process.on('exit', (code) => console.log('Exit with code:', code));
process.on('SIGINT', () => console.log('SIGINT received'));
process.on('uncaughtException', (err) => console.error('Uncaught Exception:', err));
process.on('unhandledRejection', (err) => console.error('Unhandled Rejection:', err));
