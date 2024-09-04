import express from "express";
import { isAuthenticated } from "../middlewares/auth";
import { newGroupChat } from "../controllers/chat";


const app = express.Router();


// After here user must be logged in to access the routes

app.use(isAuthenticated);

app.post("/new",
    // newGroupValidator(), 
    // validateHandler, 
    newGroupChat);


export default app;