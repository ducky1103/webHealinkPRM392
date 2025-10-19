export const GET_ALL_USER = "GET_ALL_USER";
export const GET_ALL_USER_SUCCESS = "GET_ALL_USER_SUCCESS";
export const GET_ALL_USER_FAIL = "GET_ALL_USER_FAIL";

export const getAllUser = (data) => ({
  type: GET_ALL_USER,
  payload: data,
});

export const getAllUserSuccess = (data) => ({
  type: GET_ALL_USER_SUCCESS,
  payload: data,
});

export const getAllUserFail = (error) => ({
  type: GET_ALL_USER_FAIL,
  payload: error,
});

const initialState = {
  getUser: [],
  loading: null,
  error: null,
};

const getAllUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_USER:
      return { ...state, loading: true, error: false };
    case GET_ALL_USER_SUCCESS:
      return { ...state, loading: false, getUser: action.payload };
    case GET_ALL_USER_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
export default getAllUserReducer;
