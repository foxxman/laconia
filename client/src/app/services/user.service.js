import axios from "axios";
import config from "../config.json";
import httpService from "./http.service";
import localStorageService from "./localStorage.service";

const httpUser = axios.create({
    baseURL: config.apiEndpoint + "user/"
});
const userEndpoint = "user/";

const userService = {
    getById: async (userId) => {
        try {
            const { data } = await httpUser.get(userId);
            return data;
        } catch (error) {
            console.log(error.message);
        }
    },
    update: async (payload) => {
        try {
            const { data } = await httpService.patch(
                userEndpoint + localStorageService.getUserId(),
                payload
            );

            return data;
        } catch (error) {
            console.log(error.message);
        }
    },
    subscribe: async (payload) => {
        try {
            const { data } = await httpService.patch(
                userEndpoint + `subscribe/${payload.userId}`,
                payload
            );
            return data;
        } catch (error) {
            console.log(error.message);
        }
    },
    findUsersByIds: async (payload) => {
        try {
            console.log(payload);
            const { data } = await httpService.post(userEndpoint, payload);
            console.log(data);
            return data;
        } catch (error) {
            console.log(error.message);
        }
    }
};

export default userService;
