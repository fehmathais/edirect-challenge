import React, {useState, KeyboardEvent} from 'react';

interface IProps {
    label: string;
    placeholder: string;
    setTimeValue: (time: string) => any;
    onPressEnter: (time: string) => any;
}

const TimeInput = (props: IProps) => {
    const [time, setTime] = useState("");

    const setMask = async (event) => {
        let date = event.target.value;

        if (event.target.value.length <= 5) {
            date = date.replace(/\D/g, '');
            date = date.replace(/(\d{2})(\d)/, '$1h$2');

            await setTime(date);
            return props.setTimeValue(date);
        }
    };
    
    const onHandleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Enter") {
            props.onPressEnter(time);
        }
    };

    return (
        <div className="mb-3">
            <label htmlFor="time" className="form-label">
                {props.label}
            </label>

            <input type="tel"
                   className="form-control"
                   value={time}
                   onKeyDown={onHandleKeyDown}
                   placeholder={props.placeholder}
                   onChange={setMask}
            />
        </div>
    )
};

export default TimeInput;