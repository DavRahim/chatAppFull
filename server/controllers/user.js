import { TryCatch } from "../middlewares/error.js";
import { ErrorHandler } from "../utils/utility.js";




// Create a new user and save it to the database and save token in cookie
const newUser = TryCatch(async (req, res, next) => {
    const { name, username, password, bio } = req.body;

    const file = req.file;

    if (!file) return next(new ErrorHandler("Please Upload Avatar"));

    console.log(name, username, password, bio);
})


// Login user and save token in cookie
const login = TryCatch(async (req, res, next) => {
  res.send("hwl")

})

export { login, newUser }