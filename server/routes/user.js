import express from "express";
import { getMyProfile, login, newUser } from "../controllers/user.js";
import { singleAvatar } from "../middlewares/multer.js";


const app = express.Router();

app.post("/new", 
    singleAvatar,
    //  registerValidator(), 
    //  validateHandler, 
     newUser
    );

app.post("/login",
    //  loginValidator(), 
    //  validateHandler, 
login
);

app.get("/me", getMyProfile);

export default app;