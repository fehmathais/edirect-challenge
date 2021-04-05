import instance from "./ApiConfig";

const URI = "/tasks";

interface CreateTaskRequest {
    description: string;
    expiration: string;
    projectId: string;
}

const create = async (data: CreateTaskRequest) => {
    return instance
        .post(URI, data, {withCredentials: true})
        .then((response) => {
            return response;
        })
        .catch((error) => {
            return error.response;
        });
};

export default {
    create,
}