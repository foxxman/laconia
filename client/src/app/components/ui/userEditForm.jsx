import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserId, updateUser } from "../../store/users";
import { validator } from "../../utils/validator";
import DateField from "../common/form/dateField";
import PropTypes from "prop-types";
// import DragAndDrop from "../common/form/dragAndDrop";
import RadioField from "../common/form/radio.Field";
import TextAreaField from "../common/form/textAreaField";
import TextField from "../common/form/textField";
import SubmitButton from "../common/submitButton";
import { useHistory } from "react-router-dom";
import CommonButton from "../common/commonButton";

const UserEditForm = ({ userData }) => {
    const history = useHistory();

    const currentUserId = useSelector(getCurrentUserId());
    if (currentUserId !== userData._id) history.push(`/blog/${userData._id}`);

    const dispatch = useDispatch();
    const [data, setData] = useState(userData);

    const [errors, setErrors] = useState({});
    const validatorConfig = {
        email: {
            isRequired: {
                message: "Can't be empty"
            },
            isEmail: {
                message: "Uncorrect email"
            }
        },
        name: {
            isRequired: {
                message: "Can't be empty"
            }
        },
        birthday: {
            isRequired: {
                message: "Please, enter your birthday date"
            }
        }
    };

    useEffect(() => {
        validate();
    }, [data]);

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const handleCancel = () => {
        history.push(`/blog/${userData._id}`);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();

        if (!isValid) return;

        dispatch(
            updateUser({
                ...data
            })
        );
    };

    const isValid = Object.keys(errors).length === 0;

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Name"
                name="name"
                value={data.name}
                onChange={handleChange}
                error={errors.name}
            />

            <TextField
                label="Surname"
                name="surname"
                value={data.surname}
                onChange={handleChange}
                error={errors.surname}
            />

            {/* <DragAndDrop /> */}

            <RadioField
                options={[
                    { name: "Male", value: "male" },
                    { name: "Female", value: "female" },
                    { name: "Other", value: "other" }
                ]}
                value={data.sex}
                name="sex"
                onChange={handleChange}
                // label="Выберите ваш пол"
            />

            <DateField
                label="Your birthday"
                name="birthday"
                value={data.birthday}
                onChange={handleChange}
                error={errors.birthday}
            />

            <TextField
                label="Enter your location: "
                name="location"
                value={data.location}
                onChange={handleChange}
                error={errors.location}
            />

            <TextAreaField
                label="Describe yourself for us..."
                name="description"
                value={data.description}
                onChange={handleChange}
                error={errors.description}
            />
            {/* <div className=""> */}
            <SubmitButton
                text="Edit"
                isValid={isValid}
                // addClasses={}
            />
            <CommonButton
                color="danger"
                text="Cancel"
                addClasses={["mt-3"]}
                handleClick={handleCancel}
            />
            {/* </div> */}
        </form>
    );
};

UserEditForm.propTypes = {
    userData: PropTypes.object
};

export default UserEditForm;
