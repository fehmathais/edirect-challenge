import instance from './ApiConfig';

const URI = "/projects";

interface CreateProjectRequest {
    title: string;
}

const create = async (data: CreateProjectRequest) => {
    return instance
        .post(URI, data, {withCredentials: true})
        .then((response) => {
            return response;
        })
        .catch((error) => {
            return error.response;
        });
};

const showAll = async () => {
    return instance
        .get(URI, {withCredentials: true})
        .then((response) => {
            return response;
        })
        .catch((error) => {
            return error.response;
        })
}

const remove = async (id: string) => {
    return instance
        .delete(`${URI}/${id}`, {withCredentials: true})
        .then((response) => {
            return response;
        })
        .catch((error) => {
            return error.response;
        })
}

export default {
    create,
    showAll,
    remove,
}