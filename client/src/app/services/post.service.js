import httpService from "./http.service";

const postEndpoint = "post/";

const postService = {
    getPosts: async (userId) => {
        const { data } = await httpService.get(postEndpoint, {
            params: {
                orderBy: "userId",
                equalTo: `${userId}`
            }
        });
        return data;
    },
    create: async (content) => {
        try {
            const { data } = await httpService.post(postEndpoint, content);
            console.log(data);
            return data;
        } catch (error) {
            console.log(error.message);
        }
    },
    update: async (content) => {
        try {
            const { data } = await httpService.patch(
                postEndpoint + content._id,
                content
            );
            return data;
        } catch (error) {
            console.log(error.message);
        }
    },
    remove: async (postId) => {
        try {
            const { data } = httpService.delete(postEndpoint + postId);
            console.log(data);
            return data;
        } catch (error) {
            console.log(error.message);
        }
    }
};

export default postService;
