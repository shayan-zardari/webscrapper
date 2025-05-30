import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.get("/test", (req , res) => {
    res.send("api is up");
});

app.listen(process.env.PORT || 3000, () => {
    console.log(`Listen on port ${process.env.PORT || 3000}`);
});