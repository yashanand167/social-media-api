import cookieParser from "cookie-parser";
import express, { urlencoded } from "express";
import dotenv from "dotenv"
import { router } from "./routes/users.route.js";
import { connectDB } from "./db/index.js";
import morgan  from "morgan";

dotenv.config({
    path: "./.env"
})

connectDB();

const app = express();

app.use(express.json())
app.use(urlencoded({ extended: true }));
app.use(cookieParser())
app.use(morgan('dev'))

app.use("/api/v1/users",router);

const PORT = process.env.PORT || 3000

app.get("/", (_,res)=>{
    res.json({
        message: "Connection Successful"
    })
})

app.listen(PORT, ()=>{
    console.log(`Server is up and listening on: http://localhost:${PORT}`);
})
