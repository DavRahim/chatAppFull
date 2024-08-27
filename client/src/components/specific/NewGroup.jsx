import { useInputValidation } from "6pp";
import { Button, Dialog, DialogTitle, Skeleton, Stack, TextField, Typography } from "@mui/material";
import UserItem from "../shared/UserItem";
import { sampleUsers } from "../constants/sampleData";

const NewGroup = () => {
    let isLoading = false
    const groupName = useInputValidation("");
    const selectMemberHandler = () => {

    }
    const submitHandler = () => {

    }
    return (
        <Dialog
            // onClose={closeHandler}
            // open={isNewGroup}
            open
        >
            <Stack p={{ xs: "1rem", sm: "3rem" }} width={"25rem"} spacing={"2rem"}>
                <DialogTitle textAlign={"center"} variant="h4">
                    New Group
                </DialogTitle>

                <TextField
                    label="Group Name"
                    value={groupName.value}
                    onChange={groupName.changeHandler}
                />

                <Typography variant="body1">Members</Typography>

                <Stack>
                    {isLoading ? (
                        <Skeleton />
                    ) : (
                        sampleUsers.map((i) => (
                            <UserItem
                                user={i}
                                key={i._id}
                                handler={selectMemberHandler}
                                // isAdded={selectedMembers.includes(i._id)}
                            />
                        ))
                    )}
                </Stack>

                <Stack direction={"row"} justifyContent={"space-evenly"}>
                    <Button
                        variant="text"
                        color="error"
                        size="large"
                        // onClick={closeHandler}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        size="large"
                        onClick={submitHandler}
                        // disabled={isLoadingNewGroup}
                    >
                        Create
                    </Button>
                </Stack>
            </Stack>
        </Dialog>
    );
};

export default NewGroup;
