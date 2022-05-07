import React from "react";
import PropTypes from "prop-types";

const DislikeButton = ({ handleClick, count, active }) => {
    return (
        <button
            onClick={() => handleClick()}
            type="button"
            className="m-1 btn btn-danger btn-circle"
        >
            <i className={`bi bi-emoji-angry${active ? "-fill" : ""}`}></i>
            <span>{count}</span>
        </button>
    );
};

DislikeButton.propTypes = {
    handleClick: PropTypes.func.isRequired,
    count: PropTypes.number.isRequired,
    active: PropTypes.bool
};

export default DislikeButton;
