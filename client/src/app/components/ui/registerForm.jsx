import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { signUp } from "../../store/users";
import { validator } from "../../utils/validator";
import DateField from "../common/form/dateField";
// import DragAndDrop from "../common/form/dragAndDrop";
import RadioField from "../common/form/radio.Field";
import TextAreaField from "../common/form/textAreaField";
import TextField from "../common/form/textField";
import SubmitButton from "../common/submitButton";

const RegisterForm = () => {
    const dispatch = useDispatch();
    const [data, setData] = useState({
        email: "",
        password: "",
        sex: "male",
        surname: "",
        name: "",
        location: "",
        birthday: "",
        licence: false,
        description: ""
    });

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
        password: {
            isRequired: {
                message: "Can't be empty"
            },
            min: {
                message: "Password cant contain less than 8 symbols",
                value: 8
            },
            isCapitalSymbol: {
                message: "Password must contain Capital symbol"
            },
            isContainDigit: {
                message: "Password must contain numbers"
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
        // console.log(data);
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

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;

        const newData = {
            ...data
        };

        const redirect = "/blog";
        dispatch(signUp({ payload: newData, redirect }));
    };

    const isValid = Object.keys(errors).length === 0;

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Email"
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
            />

            <TextField
                label="Password"
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                error={errors.password}
            />
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
            <SubmitButton isValid={isValid} />
        </form>
    );
};

export default RegisterForm;
