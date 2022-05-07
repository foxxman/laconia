import React, { useState } from "react";
import LoginForm from "../components/ui/loginForm";
import RegisterForm from "../components/ui/registerForm";

const Login = () => {
    const [formType, setFormType] = useState("login");

    const toggleFormType = (params) => {
        setFormType((prevState) =>
            prevState === "register" ? "login" : "register"
        );
    };
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4 bg-light">
                    {formType === "register" ? (
                        <>
                            <h3 className="mb-4 display-6 text-center">
                                Register
                            </h3>
                            <RegisterForm />
                            <p className="text-center">
                                Already have account?{" "}
                                <a role="button" onClick={toggleFormType}>
                                    {" "}
                                    Sign In
                                </a>
                            </p>
                        </>
                    ) : (
                        <>
                            <h3 className="mb-4 display-6 text-center">
                                Login
                            </h3>
                            <LoginForm />
                            <p className="text-center">
                                Do not have an account?{" "}
                                <a role="button" onClick={toggleFormType}>
                                    {" "}
                                    Sign Up!
                                </a>
                            </p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Login;
