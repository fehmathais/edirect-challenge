import {useEffect} from 'react';
import Router from "next/router";
import UsersApi from "../../services/UsersApi";

const SignOut = () => {
    async function logout () {
        return await UsersApi.signout();
    }
    
    useEffect(() => {
        logout().then(() => Router.push('/'));
    }, []);

    return (
        <div>Signing out...</div>
    )
}

export default SignOut;