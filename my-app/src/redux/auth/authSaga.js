import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  fetchFail,
  fetchSuccess,
  FETCH_API_LOGIN,
  LOG_OUT_REQUEST,
  logoutSuccess,
  VERIFY_OTP,
  verifyOTPSuccess,
  verifyOTPFail,
  RESEND_OTP,
  resendOTPSuccess,
  resendOTPFail,
} from "./authSlice";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

const rawApiUrl = import.meta.env.VITE_API_URL;
const API_BASE = (
  typeof rawApiUrl === "string" && rawApiUrl.trim() !== ""
    ? rawApiUrl
    : "http://localhost:8080/api"
).replace(/\/+$/, "");

export function* fetchLogin(action) {
  try {
    // Fix: Backend expect passwordHash thay vì password
    const loginPayload = {
      username: action.payload.username,
      passwordHash: parseInt(action.payload.password), // Convert to number
    };

    const response = yield call(
      axios.post,
      `${API_BASE}/auth/login`,
      loginPayload // Gửi payload đã convert
    );

    const token = response.data?.token;

    if (token) {
      // Decode user info from token để lấy user ID
      const decodedUser = jwtDecode(token);

      // Lấy userId từ token (thường là 'sub' hoặc 'id')
      const userId = decodedUser.sub || decodedUser.id;

      if (userId) {
        const userResponse = yield call(
          axios.get,
          `${API_BASE}/users/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("👤 User Details:", userResponse.data);

        const fullUserData = userResponse.data;

        yield put(
          fetchSuccess({
            user: fullUserData, // User data với role từ API
            token: token,
          })
        );

        // Kiểm tra role để redirect
        const userRole = fullUserData.role;
        console.log("🎭 User Role:", userRole);

        toast.success("Đăng nhập thành công!");
      } else {
        throw new Error("Cannot get user ID from token");
      }
    } else {
      throw new Error("No token received");
    }
  } catch (error) {
    let errorMessage = "Đăng nhập thất bại!";

    // Check specific error messages
    if (error.response?.status === 401) {
      errorMessage = "Tài khoản hoặc mật khẩu không đúng!";
    } else if (error.response?.status === 500) {
      errorMessage = "Lỗi server, vui lòng thử lại sau!";
    } else if (error.response?.data?.message) {
      errorMessage = error.response.data.message;
    }

    yield put(fetchFail(errorMessage));
    toast.error(errorMessage);
  }
}

function* fetchLogout() {
  yield put(logoutSuccess());
  toast.success("Đăng xuất thành công");
}

export function* fetchVerifyOTP(action) {
  try {
    const response = yield call(
      axios.post,
      `${API_BASE}/cms/auth/verify-otp`,
      action.payload
    );

    yield put(verifyOTPSuccess(response.data));
    if (action.payload.onSuccess) action.payload.onSuccess(response);
  } catch (error) {
    yield put(
      verifyOTPFail(error.response?.data?.message || "OTP verification failed")
    );
    if (action.payload.onError) action.payload.onError(error);
  }
}

export function* fetchResendOTP(action) {
  try {
    const response = yield call(
      axios.post,
      `${API_BASE}/cms/auth/resend-otp`,
      action.payload
    );

    yield put(resendOTPSuccess(response.data));
    if (action.payload.onSuccess) action.payload.onSuccess(response);
  } catch (error) {
    yield put(
      resendOTPFail(error.response?.data?.message || "Resend OTP failed")
    );
    if (action.payload.onError) action.payload.onError(error);
  }
}

export function* watchFetchLogin() {
  yield takeLatest(FETCH_API_LOGIN, fetchLogin);
}

export function* watchFetchLogout() {
  yield takeLatest(LOG_OUT_REQUEST, fetchLogout);
}

export function* watchVerifyOTP() {
  yield takeLatest(VERIFY_OTP, fetchVerifyOTP);
}

export function* watchResendOTP() {
  yield takeLatest(RESEND_OTP, fetchResendOTP);
}

export default watchFetchLogin;
