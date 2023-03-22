import React, { useReducer, useRef } from 'react';
import './App.css';
import Home from './pages/Home';

const reducer = (state, action) => {
    let newState = [];
    switch (action.type) {
        case 'INIT': {
            return action.data;
        }
        case 'CREATE': {
            newState = [action.data, ...state]
            break;
        }
        case 'REMOVE': {
            newState = state.filter((el) => el.id !== action.targetId);
            break;
        }
        case 'EDIT': {
            newState = state.map((el) => (el.id === action.data.id ? { ...action.data } : el));
            break;
        }
        default:
            return state
    }

    return newState;
}

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

const dummyData = [
    {
        id: 1,
        emotion: 1,
        content: '오늘의 일기 1번',
        date: 1679490942802,
    },
    {
        id: 2,
        emotion: 2,
        content: '오늘의 일기 2번',
        date: 1679491123733,
    },
    {
        id: 3,
        emotion: 3,
        content: '오늘의 일기 3번',
        date: 1679491127973,
    },
    {
        id: 4,
        emotion: 4,
        content: '오늘의 일기 4번',
        date: 1679491155057,
    },
    {
        id: 5,
        emotion: 5,
        content: '오늘의 일기 5번',
        date: 1679491163724,
    },
    {
        id: 6,
        emotion: 2,
        content: '오늘의 일기 6번',
        date: 1689492246136,
    },
];

function App() {

    const [data, dispatch] = useReducer(reducer, dummyData);

    console.log(new Date().getTime())

    const dataId = useRef(0)
    // CREATE
    const onCreate = (date, content, emotion) => {
        dispatch({
            type: 'CREATE',
            data: {
                id: dataId.current,
                date: new Date(date).getTime(),
                content,
                emotion,
            },
        });
        dataId.current += 1;
    }

    // REMOVE
    const onRemove = (targetId) => {
        dispatch({
            type: "REMOVE",
            targetId
        })
    }

    // EDIT
    const onEdit = (targetId, date, content, emotion) => {
        dispatch({
            type: "EDIT",
            data: {
                id: targetId,
                date: new Date(date).getTime(),
                content,
                emotion,
            }
        })
    }


    return (
        <DiaryStateContext.Provider value={data}>
            <DiaryDispatchContext.Provider
                value={{
                    onCreate,
                    onEdit,
                    onRemove,
                }}
            >
                <div className="App">
                    <Home />
                </div>
            </DiaryDispatchContext.Provider>
        </DiaryStateContext.Provider>
    );
}

export default App;
