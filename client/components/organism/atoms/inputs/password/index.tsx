import React, {useState, KeyboardEvent} from 'react';

interface IProps {
    label: string;
    placeholder?: string;
    setPasswordValue: (password: string) => any;
    onPressEnter: (password: string) => any;
}

const PasswordInput = (props: IProps) => {
    const [password, setPassword] = useState("");

    const onHandleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Enter") {
            props.onPressEnter(password);
        }
    };

    return (
        <div className="mb-3">
            <label htmlFor="password" className="form-label">
                {props.label}
            </label>

            <input type="password"
                   className="form-control"
                   value={password}
                   onKeyDown={onHandleKeyDown}
                   placeholder={props.placeholder}
                   onChange={(event) => {
                       setPassword(event.target.value);
                       props.setPasswordValue(event.target.value);
                   }}
            />
        </div>
    )
};

export default PasswordInput;