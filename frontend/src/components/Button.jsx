const Button = ({
    title,
    onClick,
    className = "",
    disabled = false
}) => {

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`w-full bg-orange-500 text-white py-3 rounded-xl font-semibold active:scale-95 transition ${className}`}
        >
            {title}
        </button>
    );

};

export default Button;