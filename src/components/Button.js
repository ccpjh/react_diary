const Button = ({ text, type, onClick }) => {
    
    const btnType = ['positive', 'negative'].includes(type) ? type : "default";

    return (
        <button type="button" className={['button', `button_${btnType}`].join(' ')} onClick={onClick}>
            {text}
        </button>
    );
}

Button.defaultProps = {
    type: 'default',
};

export default Button;