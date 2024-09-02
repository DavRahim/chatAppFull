import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { createServer } from "http";
import cors from "cors"


import userRoute from "./routes/user.js";
import { connectDB } from "./utils/features.js";
import { corsOptions } from "./constants/config.js";


dotenv.config({
    path: "./.env",
});

const mongoURI = process.env.MONGO_URI;
const port = process.env.PORT || 3000;
const envMode = process.env.NODE_ENV.trim() || "PRODUCTION";


connectDB(mongoURI);

const app = express();
const server = createServer(app);


// Using Middlewares Here
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

app.use("/api/v1/user", userRoute);


app.get("/test", (req, res) => {
    res.send("Api WOrk Done")
})


server.listen(port, () => {
    console.log(`Server is running on port ${port} in ${envMode} Mode`);
});
