import { createAction, createSlice } from "@reduxjs/toolkit";
import postService from "../services/post.service";

const initialState = { entities: null, isLoading: true, error: null };

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        postsRequested: (state) => {
            state.isLoading = true;
        },
        postsReceved: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        postsRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        postsCreated: (state, action) => {
            state.entities.push(action.payload);
        },
        postUpdated: (state, action) => {
            state.entities = state.entities.map((post) =>
                post._id === action.payload._id
                    ? { ...post, ...action.payload }
                    : post
            );
            state.error = null;
            // state.isLoading = false;
        },
        postUpdateFailed: (state, action) => {
            state.error = action.payload;
            // state.isLoading = false;
        },
        postRemoveFailed: (state, action) => {
            state.error = action.payload;
            // state.isLoading = false;
        },
        postUpdateRequested: (state, action) => {
            // state.isLoading = true;
        },
        postRemoved: (state, action) => {
            state.entities = state.entities.filter(
                (post) => post._id !== action.payload
            );
        },
        commentCreated: (state, action) => {
            state.entities = state.entities.map((p) =>
                p._id === action.payload.postId
                    ? {
                          ...p,
                          comments: [...p.comments, action.payload.commentId]
                      }
                    : p
            );
        }
    }
});

const addPostsRequested = createAction("posts/addPostsRequested");
const removePostsRequested = createAction("posts/removePostsRequested");

const { reducer: postsReduser, actions } = postsSlice;

const {
    postRemoveFailed,
    postUpdateFailed,
    postUpdated,
    postUpdateRequested,
    postsCreated,
    postsRequested,
    postsRequestFailed,
    postsReceved,
    postRemoved,
    commentCreated
} = actions;

export const loadPostsList = (userId) => async (dispatch) => {
    dispatch(postsRequested());
    try {
        const { content } = await postService.getPosts(userId);
        dispatch(postsReceved(content));
    } catch (error) {
        dispatch(postsRequestFailed(error.message));
    }
};

export const createPost = (payload) => async (dispatch) => {
    dispatch(addPostsRequested());
    console.log(payload);
    try {
        const { content } = await postService.create(payload);
        dispatch(postsCreated(content));
    } catch (error) {
        dispatch(postsRequestFailed(error.message));
    }
};

export const updatePost = (payload) => async (dispatch) => {
    dispatch(postUpdateRequested());
    try {
        const { content } = await postService.update(payload);
        // console.log(content);
        dispatch(postUpdated(content));
    } catch (error) {
        dispatch(postUpdateFailed(error.message));
    }
};

export const removePost = (postId) => async (dispatch) => {
    dispatch(removePostsRequested());
    try {
        await postService.remove(postId);
        dispatch(postRemoved(postId));
    } catch (error) {
        dispatch(postRemoveFailed(error.message));
    }
};

export const createPostComment = (payload) => async (dispatch) => {
    dispatch(commentCreated(payload));
};

export const getUserPosts = () => (state) => state.posts.entities;
export const getIsLoading = () => (state) => state.posts.isLoading;
export const getPostError = () => (state) => state.post.error;
export const getPostCommentsCount = (postId) => (state) =>
    state.posts.entities[
        state.posts.entities.findIndex((p) => p._id === postId)
    ].comments.length;

export default postsReduser;
