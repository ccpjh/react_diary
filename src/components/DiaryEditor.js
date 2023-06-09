import { useNavigate } from 'react-router-dom';
import { useContext, useRef, useState } from 'react';

import Button from './Button';
import Header from './Header';
import EmotionItem from './EmotionItem';
import { DiaryDispatchContext } from '../App';

const env = process.env;
env.PUBLIC_URL = env.PUBLIC_URL || '';

const emotionList = [
    {
        emotion_id: 1,
        emotion_img: process.env.PUBLIC_URL + '/assets/emotion1.png',
        emotion_descript: '완전 좋음',
    },
    {
        emotion_id: 2,
        emotion_img: process.env.PUBLIC_URL + '/assets/emotion2.png',
        emotion_descript: '좋음',
    },
    {
        emotion_id: 3,
        emotion_img: process.env.PUBLIC_URL + '/assets/emotion3.png',
        emotion_descript: '보통',
    },
    {
        emotion_id: 4,
        emotion_img: process.env.PUBLIC_URL + '/assets/emotion4.png',
        emotion_descript: '나쁨',
    },
    {
        emotion_id: 5,
        emotion_img: process.env.PUBLIC_URL + '/assets/emotion5.png',
        emotion_descript: '끔찍함',
    },
];


export const getStringDate = (date) => {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    if (month < 10) {
        month = `0${month}`;
    }
    if (day < 10) {
        day = `0${day}`;
    }

    return `${year}-${month}-${day}`
}

const DiaryEditor = () => {
    const navigate = useNavigate();
    const [date, setDate] = useState(getStringDate(new Date()));
    const [emotion, setEmotion] = useState(3);
    const [content, setContent] = useState('');
    const contentRef = useRef();

    const {onCreate} = useContext(DiaryDispatchContext);
    const handleClickEmotion = (emotion) => {
        setEmotion(emotion);
    }

    const handleChangeText = (e) => {
        setContent(e.target.value)
    }

    const handleSubmit = () => {
        if (!content) {
            contentRef.current.focus();
            alert('일기를 작성해 주세요.');
            return;
        }
        onCreate(date, content, emotion);
        navigate('/', { replace: true})
    };

    return (
        <div className="DiaryEditor">
            <Header
                headText={'새 일기쓰기'}
                leftChild={
                    <Button
                        text={'< 뒤로가기'}
                        onClick={() => {
                            navigate(-1);
                        }}
                    />
                }
            />

            <div className="diary_write_area">
                <section>
                    <h3>오늘은 언제인가요?</h3>
                    <div className="input_box">
                        <input type="date" className="input_date" value={date} onChange={(e) => setDate(e.target.value)} />
                    </div>
                </section>

                <section>
                    <h3>오늘은 감정은?</h3>
                    <div className="input_box emotion_list_wrapper">
                        {emotionList.map((el) => (
                            <EmotionItem key={el.emotion_id} {...el} onClick={handleClickEmotion} isSelected={el.emotion_id === emotion} />
                        ))}
                    </div>
                </section>

                <section>
                    <h3>오늘의 일기</h3>
                    <div className="input_box text_wrapper">
                        <textarea placeholder="오늘은 어땠나요?" value={content} onChange={handleChangeText} ref={contentRef}></textarea>
                    </div>
                </section>

                <section>
                    <div className="control_box">
                        <Button
                            text={'취소하기'}
                            onClick={() => {
                                navigate(-1);
                            }}
                        />
                        <Button text={'작성완료'} type={'positive'} onClick={handleSubmit} />
                    </div>
                </section>
            </div>
        </div>
    );
};

export default DiaryEditor;
