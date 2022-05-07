import React, { useEffect, useState } from "react";
import { orderBy } from "lodash";
import Post from "./ui/post/Post";
import CreatePostForm from "./ui/createPostForm";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserId } from "../store/users";
import {
    getIsLoading,
    getUserPosts,
    loadPostsList,
    removePost
} from "../store/posts";
// import commentsService from "../services/comments.service";
import CommentsModal from "./commentsModal";
import {
    cleanCommentsList,
    getCommentsList,
    loadCommentsList
} from "../store/comments";

const BlogList = () => {
    const dispatch = useDispatch();
    const { userId } = useParams();
    const [openForm, setOpenForm] = useState(false);
    const [commentsModal, setCommentsModal] = useState({
        open: false,
        postId: null
    });

    const currentUserId = useSelector(getCurrentUserId());

    useEffect(() => {
        dispatch(loadPostsList(userId));
    }, [userId]);

    useEffect(() => {
        if (commentsModal.postId) {
            dispatch(loadCommentsList(commentsModal.postId));
        }
    }, [commentsModal]);

    const comments = useSelector(getCommentsList());

    const posts = useSelector(getUserPosts());
    const sortedPosts = orderBy(posts, ["created_at"], ["desc"]);

    const isLoading = useSelector(getIsLoading());

    const handleDelete = (postId) => {
        dispatch(removePost(postId));
    };

    const handleModal = async (postId) => {
        setCommentsModal({ open: true, postId: postId });
    };

    const closeModal = () => {
        setCommentsModal({ open: false, postId: null });
        dispatch(cleanCommentsList());
    };

    return !isLoading ? (
        <div className="card blog_card">
            <div className="card-body">
                {commentsModal.open && (
                    <CommentsModal
                        postId={commentsModal.postId}
                        handleClose={closeModal}
                        comments={comments}
                    />
                )}
                {userId === currentUserId && (
                    <>
                        <div className="m-auto d-flex flex-column">
                            <button
                                className="btn border m-auto mb-3"
                                onClick={() => setOpenForm((prev) => !prev)}
                            >
                                <i className="bi bi-pen"></i>
                                <span className="">Create post...</span>
                            </button>
                        </div>
                        <hr className="m-0" />
                    </>
                )}

                {userId === currentUserId && openForm && (
                    <>
                        <CreatePostForm /> <hr />
                    </>
                )}
                {posts.length > 0 ? (
                    sortedPosts.map((post) => (
                        <Post
                            onDelete={handleDelete}
                            key={post._id}
                            postData={post}
                            handleModal={handleModal}
                        />
                    ))
                ) : (
                    <p className="display-6 text-center mt-3">{`No posts :( ${
                        userId === currentUserId
                            ? "Try to write something..."
                            : ""
                    }`}</p>
                )}
            </div>
        </div>
    ) : (
        "Loading..."
    );
};

export default BlogList;
