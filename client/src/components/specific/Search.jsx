import { Dialog, DialogTitle, InputAdornment, List, Stack, TextField } from "@mui/material";
import { useInputValidation } from "6pp";
import { Search as SearchIcon } from "@mui/icons-material";
import UserItem from "../shared/UserItem";
import { useState } from "react";
import { sampleUsers } from "../constants/sampleData";

const Search = () => {

    const search = useInputValidation("");
    const [users, setUsers] = useState(sampleUsers)
    let isLoadingSendFriendRequest = false;
    const addFriendHandler = (id) => {
        console.log(id);
    }
    return (
        <Dialog
            open
        // open={isSearch} 
        // onClose={searchCloseHandler}
        >
            <Stack p={"2rem"} direction={"column"} width={"25rem"}>
                <DialogTitle textAlign={"center"}>Find People</DialogTitle>
                <TextField
                    label=""
                    value={search.value}
                    onChange={search.changeHandler}
                    variant="outlined"
                    size="small"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />

                <List>
                    {users.map((i) => (
                        <UserItem
                            user={i}
                            key={i._id}
                            handler={addFriendHandler}
                            handlerIsLoading={isLoadingSendFriendRequest}
                        />
                    ))}
                </List>
            </Stack>
        </Dialog>
    );
};

export default Search;
