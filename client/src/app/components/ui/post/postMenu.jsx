import React, { useState } from "react";
import PropTypes from "prop-types";

const PostMenu = ({ onDelete, postId }) => {
    const [open, setOpen] = useState(false);

    const toggleOpen = () => setOpen((prev) => !prev);

    return (
        <div className="dropdown">
            <div onClick={toggleOpen} className="btn dropdown-toggle">
                <i className="bi bi-three-dots-vertical ml-auto"></i>
            </div>
            <div
                className={`dropdown-menu ${open ? "show" : ""}`}
                aria-labelledby="dropdownMenuButton"
            >
                {/* <button className="dropdown-item">Edit</button> */}
                <button
                    className="dropdown-item"
                    onClick={() => onDelete(postId)}
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

PostMenu.propTypes = {
    onDelete: PropTypes.func.isRequired,
    postId: PropTypes.string.isRequired
};

export default PostMenu;
