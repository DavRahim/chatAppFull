import { adminLogin, allUsers } from "../controllers/admin.js";
import { validateHandler } from "../lib/validators.js";


const app = express.Router();


app.post("/verify", adminLoginValidator(), validateHandler, adminLogin);

app.get("/logout", adminLogout);

// Only Admin Can Accecss these Routes

app.use(adminOnly);

app.get("/", getAdminData);

app.get("/users", allUsers);
app.get("/chats", allChats);
app.get("/messages", allMessages);

app.get("/stats", getDashboardStats);
export default app;