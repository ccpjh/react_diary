import { useState } from "react"
import { useNavigate } from "react-router-dom";
import Button from './Button';

// 일기 정렬 값을 배열로 담는다.
const sortOptionList = [
    {
        value: "latest",
        name: "최신순"
    },
    {
        value: "oldest",
        name:"오래된 순"
    }
]

const filterOptionList = [
    {
        value: 'all',
        name:'전부다',
    },
    {
        value: 'good',
        name:'좋은 감정만',
    },
    {
        value: 'bad',
        name:'안좋은 감정만',
    },
]

// 일기 정렬 컴포넌트
const ControlMenu = ({value, onChange, optionList}) => {
    return (
        <select className='control_menu' value={value} onChange={(e) => onChange(e.target.value)}>
            {optionList.map((el, idx) => (
                <option key={idx} value={el.value}>
                    {el.name}
                </option>
            ))}
        </select>
    )

}

const DiaryList = ({ diaryList }) => {
    const navigate = useNavigate();
    const [sortType, setSortType] = useState('latest');
    const [filter, setFilter] = useState('all');

    const getProcessedDiaryList = () => {
        const filterCallBack = (item) => {
            if (filter === 'good') {
                return parseInt(item.emotion) <= 3;
            } else {
                return parseInt(item.emotion) > 3;
            }
        }

        const compare = (a, b) => {
            if (sortType === 'latest') {
                return parseInt(b.date) - parseInt(a.date);
            } else {
                return parseInt(a.date) - parseInt(b.date);
            }
        }

        const copyList = JSON.parse(JSON.stringify(diaryList));
        const filteredList = filter === 'all' ? copyList : copyList.filter((el) => filterCallBack(el));

        const sortedList = filteredList.sort(compare);
        return sortedList;
        
    }

    return (
        <div className="diary_list">
            <div className="menu_wrapper">
                <div className="left_col">
                    <ControlMenu value={sortType} onChange={setSortType} optionList={sortOptionList} />
                    <ControlMenu value={filter} onChange={setFilter} optionList={filterOptionList} />
                </div>
                <div className="right_col">
                    <Button type={'positive'} text={'새 일기쓰기'} onClick={() => navigate('/new')} />
                </div>
            </div>

            {getProcessedDiaryList().map((el) => (
                <div key={el.id}>
                    {el.content} {el.emotion}
                </div>
            ))}
        </div>
    );
}

DiaryList.defaultProps = {
    diaryList: [],
}

export default DiaryList;