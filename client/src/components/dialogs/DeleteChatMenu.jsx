/* eslint-disable no-unused-vars */
import { Menu, Stack, Typography } from "@mui/material";
import {
    Delete as DeleteIcon,
    ExitToApp as ExitToAppIcon,
} from "@mui/icons-material"
import { useSelector } from "react-redux";
import { useAsyncMutation } from "../../hooks/hook";
import { useDeleteChatMutation, useLeaveGroupMutation } from "../../redux/api/api";
import { setIsDeleteMenu } from "../../redux/reducers/misc";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const DeleteChatMenu = ({ dispatch, deleteMenuAnchor }) => {
    const navigate = useNavigate()

    const { isDeleteMenu, selectedDeleteChat } = useSelector(
        (state) => state.misc
    );
    const [deleteChat, _, deleteChatData] = useAsyncMutation(
        useDeleteChatMutation
    );

    const [leaveGroup, __, leaveGroupData] = useAsyncMutation(
        useLeaveGroupMutation
    );

    const isGroup = selectedDeleteChat.groupChat;

    const closeHandler = () => {
        dispatch(setIsDeleteMenu(false));
        deleteMenuAnchor.current = null;
    };

    const leaveGroupHandler = () => {
        closeHandler();
        leaveGroup("Leaving Group...", selectedDeleteChat.chatId);
    };

    const deleteChatHandler = () => {
        closeHandler();
        deleteChat("Deleting Chat...", selectedDeleteChat.chatId);
    };

    useEffect(() => {
        if (deleteChatData || leaveGroupData) navigate("/");
    }, [deleteChatData, leaveGroupData, navigate]);
    return (
        <Menu
            open={isDeleteMenu}
            onClose={closeHandler}
            anchorEl={deleteMenuAnchor.current}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
            }}
            transformOrigin={{
                vertical: "center",
                horizontal: "center",
            }}
        >
            <Stack
                sx={{
                    width: "10rem",
                    padding: "0.5rem",
                    cursor: "pointer",
                }}
                direction={"row"}
                alignItems={"center"}
                spacing={"0.5rem"}
                onClick={isGroup ? leaveGroupHandler : deleteChatHandler}
            >
                {isGroup ? (
                    <>
                        <ExitToAppIcon />
                        <Typography>Leave Group</Typography>
                    </>
                ) : (
                    <>
                        <DeleteIcon />
                        <Typography>Delete Chat</Typography>
                    </>
                )}
            </Stack>
        </Menu>
    );
};

export default DeleteChatMenu;
