import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCurrentUserId, getIsLoggedIn } from "../../store/users";

const Navbar = () => {
    const isLoggedIn = useSelector(getIsLoggedIn());

    const currentUserId = useSelector(getCurrentUserId());

    return (
        <nav className="navbar bg-light mb-3">
            <div className="container-fluid">
                <Link
                    className="navbar-brand text-dark"
                    aria-current="page"
                    to="/"
                >
                    <h1 className="display-6">Laconia</h1>
                </Link>
                <ul className="nav">
                    {isLoggedIn && (
                        <li className="nav-item">
                            <Link
                                className="nav-link d-flex flex-column text-dark align-items-center"
                                aria-current="page"
                                to={`/blog/${currentUserId}`}
                            >
                                <i className="nav-icon bi bi-sticky d-flex align-items-center justify-content-center"></i>
                                <span>Blog</span>
                            </Link>
                        </li>
                    )}

                    {/* {isLoggedIn && (
                        <li className="nav-item">
                            <Link
                                className="nav-link d-flex text-dark flex-column align-items-center"
                                aria-current="page"
                                to="/chats"
                            >
                                <i className="nav-icon bi bi-chat-left-dots d-flex align-items-center justify-content-center"></i>
                                <span>Messenger</span>
                            </Link>
                        </li>
                    )} */}
                </ul>
                <div className="d-flex">
                    {!isLoggedIn ? (
                        <Link
                            className="nav-link d-flex text-dark flex-column align-items-center"
                            aria-current="page"
                            to="/login"
                        >
                            <i className="nav-icon bi bi-box-arrow-in-right d-flex align-items-center justify-content-center"></i>
                            <span>Login</span>
                        </Link>
                    ) : (
                        <Link
                            className="nav-link d-flex text-dark flex-column align-items-center"
                            aria-current="page"
                            to="/logout"
                        >
                            <i className="nav-icon bi bi-box-arrow-left d-flex align-items-center justify-content-center"></i>
                            <span>Logout</span>
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
