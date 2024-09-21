import { useRef } from "react";

import { ListItemText, Menu, MenuItem, MenuList, Tooltip } from "@mui/material";
import {
    AudioFile as AudioFileIcon,
    Image as ImageIcon,
    UploadFile as UploadFileIcon,
    VideoFile as VideoFileIcon,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setIsFileMenu } from "../../redux/reducers/misc";

const FileMenu = ({ anchorE1, chatId }) => {

    const { isFileMenu } = useSelector((state) => state.misc);
    const dispatch = useDispatch();

    const imageRef = useRef(null);
    const audioRef = useRef(null);
    const videoRef = useRef(null);
    const fileRef = useRef(null);

    const closeFileMenu = () => dispatch(setIsFileMenu(false));
    return (
        <Menu 
        anchorEl={anchorE1} 
        open={isFileMenu} 
        onClose={closeFileMenu}
        >
            <div
                style={{
                    width: "10rem",
                }}
            >
                <MenuList>
                    <MenuItem
                    //   onClick={selectImage}
                    >
                        <Tooltip title="Image">
                            <ImageIcon />
                        </Tooltip>
                        <ListItemText style={{ marginLeft: "0.5rem" }}>Image</ListItemText>
                        <input
                            type="file"
                            multiple
                            accept="image/png, image/jpeg, image/gif"
                            style={{ display: "none" }}
                            //   onChange={(e) => fileChangeHandler(e, "Images")}
                            ref={imageRef}
                        />
                    </MenuItem>

                    <MenuItem 
                    // onClick={selectAudio}
                    >
                        <Tooltip title="Audio">
                            <AudioFileIcon />
                        </Tooltip>
                        <ListItemText style={{ marginLeft: "0.5rem" }}>Audio</ListItemText>
                        <input
                            type="file"
                            multiple
                            accept="audio/mpeg, audio/wav"
                            style={{ display: "none" }}
                            //   onChange={(e) => fileChangeHandler(e, "Audios")}
                            ref={audioRef}
                        />
                    </MenuItem>

                    <MenuItem 
                    // onClick={selectVideo}
                    >
                        <Tooltip title="Video">
                            <VideoFileIcon />
                        </Tooltip>
                        <ListItemText style={{ marginLeft: "0.5rem" }}>Video</ListItemText>
                        <input
                            type="file"
                            multiple
                            accept="video/mp4, video/webm, video/ogg"
                            style={{ display: "none" }}
                            // onChange={(e) => fileChangeHandler(e, "Videos")}
                            ref={videoRef}
                        />
                    </MenuItem>

                    <MenuItem 
                    // onClick={selectFile}
                    >
                        <Tooltip title="File">
                            <UploadFileIcon />
                        </Tooltip>
                        <ListItemText style={{ marginLeft: "0.5rem" }}>File</ListItemText>
                        <input
                            type="file"
                            multiple
                            accept="*"
                            style={{ display: "none" }}
                            // onChange={(e) => fileChangeHandler(e, "Files")}
                            ref={fileRef}
                        />
                    </MenuItem>
                </MenuList>
            </div>
        </Menu>
    );
};

export default FileMenu;
