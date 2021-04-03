import { useEffect, useState } from 'react';

interface IProps {
    errors: IError[];
}

interface IError {
    message: string;
    field: string;
}

const Alert = (props: IProps) => {
    const [errors, setErrors] = useState<IError[]>([]);

    useEffect(() => {
        setErrors(props.errors);
    }, [props.errors])
    
    if (errors.length === 0) {
        return (<div />);
    }
    
    return (
        <div className="alert alert-danger">
            <ul className="my-0">
                {
                    errors.map(err => {
                        return (<li key={err.message}>{err.message}</li>)
                    })
                }
            </ul>
        </div>
    )
};

export default Alert;