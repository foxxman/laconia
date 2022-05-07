import { createAction, createSlice } from "@reduxjs/toolkit";
import authService from "../services/auth.service";
import { generetaAuthError } from "../services/generateAuthError";
import localStorageService from "../services/localStorage.service";
import userService from "../services/user.service";
import history from "../utils/history";

let initialState = {
    isLoading: false,
    error: null,
    auth: { userId: null },
    isLoggedIn: false,
    dataLoaded: false
};

if (localStorageService.getAccessToken()) {
    initialState = {
        isLoading: true,
        error: null,
        auth: { userId: localStorageService.getUserId() },
        isLoggedIn: true,
        dataLoaded: false
    };
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        authRequested: (state) => {
            state.error = null;
        },
        authRequestSuccess: (state, action) => {
            state.auth = action.payload;
            state.isLoggedIn = true;
        },
        authRequestFailed: (state, action) => {
            state.error = action.payload;
        },
        userLoggedOut: (state) => {
            state.isLoggedIn = false;
            state.auth = { userId: null };
            state.dataLoaded = false;
        },
        userUpdateFailed: (state, action) => {
            state.error = action.payload;
        }
    }
});

const { reducer: userReducer, actions } = userSlice;

const {
    userUpdateFailed,
    userLoggedOut,
    authRequestFailed,
    authRequestSuccess,
    authRequested
} = actions;

const userUpdateSuccessed = createAction("user/userUpdateSuccessed");
// const userUpdateFailed = createAction("user/userUpdateFailed");
const userUpdateRequested = createAction("user/userUpdateRequested");
const authTest = createAction("user/authTest");

export const signUp =
    ({ payload }) =>
    async (dispatch) => {
        dispatch(authTest());
        dispatch(authRequested());

        try {
            const data = await authService.register(payload);
            localStorageService.setTokens(data);
            dispatch(authRequestSuccess({ userId: data.userId }));
            history.push(`/blog/${data.userId}`);
        } catch (error) {
            dispatch(authRequestFailed(error.message));
        }
    };

export const login =
    ({ payload }) =>
    async (dispatch) => {
        const { email, password } = payload;
        dispatch(authTest());
        dispatch(authRequested());

        try {
            const data = await authService.login({ email, password });
            localStorageService.setTokens(data);

            dispatch(authRequestSuccess({ userId: data.userId }));

            history.push(`/blog/${data.userId}`);
        } catch (error) {
            // console.log(error);

            const { code, message } = error.response.data.error;

            if (code === 400) {
                const errorMessage = generetaAuthError(message);
                console.log(errorMessage);
                dispatch(authRequestFailed(errorMessage));
            } else {
                dispatch(authRequestFailed(error.message));
            }
        }
    };

export const logout = () => (dispatch) => {
    console.log("logout");
    localStorageService.removeAuthData();
    dispatch(userLoggedOut());
    history.push("/");
};

export const updateUser = (payload) => async (dispatch) => {
    dispatch(userUpdateRequested());
    console.log("start updating user: ", payload);

    try {
        const { content } = await userService.update(payload);
        dispatch(userUpdateSuccessed(content));
        history.push(`/blog/${content._id}`);
    } catch (error) {
        dispatch(userUpdateFailed(error.message));
    }
};

export const subscribeUser = (payload) => async (dispatch) => {
    try {
        const { content } = await userService.subscribe(payload);
        console.log(content);
    } catch (error) {
        dispatch(userUpdateFailed(error.message));
    }
};

export const getCurrentUserId = () => (state) => state.user.auth.userId;
export const getIsLoggedIn = () => (state) => state.user.isLoggedIn;

export default userReducer;
