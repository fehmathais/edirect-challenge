import React, {useState, KeyboardEvent} from 'react';

interface IProps {
    label: string;
    placeholder: string;
    setTextValue: (text: string) => any;
    onPressEnter: (text: string) => any;
}

const TextInput = (props: IProps) => {
    const [text, setText] = useState("");

    const onHandleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Enter") {
            props.onPressEnter(text);
        }
    };

    return (
        <div className="mb-3">
            <label htmlFor="text" className="form-label">
                {props.label}
            </label>

            <input type="text"
                   className="form-control"
                   value={text}
                   onKeyDown={onHandleKeyDown}
                   placeholder={props.placeholder}
                   onChange={(event) => {
                       setText(event.target.value);
                       props.setTextValue(event.target.value);
                   }}
            />
        </div>
    )
};

export default TextInput;