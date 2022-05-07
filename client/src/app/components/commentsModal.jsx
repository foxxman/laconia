import React from "react";
import PropTypes from "prop-types";
import Comment from "./comment";
import CommentForm from "./ui/commentForm";

const CommentsModal = ({ handleClose, postId, comments }) => {
    return (
        <div
            className={`modal fade bd-example-modal-lg show`}
            tabIndex="-1"
            role="dialog"
            aria-labelledby="myLargeModalLabel"
            aria-hidden="true"
            style={{ paddingRight: "17px", display: "block" }}
        >
            <div className="modal-dialog modal-lg">
                <div className="modal-content comments-modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="myLargeModalLabel">
                            Post comments
                        </h5>
                        <button
                            type="button"
                            className="btn close"
                            data-dismiss="modal"
                            aria-label="Close"
                            onClick={() => handleClose()}
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>

                    <div className="modal-body">
                        <div className="comments-list">
                            {comments ? (
                                comments.length === 0 ? (
                                    "No comments yet. Be first!"
                                ) : (
                                    comments.map((c) => (
                                        <Comment
                                            handleClose={handleClose}
                                            key={c._id}
                                            userId={c.userId}
                                            comment={c}
                                        />
                                    ))
                                )
                            ) : (
                                <p>Loading...</p>
                            )}
                        </div>
                    </div>
                    <CommentForm postId={postId} />
                </div>
            </div>
        </div>
    );
};

CommentsModal.propTypes = {
    handleClose: PropTypes.func.isRequired,
    postId: PropTypes.string.isRequired,
    comments: PropTypes.arrayOf(PropTypes.object)
};

export default CommentsModal;
