/* eslint-disable react/display-name */

import Title from "../shared/Title";
import Header from "./Header";
import { Grid } from "@mui/material"

const AppLayout = () => (WrappedComponent) => {
    return (props) => {
        return (
            <>
                <Title />
                <Header />
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
                        First
                    </Grid>
                    <Grid item xs={12} sm={8} md={5} lg={6} height={"100%"}>
                        <WrappedComponent {...props} />
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
                        First
                    </Grid>
                </Grid>
                <div>Footer</div>
            </>
        )
    };
};

export default AppLayout;
