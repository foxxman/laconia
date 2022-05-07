import httpService from "./http.service";

const commentsEndpoint = "comment/";

const commentsService = {
    getByPostId: async (postId) => {
        try {
            const { data } = await httpService.get(commentsEndpoint, {
                params: {
                    orderBy: "postId",
                    equalTo: `${postId}`
                }
            });
            return data;
        } catch (error) {
            console.log(error.message);
        }
    },
    createComment: async (payload) => {
        try {
            const { data } = await httpService.post(commentsEndpoint, payload);

            return data;
        } catch (error) {
            console.log(error.message);
        }
    }
};

export default commentsService;
