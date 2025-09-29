export const FETCH_API_LOGIN = "FETCH_API_LOGIN";
export const FETCH_API_SUCCESS = "FETCH_API_SUCCESS";
export const FETCH_API_FAIL = "FETCH_API_FAIL";
export const LOG_OUT = "LOG_OUT";
export const LOG_OUT_REQUEST = "LOG_OUT_REQUEST";
export const LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS";
export const LOG_OUT_FAIL = "LOG_OUT_FAIL";
export const FETCH_API_REGISTER = "FETCH_API_REGISTER";
export const FETCH_API_REGISTER_SUCCESS = "FETCH_API_REGISTER_SUCCESS";
export const FETCH_API_REGISTER_FAIL = "FETCH_API_REGISTER_FAIL";
export const VERIFY_OTP = "VERIFY_OTP";
export const VERIFY_OTP_SUCCESS = "VERIFY_OTP_SUCCESS";
export const VERIFY_OTP_FAIL = "VERIFY_OTP_FAIL";
export const RESEND_OTP = "RESEND_OTP";
export const RESEND_OTP_SUCCESS = "RESEND_OTP_SUCCESS";
export const RESEND_OTP_FAIL = "RESEND_OTP_FAIL";
import { resolveUserRole } from "../../utils/role";

export const fetchLogin = (data) => ({
  type: FETCH_API_LOGIN,
  payload: data,
});

export const fetchSuccess = (data) => ({
  type: FETCH_API_SUCCESS,
  payload: data,
});

export const fetchFail = (error) => ({
  type: FETCH_API_FAIL,
  payload: error,
});

export const logout = () => ({
  type: LOG_OUT,
});

export const logoutRequest = () => ({
  type: LOG_OUT_REQUEST,
});

export const logoutSuccess = () => ({
  type: LOG_OUT_SUCCESS,
});

export const logoutFail = (error) => ({
  type: LOG_OUT_FAIL,
  payload: error,
});

export const fetchRegister = (data) => ({
  type: FETCH_API_REGISTER,
  payload: data,
});

export const fetchRegisterSuccess = (data) => ({
  type: FETCH_API_REGISTER_SUCCESS,
  payload: data,
});

export const fetchRegisterFail = (error) => ({
  type: FETCH_API_REGISTER_FAIL,
  payload: error,
});

export const verifyOTP = (data) => ({
  type: VERIFY_OTP,
  payload: data,
});

export const verifyOTPSuccess = (data) => ({
  type: VERIFY_OTP_SUCCESS,
  payload: data,
});

export const verifyOTPFail = (error) => ({
  type: VERIFY_OTP_FAIL,
  payload: error,
});

export const resendOTP = (data) => ({
  type: RESEND_OTP,
  payload: data,
});

export const resendOTPSuccess = (data) => ({
  type: RESEND_OTP_SUCCESS,
  payload: data,
});

export const resendOTPFail = (error) => ({
  type: RESEND_OTP_FAIL,
  payload: error,
});

const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

const accountReducers = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_API_LOGIN:
      return { ...state, loading: true, error: null };
    case FETCH_API_SUCCESS: {
      const role = resolveUserRole(action.payload.user);
      try {
        localStorage.setItem("__hl_role__", JSON.stringify(role));
      } catch {
        // ignore
      }
      return {
        ...state,
        loading: false,
        user: action.payload.user,
        token: action.payload.token,
      };
    }
    case FETCH_API_FAIL:
      return { ...state, loading: false, error: action.payload };
    case LOG_OUT_REQUEST:
      return { ...state, loading: true, error: null };
    case LOG_OUT_SUCCESS: {
      try {
        localStorage.removeItem("__hl_role__");
      } catch {
        // ignore
      }
      return { ...initialState };
    }
    case LOG_OUT_FAIL:
      return { ...state, loading: false, error: action.payload };
    case LOG_OUT:
      return { ...initialState };
    case FETCH_API_REGISTER:
      return { ...state, loading: true, error: null };
    case FETCH_API_REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        // Có thể tự động login sau khi đăng ký thành công
      };
    case FETCH_API_REGISTER_FAIL:
      return { ...state, loading: false, error: action.payload };
    case VERIFY_OTP:
    case RESEND_OTP:
      return { ...state, loading: true, error: null };
    case VERIFY_OTP_SUCCESS:
    case RESEND_OTP_SUCCESS:
      return { ...state, loading: false };
    case VERIFY_OTP_FAIL:
    case RESEND_OTP_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default accountReducers;
