import React, { useEffect, useState } from "react";
import { validator } from "../../utils/validator";
import PropTypes from "prop-types";
import TextAreaField from "../common/form/textAreaField";
import SubmitButton from "../common/submitButton";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserId } from "../../store/users";
import { addComment } from "../../store/comments";
import { createPostComment } from "../../store/posts";

const CommentForm = ({ postId }) => {
    const currentUserId = useSelector(getCurrentUserId());
    const dispatch = useDispatch();

    const [data, setData] = useState({
        content: "",
        postId: postId,
        userId: currentUserId
    });
    const [errors, setErrors] = useState({});

    useEffect(() => validate(), [data]);
    const validatorConfig = {
        content: {
            isRequired: {
                message: "Can't be empty"
            }
        }
    };

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(addComment(data));
        dispatch(
            createPostComment({
                postId,
                commentId: "..."
            })
        );

        setData({
            content: "",
            postId: postId,
            userId: currentUserId
        });
    };

    const handleChange = (target) => {
        setData((prevData) => ({
            ...prevData,
            [target.name]: target.value
        }));
    };

    const isValid = Object.keys(errors).length === 0;
    return (
        <form onSubmit={handleSubmit}>
            <TextAreaField
                label=""
                name="content"
                value={data.content}
                onChange={handleChange}
                error={errors.content}
            />

            <SubmitButton isValid={isValid} text="Add comment" />
        </form>
    );
};

CommentForm.propTypes = {
    postId: PropTypes.string.isRequired
};

export default CommentForm;
