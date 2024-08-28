
import { Button, Dialog, DialogTitle, Skeleton, Stack, Typography } from "@mui/material";
import UserItem from "../shared/UserItem";
import { sampleUsers } from "../constants/sampleData";
import { useState } from "react";



const AddMemberDialog = ({ chatId }) => {
    let isLoading = false;
    const [members, setMembers] = useState(sampleUsers)
    const [selectedMembers, setSelectedMembers] = useState([]);

    const selectMemberHandler = (id) => {
        setSelectedMembers((prev) =>
            prev.includes(id)
                ? prev.filter((currElement) => currElement !== id)
                : [...prev, id]
        );
    };
    const closeHandler = () => {
        setSelectedMembers([])
        setMembers([])
    }
    const addMemberSubmitHandler = () => {
        closeHandler()
    }
    return (
        <Dialog
            // open={isAddMember}
            open
            onClose={closeHandler}
        >
            <Stack p={"2rem"} width={"20rem"} spacing={"2rem"}>
                <DialogTitle textAlign={"center"}>Add Member</DialogTitle>

                <Stack spacing={"1rem"}>
                    {isLoading ? (
                        <Skeleton />
                    ) : members?.length > 0 ? (
                        members?.map((i) => (
                            <UserItem
                                key={i._id}
                                user={i}
                                handler={selectMemberHandler}
                                isAdded={selectedMembers.includes(i._id)}
                            />
                        ))
                    ) : (
                        <Typography textAlign={"center"}>No Friends</Typography>
                    )}
                </Stack>

                <Stack
                    direction={"row"}
                    alignItems={"center"}
                    justifyContent={"space-evenly"}
                >
                    <Button color="error" onClick={closeHandler}>
                        Cancel
                    </Button>
                    <Button
                        onClick={addMemberSubmitHandler}
                        variant="contained"
                    // disabled={isLoadingAddMembers}
                    >
                        Submit Changes
                    </Button>
                </Stack>
            </Stack>
        </Dialog>
    );
};

export default AddMemberDialog;
