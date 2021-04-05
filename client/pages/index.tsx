import { useState } from "react";
import Link from "next/link";
import Router from "next/router";
import UsersApi from "../services/UsersApi";
import Alert from "../components/organism/atoms/alerts";
import EmailInput from "../components/organism/atoms/inputs/email";
import PasswordInput from "../components/organism/atoms/inputs/password";
import PrimaryButton from "../components/organism/atoms/buttons/primary";

const LoginPage = () => {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const signin = async () => {
        if (!loading) {
            setLoading(true);
            const response = await UsersApi.signin({email, password});

            if (response.status !== 200) {
                setErrors(response.data);
                return setLoading(false);
            }

            setErrors([]);
            setLoading(false);
            return Router.push('/panel')
        }
    }
    
    return (
        <div className="container mt-5">
            <div className="card">
                <div className="card-body">
                    <h2 className="card-title">Login</h2>

                    <Alert errors={errors} />

                    <EmailInput label={'E-mail'}
                                placeholder={'your@email.com'}
                                setEmailValue={(email) => {
                                    setEmail(email);
                                    setErrors([]);
                                }}
                                onPressEnter={() => {
                                    return signin();
                                }}
                    />

                    <PasswordInput label={'Password'}
                                   setPasswordValue={(password) => {
                                       setPassword(password);
                                       setErrors([]);
                                   }}
                                   onPressEnter={() => {
                                       return signin();
                                   }}
                    />

                    <div>
                        <PrimaryButton label={!loading ? 'Sign-in' : 'Signin...'}
                                       clicked={() => {
                                           return signin();
                                       }}
                        />

                        <Link href={'/auth/signup'}>
                            <a className="card-link ml-2">
                                Sign-up
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;