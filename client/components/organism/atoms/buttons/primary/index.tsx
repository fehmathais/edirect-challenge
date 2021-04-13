interface IProps {
    label: string;
    clicked: () => any;
}

const PrimaryButton = (props: IProps) => {
    const handleClick = () => {
        return props.clicked();
    };

    return (
        <button type="submit"
                className="btn btn-primary" onClick={handleClick}>
            {props.label}
        </button>
    );
};

export default PrimaryButton;