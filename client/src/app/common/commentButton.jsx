import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getPostCommentsCount } from "../store/posts";

const CommentButton = ({ handleClick, count, postId }) => {
    const commentsCount = useSelector(getPostCommentsCount(postId));

    return (
        <button
            onClick={() => handleClick(postId)}
            type="button"
            className="btn-circle btn btn-success m-1"
        >
            <i className="bi bi-chat-square-text"></i>
            <span>{commentsCount}</span>
        </button>
    );
};
CommentButton.propTypes = {
    handleClick: PropTypes.func.isRequired,
    count: PropTypes.number.isRequired,
    postId: PropTypes.string.isRequired
};

export default CommentButton;
