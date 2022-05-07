import { createSlice, createAction } from "@reduxjs/toolkit";
import commentsService from "../services/comments.service";

const initialState = { entities: null, isLoading: false, error: null };

const commentsSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {
        commentsRequested: (state) => {
            state.isLoading = true;
        },
        commentsRecived: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        commentsRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        addCommentFailed: (state, action) => {
            state.error = action.payload;
        },
        addCommentRecived: (state, action) => {
            state.entities = [...state.entities, action.payload];
        },
        commentsCleaned: (state) => {
            state.entities = null;
            state.error = null;
            state.isLoading = false;
        }
    }
});

const { reducer: commentsReducer, actions } = commentsSlice;

const {
    addCommentFailed,
    commentsRecived,
    commentsRequested,
    commentsRequestFailed,
    addCommentRecived,
    commentsCleaned
} = actions;

const addCommentRequested = createAction("comments/addCommentRequested");

export const loadCommentsList = (postId) => async (dispatch) => {
    dispatch(commentsRequested());
    try {
        const { content } = await commentsService.getByPostId(postId);
        dispatch(commentsRecived(content));
    } catch (error) {
        dispatch(commentsRequestFailed(error.message));
    }
};

export const addComment = (payload) => async (dispatch) => {
    dispatch(addCommentRequested());
    try {
        const { content } = await commentsService.createComment(payload);
        dispatch(addCommentRecived(content));
    } catch (error) {
        dispatch(addCommentFailed(error.message));
    }
};

export const cleanCommentsList = () => (dispatch) => {
    dispatch(commentsCleaned());
};

export const getCommentsList = () => (state) => state.comments.entities;
export const getCommentsIsLoading = () => (state) => state.comments.isLoading;

export default commentsReducer;
