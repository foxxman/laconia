import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import userService from "../services/user.service";
import UserAbout from "../components/userAbout";
import BlogAbout from "../components/blogAbout";
import BlogList from "../components/blogList";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserId, subscribeUser } from "../store/users";

const BlogPage = ({ userId }) => {
    const [user, setUser] = useState(null);
    const currentUserId = useSelector(getCurrentUserId());
    const dispatch = useDispatch();

    useEffect(async () => {
        try {
            const user = await userService.getById(userId);
            setUser(user);
        } catch (error) {
            console.log(error.message);
        }
    }, [userId]);

    const onSubscribe = () => {
        if (userId !== currentUserId) {
            dispatch(
                subscribeUser({
                    followerId: currentUserId,
                    userId: userId
                })
            );

            setUser((prevState) => {
                if (!prevState.subscribers.includes(currentUserId)) {
                    const newState = {
                        ...prevState,
                        subscribers: [...prevState.subscribers, currentUserId]
                    };
                    return newState;
                } else {
                    const newState = {
                        ...prevState,
                        subscribers: prevState.subscribers.filter(
                            (id) => id !== currentUserId
                        )
                    };
                    return newState;
                }
            });
        }
    };

    return user ? (
        <div className="row">
            <div className="col-md-3 col-12">
                <UserAbout
                    subscribers={user.subscribers}
                    subscriptions={user.subscriptions}
                    handleSubscribe={onSubscribe}
                />
            </div>
            <div className="col-md-9 col-12">
                <BlogAbout {...{ user }} />
                <BlogList />
            </div>
        </div>
    ) : (
        <div className="container">
            <h1 className="display-6">Loading...</h1>
        </div>
    );
};

BlogPage.propTypes = {
    userId: PropTypes.string.isRequired
};

export default BlogPage;
