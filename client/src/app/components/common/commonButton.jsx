import React from "react";
import PropTypes from "prop-types";

const CommonButton = ({
    handleClick,
    color,
    text,
    disabled = false,
    addClasses = []
}) => {
    return (
        <button
            onClick={handleClick}
            disabled={disabled}
            className={`btn btn-${color} w-100 mx-auto ${
                addClasses.length === 0 ? "" : addClasses.join(" ")
            }`}
        >
            {text}
        </button>
    );
};

CommonButton.propTypes = {
    addClasses: PropTypes.arrayOf(PropTypes.string),
    handleClick: PropTypes.func,
    color: PropTypes.string,
    text: PropTypes.string,
    disabled: PropTypes.bool
};

export default CommonButton;
