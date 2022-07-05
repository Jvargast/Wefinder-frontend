import { SET_LOADING_STATUS, GET_ARTICLES } from "../actions/actionType";

export const initState = {
  articles: [],
  loading: false,
  userFeed: [],
  comments: [],
};

const articleReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_ARTICLES:
      return {
        ...state,
        articles: action.payload,
      };
    case SET_LOADING_STATUS:
      return {
        ...state,
        loading: action.status,
      };
    case "STOP_LOADING":
      return {
        ...state,
        loading: false,
      };
    case "LOADING":
      return {
        ...state,
        loading: true,
      };
    case "FETCH_ONE_SUCCESS":
      return {
        ...state,
        loading: false,
        userFeed: action.payload,
      };
    case "FETCH_COMMENTS_SUCCESS":
      return {
        ...state,
        loading: false,
        comments: action.payload,
      };
    default:
      return state;
  }
};

export default articleReducer;
