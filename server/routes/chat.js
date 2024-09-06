import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { addMembers, getMyChats, getMyGroups, leaveGroup, newGroupChat, removeMember } from "../controllers/chat.js";
import { addMemberValidator, chatIdValidator, removeMemberValidator, validateHandler } from "../lib/validators.js";


const app = express.Router();


// After here user must be logged in to access the routes

app.use(isAuthenticated);

app.post("/new",
    // newGroupValidator(), 
    // validateHandler, 
    newGroupChat
);

app.get("/my", getMyChats);

app.get("/my/groups", getMyGroups);

app.put("/addmembers", 
    addMemberValidator(), 
    validateHandler, 
    addMembers
);

app.put(
    "/removemember",
    removeMemberValidator(),
    validateHandler,
    removeMember
);

app.delete("/leave/:id", chatIdValidator(), validateHandler, leaveGroup);


export default app;