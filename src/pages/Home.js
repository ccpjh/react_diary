import { useContext, useEffect, useState } from "react";
import Header from '../components/Header'
import Button from '../components/Button'
import DiaryList from "../components/DiaryList";
import { DiaryStateContext } from "../App";

const Home = () => {

    // 일기 확인용 더미 데이터 생성
    const diaryList = useContext(DiaryStateContext);
    const [data, setData] = useState([]);
    // 날짜를 저장할 state 생성
    const [currentDate, setCurrentDate] = useState(new Date());
    // 현재 년/월 을 header_txt에 넣어준다.
    const headText = `${currentDate.getFullYear()}년 ${currentDate.getMonth() + 1}월`;

    // 날짜&일기리스트 가 변할 때 마다, 일기 데이터 가공
    useEffect(() => {
        if (diaryList.length >= 1) {
            const firstDay = new Date(
                currentDate.getFullYear(), currentDate.getMonth(), 1
            ).getTime();
    
            const lastDay = new Date(
                currentDate.getFullYear(), currentDate.getMonth() +1 , 0
            ).getTime()
    
            setData(diaryList.filter((el) => firstDay <= el.date && el.date <= lastDay ))
        }
    }, [diaryList, currentDate])

    useEffect(() => {
        console.log(data)
    }, [data])

    // > 버튼을 클릭 했을 때 다음달로 이동
    const increaseMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1), currentDate.getDate());
    };
    //  < 버튼을 클릭 했을 때 이전달로 이동
    const decreaseMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1), currentDate.getDate());
    };



    return (
        <div>
            <Header headText={headText} leftChild={<Button text={'<'} onClick={decreaseMonth} />} rightChild={<Button text={'>'} onClick={increaseMonth} />} />
            <DiaryList diaryList={data} />
        </div>
    );
}

export default Home;