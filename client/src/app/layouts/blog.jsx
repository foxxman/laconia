import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import BlogPage from "../pages/blogPage";
import EditUserPage from "../pages/editUserPage";
import userService from "../services/user.service";
import { getCurrentUserId } from "../store/users";
import history from "../utils/history";

const Blog = () => {
    const [user, setUser] = useState(null);
    const params = useParams();
    const { userId, edit } = params;
    const currentUserId = useSelector(getCurrentUserId());

    useEffect(async () => {
        try {
            if (!userId) {
                history.push(`/blog/${currentUserId}`);
                const user = await userService.getById(currentUserId);
                setUser(user);
            } else {
                const user = await userService.getById(userId);
                setUser(user);
            }
        } catch (error) {
            console.log(error.message);
        }
    }, []);

    return user ? (
        <div className="container">
            {edit ? (
                userId === currentUserId ? (
                    <EditUserPage {...{ userId }} />
                ) : (
                    <Redirect to={`/blog/${currentUserId}/edit`} />
                )
            ) : (
                <BlogPage {...{ userId }} />
            )}
        </div>
    ) : (
        <div className="container">
            <h1 className="display-6">Loading...</h1>
        </div>
    );
};

export default Blog;
