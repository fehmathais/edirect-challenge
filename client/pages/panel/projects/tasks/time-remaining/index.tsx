import { useEffect, useState } from "react";
import moment from "moment";

interface ITimeRemainingProps {
    time: string;
}

const TimeRemaining = (props: ITimeRemainingProps) => {
    const [timeLeft, setTimeLeft] = useState(0);

    useEffect(() => {
        const findTimeLeft = () => {
            const current = moment();
            const expiration = moment(props.time);

            if (expiration <= current) {
                return setTimeLeft(0);
            }

            // @ts-ignore
            const timeLeft = (expiration - current);

            // @ts-ignore
            setTimeLeft(moment.utc(timeLeft).format('HH:mm:ss'));
        }

        findTimeLeft();
        const timerId = setInterval(findTimeLeft, 1000);
        return () => {
            clearInterval(timerId);
        };
    }, []);

    if (timeLeft === 0) {
        return (
            <small className="text-danger">Expired!</small>
        )
    }

    return (
        <small>
            <strong>Time remaining:</strong> {' '}
            {timeLeft}
        </small>
    )
};

export default TimeRemaining