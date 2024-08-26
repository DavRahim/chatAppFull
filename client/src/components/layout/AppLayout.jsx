/* eslint-disable react/display-name */

import Title from "../shared/Title";
import Header from "./Header";

const AppLayout = () => (WrappedComponent) => {
    return (props) => {
        return (
            <>
                <Title />
                <Header />
                <WrappedComponent {...props} />
                <div>Footer</div>
            </>
        )
    };
};

export default AppLayout;
