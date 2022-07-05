import {GET_USERS } from "../actions/actionType";

export const initState = {
    users:[],
    loading:false,
};

const profileReducer = (state = initState, action) => {
    switch(action.type) {
        case GET_USERS:
            return {
                ...state,
                users: action.payload,
            }

        default:
            return state;
    }
};

export default profileReducer;