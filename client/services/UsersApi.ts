import instance from './ApiConfig';

interface SigninRequest {
    email: string;
    password: string;
}

interface SignupRequest {
    name: string;
    email: string;
    password: string;
}

const signin = async (data: SigninRequest) => {
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

const signup = async (data: SignupRequest) => {
    const uri = "/users/signup";

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

const signout = async () => {
    const uri = "/users/signout";

    return instance
        .post(uri)
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
    signout,
    signup
}