const Header = ({ headText, leftChild, rightChild }) => {
    return (
        <header>
            <div className="header_left_area">{leftChild}</div>
            <div className="header_txt">
                <h1>{headText}</h1>
            </div>
            <div className="header_right_area">{rightChild}</div>
        </header>
    );
};

export default Header;