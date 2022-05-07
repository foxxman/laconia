import React, { useState } from "react";
import avatar from "../assets/avatar.png";
import PropTypes from "prop-types";
import { useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCurrentUserId } from "../store/users";
import FollowModal from "./FollowModal";
import userService from "../services/user.service";

const UserAbout = ({ subscribers, subscriptions, handleSubscribe }) => {
    const [modal, setModal] = useState({
        type: null,
        entities: null,
        isLoading: false
    });
    const history = useHistory();
    const { userId } = useParams();
    const currentUserId = useSelector(getCurrentUserId());

    const handleEdit = () => {
        history.push(history.location.pathname + "/edit");
    };

    const toggleModal = async (type) => {
        if (type) {
            setModal({ type: type, entities: null, isLoading: true });
            try {
                const ids =
                    type === "subscriptions" ? subscriptions : subscribers;
                console.log(ids);
                const { content } = await userService.findUsersByIds({
                    ids: ids
                });
                setModal({ type: type, entities: content, isLoading: false });
            } catch (error) {
                console.log(error.message);
            }
        } else {
            setModal({ type: null, entities: null, isLoading: false });
        }
    };

    return (
        <div className="card">
            <img
                className="card-img-top avatar-img"
                src={avatar}
                alt="avatar"
            />
            <div className="card-body">
                {userId === currentUserId ? (
                    <button
                        onClick={handleEdit}
                        className="btn btn-outline-success btn-lg btn-block w-100 mb-3"
                    >
                        Edit profile
                    </button>
                ) : !subscribers.includes(currentUserId) ? (
                    <button
                        onClick={handleSubscribe}
                        className="btn btn-outline-primary btn-lg btn-block w-100 mb-3"
                    >
                        Follow
                    </button>
                ) : (
                    <button
                        onClick={handleSubscribe}
                        className="btn btn-outline-danger btn-lg btn-block w-100 mb-3"
                    >
                        Unsubscibe
                    </button>
                )}
                <div className="subscribes-block">
                    <FollowModal
                        {...{
                            modalInfo: modal,
                            toggleModal
                        }}
                    />
                    <button
                        onClick={() => toggleModal("subscribers")}
                        className="subscribes-block__button"
                    >
                        <span>{subscribers.length}</span> subscribers
                    </button>
                    <button
                        onClick={() => toggleModal("subscriptions")}
                        className="subscribes-block__button"
                    >
                        <span>{subscriptions.length}</span> subscriptions
                    </button>
                </div>
            </div>
        </div>
    );
};

UserAbout.propTypes = {
    subscribers: PropTypes.arrayOf(PropTypes.string),
    subscriptions: PropTypes.arrayOf(PropTypes.string),
    handleSubscribe: PropTypes.func.isRequired
};

export default UserAbout;
