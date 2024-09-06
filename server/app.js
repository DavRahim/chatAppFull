import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { createServer } from "http";
import cors from "cors"
import { v2 as cloudinary } from "cloudinary";


import { connectDB } from "./utils/features.js";
import { corsOptions } from "./constants/config.js";

import userRoute from "./routes/user.js";
import chatRoute from "./routes/chat.js";
import { createUser } from "./seeders/user.js";

dotenv.config({
    path: "./.env",
});

const mongoURI = process.env.MONGO_URI;
const port = process.env.PORT || 3000;
const envMode = process.env.NODE_ENV.trim() || "PRODUCTION";


connectDB(mongoURI);


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


const app = express();
const server = createServer(app);


// Using Middlewares Here
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

app.use("/api/v1/user", userRoute);
app.use("/api/v1/chat", chatRoute);

app.get("/test", (req, res) => {
    res.send("Api WOrk Done")
})


server.listen(port, () => {
    console.log(`Server is running on port ${port} in ${envMode} Mode`);
});



export { envMode };