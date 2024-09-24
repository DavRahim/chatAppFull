/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/display-name */
import Title from "../shared/Title";
import { useNavigate, useParams } from "react-router-dom";
import ChatList from "../specific/ChatList";
import Header from "./Header";
import { Drawer, Grid, Skeleton } from "@mui/material"
import Profile from "../specific/Profile";
import { useMyChatsQuery } from "../../redux/api/api";
import { useDispatch, useSelector } from "react-redux";
import { setIsDeleteMenu, setIsMobile, setSelectedDeleteChat } from "../../redux/reducers/misc";
import { useErrors, useSocketEvents } from "../../hooks/hook";
import { GetSocket } from "../../socket";
import { NEW_MESSAGE_ALERT, NEW_REQUEST, ONLINE_USERS, REFETCH_CHATS } from "../constants/events";
import { useCallback, useEffect, useRef, useState } from "react";
import { incrementNotification, setNewMessagesAlert } from "../../redux/reducers/chat";
import { getOrSaveFromStorage } from "../../lib/features";

const AppLayout = () => (WrappedComponent) => {
    return (props) => {
        const params = useParams();
        const navigate = useNavigate();
        const dispatch = useDispatch();
        const socket = GetSocket();

        console.log(socket, "socket");

        const chatId = params.chatId;
        const deleteMenuAnchor = useRef(null);

        const { isMobile } = useSelector((state) => state.misc);

        const { user } = useSelector((state) => state.auth);
        const [onlineUsers, setOnlineUsers] = useState([]);
        const { isLoading, data, isError, error, refetch } = useMyChatsQuery("");

        const { newMessagesAlert } = useSelector((state) => state.chat);

        useErrors([{ isError, error }]);

        useEffect(() => {
            getOrSaveFromStorage({ key: NEW_MESSAGE_ALERT, value: newMessagesAlert });
        }, [newMessagesAlert]);

        const handleDeleteChat = (e, chatId, groupChat) => {
            dispatch(setIsDeleteMenu(true));
            dispatch(setSelectedDeleteChat({ chatId, groupChat }));
            deleteMenuAnchor.current = e.currentTarget;
        }
        const handleMobileClose = () => dispatch(setIsMobile(false));

        const newMessageAlertListener = useCallback(
            (data) => {
                if (data.chatId === chatId) return;
                dispatch(setNewMessagesAlert(data));
            },
            [chatId, dispatch]
        );

        const newRequestListener = useCallback(() => {
            dispatch(incrementNotification());
        }, [dispatch]);

        const refetchListener = useCallback(() => {
            refetch();
            navigate("/");
        }, [refetch, navigate]);

        const onlineUsersListener = useCallback((data) => {
            setOnlineUsers(data);
        }, []);

        const eventHandlers = {
            [NEW_MESSAGE_ALERT]: newMessageAlertListener,
            [NEW_REQUEST]: newRequestListener,
            [REFETCH_CHATS]: refetchListener,
            [ONLINE_USERS]: onlineUsersListener,
        };

        useSocketEvents(socket, eventHandlers);

        return (
            <>
                <Title />
                <Header />
                {isLoading ? (
                    <Skeleton />
                ) : (
                    <Drawer open={isMobile} onClose={handleMobileClose}>
                        <ChatList
                            w="70vw"
                            chats={data?.chats}
                            chatId={chatId}
                            handleDeleteChat={handleDeleteChat}
                            newMessagesAlert={newMessagesAlert}
                            onlineUsers={onlineUsers}
                        />
                    </Drawer>
                )}
                <Grid container height={"calc(100vh - 4rem)"}>
                    <Grid
                        item
                        sm={4}
                        md={3}
                        sx={{
                            display: { xs: "none", sm: "block" },
                        }}
                        height={"100%"}
                    >
                        {isLoading ? (
                            <Skeleton />
                        ) : (
                            <ChatList
                                chats={data?.chats}
                                chatId={chatId}
                                handleDeleteChat={handleDeleteChat}
                                newMessagesAlert={newMessagesAlert}
                                onlineUsers={onlineUsers}

                            />
                        )}
                    </Grid>
                    <Grid item xs={12} sm={8} md={5} lg={6} height={"100%"}>
                        <WrappedComponent {...props} chatId={chatId} />
                    </Grid>
                    <Grid
                        item
                        md={4}
                        lg={3}
                        height={"100%"}
                        sx={{
                            display: { xs: "none", md: "block" },
                            padding: "2rem",
                            bgcolor: "rgba(0,0,0,0.85)",
                        }}
                    >
                        <Profile user={user} />
                    </Grid>
                </Grid>
                <div>Footer</div>
            </>
        )
    };
};

export default AppLayout;
