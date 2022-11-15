import createDataContext from "./createDataContext";

const liveSessionReducer = (state, action) => {
    switch (action.type) {
        case 'create_room':
            return {roomID: action.payload.roomID, users: [{ userName: action.payload.userName, id: action.payload.id, avatar: action.payload.avatar, points: 0, crossed: false, time: null }] };
        case 'add_room':
            return action.payload.gameInfo;
        case 'add_player':
            return { ...state, users: [...state.users, { userName: action.payload.userName, id: action.payload.id, avatar: action.payload.avatar, points: 0, crossed: false, time: null }] };
        case 'remove_player':
            return { ...state, users: action.payload.users };
        case 'increase_points':
            return action.payload.newState;
        case 'user_crossed':
            return action.payload.newState;
        default:
            return state;
    }
};

const createRoom = dispatch => {
    return ({ roomID, userName, avatar, id }) => {
        dispatch({ type: 'create_room', payload: {roomID: roomID, userName: userName, avatar: avatar, id: id } });
    };
};

const addRoom = dispatch => {
    return ({ gameInfo }) => {
        dispatch({ type: 'add_room', payload: { gameInfo: gameInfo } });
    };
};

const addPlayer = dispatch => {
    return ({ userName, avatar, id }) => {
        dispatch({ type: 'add_player', payload: {userName: userName, avatar: avatar, id: id } });
    };
};

const removePlayer = dispatch => {
    return ({state, task}) => {
        const newList = state.users.filter((item) => item.userName != task.userName);
        dispatch({ type: 'remove_player', payload: {users: newList} });
    };
};

const getIndex = ({userName, list}) => {
    return list.findIndex(obj => obj.userName === userName);
};

const increasePoints = dispatch => {
    return ({ state, userName, points }) => {
        const index = getIndex({ userName: userName, list: state.users });
        const updatedUser = {...state.users[index], points: points};
        state.users[index] = updatedUser;
        dispatch({ type: 'increase_points', payload: { newState: state } });
    };
};

const userCrossed = dispatch => {
    return ({state, userName, time}) => {
        const index = getIndex({ userName: userName, list: state.users });
        const updatedUser = {...state.users[index], crossed: true, time: time};
        state.users[index] = updatedUser;
        dispatch({ type: 'user_crossed', payload: { newState: state } });
    };
};

export const { Provider, Context } = createDataContext(
    liveSessionReducer, 
    { createRoom, addRoom, addPlayer, removePlayer, increasePoints, userCrossed },
    {}
);