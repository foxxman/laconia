import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { createPost } from "../../store/posts";
import { validator } from "../../utils/validator";
import TextAreaField from "../common/form/textAreaField";
import SubmitButton from "../common/submitButton";

const CreatePostForm = () => {
    const { userId } = useParams();
    const dispatch = useDispatch();

    const [data, setData] = useState({
        content: "",
        userId: userId
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

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;

        dispatch(createPost(data));
        setData({
            content: "",
            userId: userId
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

            <SubmitButton isValid={isValid} text="Post" />
        </form>
    );
};

export default CreatePostForm;
