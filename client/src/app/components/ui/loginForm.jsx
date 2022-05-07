import React, { useEffect, useState } from "react";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import SubmitButton from "../common/submitButton";
import { useDispatch } from "react-redux";
import { login } from "../../store/users";

const LoginForm = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
        stayOn: false
    });
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    // const loginError = useSelector(getAuthErrors());

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

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

    const isValid = Object.keys(errors).length === 0;

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        // const redirect = history.location.state
        //     ? history.location.state.from.pathname
        //     : "/";

        const redirect = "/blog";

        dispatch(login({ payload: data, redirect }));
    };

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

            {/* {loginError && <p className="text-danger">{loginError}</p>} */}

            <SubmitButton isValid={isValid} />
        </form>
    );
};

export default LoginForm;
