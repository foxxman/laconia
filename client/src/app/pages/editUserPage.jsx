import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import UserEditForm from "../components/ui/userEditForm";
import userService from "../services/user.service";

const EditUserPage = ({ userId }) => {
    const [user, setUser] = useState(null);

    useEffect(async () => {
        try {
            const user = await userService.getById(userId);
            setUser(user);
        } catch (error) {
            console.log(error.message);
        }
    }, []);

    return user ? (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4 bg-light">
                    <h3 className="mb-4 display-6 text-center">
                        Edit your information
                    </h3>
                    <UserEditForm userData={user} />
                </div>
            </div>
        </div>
    ) : (
        <div className="container">
            <h1 className="display-6">Loading...</h1>
        </div>
    );
};

EditUserPage.propTypes = {
    userId: PropTypes.string.isRequired
};

export default EditUserPage;
