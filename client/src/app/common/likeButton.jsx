import React from "react";
import PropTypes from "prop-types";

const LikeButton = ({ handleClick, count, active }) => {
    return (
        <button
            onClick={() => handleClick()}
            type="button"
            className="btn btn-primary btn-circle m-1"
        >
            <i className={`bi bi-heart${active ? "-fill" : ""}`}></i>
            <span>{count}</span>
        </button>
    );
};

LikeButton.propTypes = {
    handleClick: PropTypes.func.isRequired,
    count: PropTypes.number.isRequired,
    active: PropTypes.bool
};

export default LikeButton;
