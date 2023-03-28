import { useNavigate, Link } from "react-router-dom";
import Button from "./Button";

const DiaryItem = ({ id, emotion, content, date }) => {
    const navigate = useNavigate();
    const env = process.env;
    env.PUBLIC_URL = env.PUBLIC_URL || "";

    const strDate = new Date(parseInt(date)).toLocaleDateString();

    const goEdit = () => {
        navigate(`/edit/${id}`)
    }
    
    return (
        <div className="diary_item">
            <Link to={`/diary/${id}`}>
                <div className={['diary_img_area', `diary_img_area${emotion}`].join(' ')}>
                    <img src={process.env.PUBLIC_URL + `assets/emotion${emotion}.png`} />
                </div>
                <div className="diary_info_area">
                    <span className="diary_date">{strDate}</span>
                    <p className="diary_content">{content.slice(0, 25)}</p>
                </div>
            </Link>
            <div className="diary_btn_area">
                <Button text={'수정하기'} onClick={ goEdit} />
            </div>
        </div>
    );
}

export default DiaryItem;