import instance from './ApiConfig';

interface SignInRequest {
    email: string;
    password: string;
}

const signin = async (data: SignInRequest) => {
    const uri = "/users/signin";

    return instance
        .post(uri, data, {withCredentials: true})
        .then((response) => {
            return response;
        })
        .catch((error) => {
            return error.response;
        })
};

const currentuser = async () => {
    const uri = "/users/currentuser";

    return instance
        .get(uri)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            return error.response;
        })
};

export default {
    signin,
    currentuser,
}