import instance from './ApiConfig';

interface SignInRequest {
    email: string;
    password: string;
}

const signin = async (data: SignInRequest) => {
    const uri = "/users/signin";
    
    return instance
        .post(uri, data)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            return error.response;
        })
};

export default {
    signin
}