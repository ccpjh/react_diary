const DiaryList = ({ diaryList }) => {
    return (
        <div>
            {diaryList.map((el) => (
                <div key={el.id}>{ el.content}</div>
            ))}
        </div>
        )
}

DiaryList.defaultProps = {
    diaryList: [],
}

export default DiaryList;