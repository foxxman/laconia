import { useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getIsLoggedIn } from "../../../store/users";

const AppLoader = ({ children }) => {
    const isLoggedIn = useSelector(getIsLoggedIn());
    // console.log(isLoggedIn);

    useEffect(() => {}, [isLoggedIn]);

    return children;
};

AppLoader.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
export default AppLoader;
