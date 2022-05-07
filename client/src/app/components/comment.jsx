import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import userService from "../services/user.service";
import { Link } from "react-router-dom";

const Comment = ({ userId, comment, handleClose }) => {
    const [user, setUser] = useState(null);

    useEffect(async () => {
        const content = await userService.getById(userId);

        setUser(content);
    }, []);

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

    const dateObj = getDate(comment.created_at);

    return (
        <>
            {user ? (
                <div className="d-flex w-100 justify-content-between mb-3">
                    <Link
                        to={`/blog/${user._id}`}
                        className="text-decoration-none text-dark"
                        onClick={handleClose}
                    >
                        <h5 className="mb-0">
                            {user.name} {user.surname}
                        </h5>
                    </Link>

                    <p className="d-flex align-items-center mb-0">
                        {dateObj.day} {dateObj.month} {dateObj.year}
                    </p>
                </div>
            ) : (
                "..."
            )}

            <p>{comment.content}</p>
            <hr />
        </>
    );
};

Comment.propTypes = {
    userId: PropTypes.string.isRequired,
    comment: PropTypes.object.isRequired,
    handleClose: PropTypes.func.isRequired
};

export default Comment;
