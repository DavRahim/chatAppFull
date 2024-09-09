import jwt from "jsonwebtoken";
import { TryCatch } from "../middlewares/error.js";
import { ErrorHandler } from "../utils/utility.js";
import { User } from "../models/user.js";
import { Chat } from "../models/chat.js";

const adminLogin = TryCatch(async (req, res, next) => {
    const { secretKey } = req.body;

    const isMatched = secretKey === adminSecretKey;

    if (!isMatched) return next(new ErrorHandler("Invalid Admin Key", 401));

    const token = jwt.sign(secretKey, process.env.JWT_SECRET);

    return res
        .status(200)
        .cookie("chattu-admin-token", token, {
            ...cookieOptions,
            maxAge: 1000 * 60 * 15,
        })
        .json({
            success: true,
            message: "Authenticated Successfully, Welcome BOSS",
        });
});


const allUsers = TryCatch(async (req, res) => {
    const users = await User.find({});

    const transformedUsers = await Promise.all(
        users.map(async ({ name, username, avatar, _id }) => {
            const [groups, friends] = await Promise.all([
                Chat.countDocuments({ groupChat: true, members: _id }),
                Chat.countDocuments({ groupChat: false, members: _id }),
            ]);

            return {
                name,
                username,
                avatar: avatar.url,
                _id,
                groups,
                friends,
            };
        })
    );

    return res.status(200).json({
        status: "success",
        users: transformedUsers,
    });
});



export {
    adminLogin,
    allUsers
};