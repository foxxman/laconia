import commentsReducer from "./comments";
import postsReduser from "./posts";
import userReducer from "./users";

const { combineReducers, configureStore } = require("@reduxjs/toolkit");

const rootReducer = combineReducers({
    user: userReducer,
    posts: postsReduser,
    comments: commentsReducer
});

export function createStore() {
    return configureStore({
        reducer: rootReducer
    });
}
