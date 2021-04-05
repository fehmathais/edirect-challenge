import React, {useState, KeyboardEvent} from 'react';

interface IProps {
    label: string;
    placeholder: string;
    setEmailValue: (email: string) => any;
    onPressEnter: (email: string) => any;
}

const EmailInput = (props: IProps) => {
    const [email, setEmail] = useState("");

    const onHandleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Enter") {
            props.onPressEnter(email);
        }
    };

    return (
        <div className="mb-3">
            <label htmlFor="email" className="form-label">
                {props.label}
            </label>

            <input type="email"
                   className="form-control"
                   value={email}
                   onKeyDown={onHandleKeyDown}
                   placeholder={props.placeholder}
                   onChange={(event) => {
                       setEmail(event.target.value);
                       props.setEmailValue(event.target.value);
                   }}
            />
        </div>
    )
};

export default EmailInput;