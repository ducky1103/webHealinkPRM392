export const FORGOT_PASSWORD_REQUEST = "FORGOT_PASSWORD_REQUEST";
export const FORGOT_PASSWORD_SUCCESS = "FORGOT_PASSWORD_SUCCESS";
export const FORGOT_PASSWORD_FAIL = "FORGOT_PASSWORD_FAIL";

export const RESET_PASSWORD_REQUEST = "RESET_PASSWORD_REQUEST";
export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_FAIL = "RESET_PASSWORD_FAIL";

export const VERIFY_RESET_TOKEN_REQUEST = "VERIFY_RESET_TOKEN_REQUEST";
export const VERIFY_RESET_TOKEN_SUCCESS = "VERIFY_RESET_TOKEN_SUCCESS";
export const VERIFY_RESET_TOKEN_FAIL = "VERIFY_RESET_TOKEN_FAIL";

// Action creators
export const forgotPasswordRequest = (data) => ({
  type: FORGOT_PASSWORD_REQUEST,
  payload: data,
});

export const forgotPasswordSuccess = (data) => ({
  type: FORGOT_PASSWORD_SUCCESS,
  payload: data,
});

export const forgotPasswordFail = (error) => ({
  type: FORGOT_PASSWORD_FAIL,
  payload: error,
});

export const resetPasswordRequest = (data) => ({
  type: RESET_PASSWORD_REQUEST,
  payload: data,
});

export const resetPasswordSuccess = (data) => ({
  type: RESET_PASSWORD_SUCCESS,
  payload: data,
});

export const resetPasswordFail = (error) => ({
  type: RESET_PASSWORD_FAIL,
  payload: error,
});

export const verifyResetTokenRequest = (data) => ({
  type: VERIFY_RESET_TOKEN_REQUEST,
  payload: data,
});

export const verifyResetTokenSuccess = (data) => ({
  type: VERIFY_RESET_TOKEN_SUCCESS,
  payload: data,
});

export const verifyResetTokenFail = (error) => ({
  type: VERIFY_RESET_TOKEN_FAIL,
  payload: error,
});

const initialState = {
  loading: false,
  error: null,
  message: null,
  emailSent: false,
  tokenValid: false,
  resetSuccess: false,
};

const forgotPasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case FORGOT_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        emailSent: false,
      };
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        emailSent: true,
        message: action.payload.message,
        error: null,
      };
    case FORGOT_PASSWORD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        emailSent: false,
      };

    case VERIFY_RESET_TOKEN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        tokenValid: false,
      };
    case VERIFY_RESET_TOKEN_SUCCESS:
      return {
        ...state,
        loading: false,
        tokenValid: true,
        error: null,
      };
    case VERIFY_RESET_TOKEN_FAIL:
      return {
        ...state,
        loading: false,
        tokenValid: false,
        error: action.payload,
      };

    case RESET_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        resetSuccess: false,
      };
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        resetSuccess: true,
        message: action.payload.message,
        error: null,
      };
    case RESET_PASSWORD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        resetSuccess: false,
      };

    default:
      return state;
  }
};

export default forgotPasswordReducer;
