// Action types
export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAIL = "REGISTER_FAIL";
export const RESET_REGISTER_STATE = "RESET_REGISTER_STATE"; // Add this

// Action creators
export const registerRequest = (payload) => ({
  type: REGISTER_REQUEST,
  payload,
});

export const registerSuccess = (payload) => ({
  type: REGISTER_SUCCESS,
  payload,
});

export const registerFail = (payload) => ({
  type: REGISTER_FAIL,
  payload,
});

export const resetRegisterState = () => ({
  type: RESET_REGISTER_STATE,
});

// Initial state
const initialState = {
  loading: false,
  success: false,
  error: null,
  data: null,
};

const registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        success: false,
        data: null,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        error: null,
        data: action.payload,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
        data: null,
      };
    case RESET_REGISTER_STATE:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default registerReducer;
