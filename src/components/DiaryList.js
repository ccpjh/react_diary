import { useState } from "react"

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

// 일기 정렬 컴포넌트
const ControlMenu = ({value, onChange, optionList}) => {
    return (
        <select value={value} onChange={(e) => onChange(e.target.value)}>
            {optionList.map((el, idx) => (
                <option key={idx} value={el.value}>
                    {el.name}
                </option>
            ))}
        </select>
    )

}

const DiaryList = ({ diaryList }) => {
    const [sortType, setSortType] = useState('latest');

    const getProcessedDiaryList = () => {
        const compare = (a, b) => {
            if (sortType === 'latest') {
                return parseInt(b.date) - parseInt(a.date);
            } else {
                return parseInt(a.date) - parseInt(b.date);
            }
        }

        const copyList = JSON.parse(JSON.stringify(diaryList));
        const sortedList = copyList.sort(compare)
        return sortedList;
        
    }

    return (
        <div>
            <ControlMenu value={sortType} onChange={setSortType} optionList={sortOptionList} />
            {getProcessedDiaryList().map((el) => (
                <div key={el.id}>{el.content}</div>
            ))}
        </div>
    );
}

DiaryList.defaultProps = {
    diaryList: [],
}

export default DiaryList;