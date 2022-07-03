import {LOGIN_FAIL, LOGIN_START, LOGIN_SUCCESS, REGISTER_FAIL, REGISTER_START, REGISTER_SUCCESS, SET_USER} from '../actions/actionType';

const INITIAL_STATE = {
    user: null,
    loading:false,
    error:null
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case SET_USER:
            return {
                ...state, 
                user: action.user,
            }
        case REGISTER_START:
        case LOGIN_START:
            return {
                ...state,
                loading:true
            }
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            return {
                ...state,
                loading:false,
                user:action.user
            }
        case REGISTER_FAIL:
        case LOGIN_FAIL:
            return {
                ...state,
                loading:false,
                error:action.payload
            }
        default:
            return state;
    }
};

export default userReducer;