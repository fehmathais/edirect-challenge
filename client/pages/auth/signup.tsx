import { useState } from "react";
import Link from "next/link";
import Router from "next/router";
import UsersApi from "../../services/UsersApi";
import Alert from "../../components/organism/atoms/alerts";
import EmailInput from "../../components/organism/atoms/inputs/email";
import PasswordInput from "../../components/organism/atoms/inputs/password";
import PrimaryButton from "../../components/organism/atoms/buttons/primary";
import TextInput from "../../components/organism/atoms/inputs/text";

const SignupPage = () => {
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const signup = async () => {
        if (!loading) {
            setLoading(true);
            const response = await UsersApi.signup({name, email, password});

            if (response.status !== 201) {
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
                    <h2 className="card-title">Sign Up</h2>

                    <Alert errors={errors} />

                    <TextInput label={'Name'}
                                placeholder={'Your name'}
                                setTextValue={(text) => {
                                    setName(text);
                                    setErrors([]);
                                }}
                                onPressEnter={() => {
                                    return signup();
                                }}
                    />

                    <EmailInput label={'E-mail'}
                                placeholder={'your@email.com'}
                                setEmailValue={(email) => {
                                    setEmail(email);
                                    setErrors([]);
                                }}
                                onPressEnter={() => {
                                    return signup();
                                }}
                    />

                    <PasswordInput label={'Password'}
                                   setPasswordValue={(password) => {
                                       setPassword(password);
                                       setErrors([]);
                                   }}
                                   onPressEnter={() => {
                                       return signup();
                                   }}
                    />

                    <div>
                        <PrimaryButton label={!loading ? 'Register' : 'Registering...'}
                                       clicked={() => {
                                           return signup();
                                       }}
                        />

                        <Link href={'/'}>
                            <a className="card-link ml-2">
                                Sign-in
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignupPage;