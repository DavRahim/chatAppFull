import { ALERT, REFETCH_CHATS } from "../constants/events";
import { TryCatch } from "../middlewares/error";
import { Chat } from "../models/chat";
import { emitEvent } from "../utils/features";

const newGroupChat = TryCatch(async (req, res, next) => {
    const { name, members } = req.body;

    const allMembers = [...members, req.user];

    await Chat.create({
        name,
        groupChat: true,
        creator: req.user,
        members: allMembers,
    });

    emitEvent(req, ALERT, allMembers, `Welcome to ${name} group`);
    emitEvent(req, REFETCH_CHATS, members);

    return res.status(201).json({
        success: true,
        message: "Group Created",
    });
});

export { newGroupChat }