import React, { useState } from "react";
// import foto from "../../../assets/post_foto.jpg";
import CommentButton from "../../../common/commentButton";
import DislikeButton from "../../../common/dislikeButton";
import LikeButton from "../../../common/likeButton";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserId } from "../../../store/users";
import { updatePost } from "../../../store/posts";
import PostMenu from "./postMenu";

const Post = ({ postData, onDelete, handleModal }) => {
    const [post, setPost] = useState(postData);
    const currentUserId = useSelector(getCurrentUserId());
    const dispatch = useDispatch();

    const getDate = (dateString) => {
        const dateSubstr = dateString.substr(0, 10).split("-");
        const months = [
            "Jan.",
            "Feb.",
            "Mar.",
            "Apr.",
            "May",
            "June",
            "Jule",
            "Aug.",
            "Sept.",
            "Oct.",
            "Nov.",
            "Dec."
        ];
        const date = {
            day: Number(dateSubstr[2]),
            month: months[Number(dateSubstr[1]) - 1],
            year: Number(dateSubstr[0])
        };

        return date;
    };

    // useEffect(() => console.log(post), [post]);

    const handleLike = () => {
        const updatedDislikes = post.dislikes.filter(
            (el) => el !== currentUserId
        );

        const updatedPost = { ...post, dislikes: updatedDislikes };

        post.likes.includes(currentUserId)
            ? (updatedPost.likes = post.likes.filter(
                  (el) => el !== currentUserId
              ))
            : (updatedPost.likes = [...post.likes, currentUserId]);

        dispatch(updatePost(updatedPost));
        setPost(updatedPost);
    };

    const handleDislike = () => {
        const updatedLikes = post.likes.filter((el) => el !== currentUserId);
        const updatedPost = { ...post, likes: updatedLikes };

        post.dislikes.includes(currentUserId)
            ? (updatedPost.dislikes = post.dislikes.filter(
                  (el) => el !== currentUserId
              ))
            : (updatedPost.dislikes = [...post.dislikes, currentUserId]);

        dispatch(updatePost(updatedPost));
        setPost(updatedPost);
    };
    const dateObj = getDate(post.created_at);
    return (
        <div className="post mt-2">
            {currentUserId === post.userId && (
                <div className="d-flex justify-content-end">
                    <PostMenu onDelete={onDelete} postId={post._id} />
                </div>
            )}
            <p className="post_paragraph lead mb-1 display-6">{post.content}</p>
            <div className="p-2 d-flex justify-content-between">
                <div className="d-flex">
                    <LikeButton
                        handleClick={handleLike}
                        count={post.likes.length}
                        active={post.likes.includes(currentUserId)}
                    />
                    <DislikeButton
                        handleClick={handleDislike}
                        count={post.dislikes.length}
                        active={post.dislikes.includes(currentUserId)}
                    />
                    <CommentButton
                        count={post.comments.length}
                        handleClick={handleModal}
                        postId={post._id}
                    />
                </div>
                <p className="d-flex align-items-center mb-0">
                    {dateObj.day} {dateObj.month} {dateObj.year}
                </p>
            </div>

            <hr />
        </div>
    );
};

Post.propTypes = {
    postData: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,
    handleModal: PropTypes.func.isRequired
};

export default Post;
