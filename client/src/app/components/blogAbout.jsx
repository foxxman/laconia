import React from "react";
import PropTypes from "prop-types";

const BlogAbout = ({ user }) => {
    const getDate = (dateString) => {
        const dateSubstr = dateString.split("-");
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

        const date = `${Number(dateSubstr[2])} ${
            months[Number(dateSubstr[1]) - 1]
        } ${Number(dateSubstr[0])}`;

        return date;
    };

    return (
        <div className="card blog_card mb-3">
            <div className="card-body">
                <h1 className="display-6 mb-3">
                    {user.name} {user.surname}
                </h1>
                <dl className="row">
                    <dt className="col-sm-3">Location</dt>
                    <dd className="col-sm-9">{user.location}</dd>
                    <dt className="col-sm-3">Birthday</dt>
                    <dd className="col-sm-9">{getDate(user.birthday)}</dd>
                    <dt className="col-sm-3">About me</dt>
                    <dd className="col-sm-9">{user.description}</dd>
                </dl>
            </div>
        </div>
    );
};

BlogAbout.propTypes = {
    user: PropTypes.object.isRequired
};

export default BlogAbout;
