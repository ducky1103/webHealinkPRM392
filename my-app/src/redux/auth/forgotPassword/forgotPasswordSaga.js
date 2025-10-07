/* eslint-disable no-unused-vars */
/* eslint-disable require-yield */
import { call, put, takeLatest } from "redux-saga/effects";
import { message } from "antd";
import {
  CHECK_EMAIL_EXISTS_REQUEST,
  FORGOT_PASSWORD_REQUEST,
  RESET_PASSWORD_REQUEST,
  VERIFY_RESET_TOKEN_REQUEST,
  checkEmailExistsSuccess,
  checkEmailExistsFail,
  forgotPasswordSuccess,
  forgotPasswordFail,
  resetPasswordSuccess,
  resetPasswordFail,
  verifyResetTokenSuccess,
  verifyResetTokenFail,
} from "./forgotPasswordSlice";

const rawApiUrl = import.meta.env.VITE_API_URL;
const API_BASE = (
  typeof rawApiUrl === "string" && rawApiUrl.trim() !== ""
    ? rawApiUrl
    : "http://localhost:8080/api"
).replace(/\/+$/, "");

// Check email exists và gửi OTP luôn - API này làm cả 2 việc
function* checkEmailExistsSaga(action) {
  try {
    console.log(
      "🔄 Checking email exists and sending OTP:",
      action.payload.email
    );

    const response = yield call(fetch, `${API_BASE}/auth/email-existed`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: action.payload.email,
      }),
    });

    console.log("📡 Email check response status:", response.status);

    if (response.ok) {
      const data = yield call([response, "json"]);
      console.log("✅ Email exists and OTP sent:", data);

      if (data.statusCode === 200) {
        yield put(checkEmailExistsSuccess(data));

        // API này đã gửi OTP luôn, nên hiện message thành công
        message.success(data.message || "OTP đã được gửi đến email của bạn!");

        if (action.payload.onSuccess) {
          action.payload.onSuccess();
        }
      } else {
        yield put(checkEmailExistsFail("Email không tồn tại trong hệ thống!"));
        message.error("Email không tồn tại trong hệ thống!");
      }
    } else {
      yield put(checkEmailExistsFail("Email không tồn tại trong hệ thống!"));
      message.error("Email không tồn tại trong hệ thống!");
    }
  } catch (error) {
    console.error("❌ Email check network error:", error);
    yield put(checkEmailExistsFail("Không thể kiểm tra email."));
    message.error("Không thể kiểm tra email.");

    if (action.payload.onError) {
      action.payload.onError(error);
    }
  }
}

// Send OTP - không cần dùng nữa vì email-existed đã làm rồi
function* forgotPasswordSaga(action) {
  try {
    console.log(
      "🔄 This function is deprecated - OTP already sent by email-existed API"
    );

    // Chỉ gọi callback success vì OTP đã được gửi
    if (action.payload.onSuccess) {
      action.payload.onSuccess();
    }
  } catch (error) {
    console.error("❌ Send OTP network error:", error);

    if (action.payload.onError) {
      action.payload.onError(error);
    }
  }
}

// Reset password - gửi otpCode + email + newPassword
function* resetPasswordSaga(action) {
  try {
    console.log("🔄 Resetting password with:", {
      otpCode: action.payload.otpCode,
      email: action.payload.email,
      newPassword: "***hidden***",
    });

    const response = yield call(fetch, `${API_BASE}/auth/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        otpCode: action.payload.otpCode,
        email: action.payload.email,
        newPassword: action.payload.newPassword,
      }),
    });

    console.log("📡 Reset password response status:", response.status);

    if (response.ok) {
      const data = yield call([response, "json"]);
      console.log("✅ Password reset successful:", data);

      yield put(
        resetPasswordSuccess({
          message: data.message || "Đổi mật khẩu thành công!",
        })
      );

      message.success(data.message || "Đổi mật khẩu thành công!");

      if (action.payload.onSuccess) {
        action.payload.onSuccess();
      }
    } else {
      const errorData = yield call([response, "text"]);
      console.error("❌ Reset password error:", response.status, errorData);

      let errorMessage = "Có lỗi xảy ra khi đặt lại mật khẩu!";

      if (response.status === 400) {
        errorMessage = "Mã OTP không đúng hoặc đã hết hạn!";
      }

      yield put(resetPasswordFail(errorMessage));
      message.error(errorMessage);

      if (action.payload.onError) {
        action.payload.onError(new Error(errorMessage));
      }
    }
  } catch (error) {
    console.error("❌ Reset password network error:", error);
    yield put(resetPasswordFail("Không thể kết nối đến server."));
    message.error("Không thể kết nối đến server.");

    if (action.payload.onError) {
      action.payload.onError(error);
    }
  }
}

// Verify reset token (có thể bỏ qua nếu không dùng)
function* verifyResetTokenSaga(action) {
  try {
    console.log("🔄 Verifying reset token:", action.payload.token);
    // Implementation nếu cần
  } catch (error) {
    console.error("❌ Verify reset token error:", error);
  }
}

// Watchers
function* watchCheckEmailExists() {
  yield takeLatest(CHECK_EMAIL_EXISTS_REQUEST, checkEmailExistsSaga);
}

function* watchForgotPassword() {
  yield takeLatest(FORGOT_PASSWORD_REQUEST, forgotPasswordSaga);
}

function* watchVerifyResetToken() {
  yield takeLatest(VERIFY_RESET_TOKEN_REQUEST, verifyResetTokenSaga);
}

function* watchResetPassword() {
  yield takeLatest(RESET_PASSWORD_REQUEST, resetPasswordSaga);
}

export {
  watchCheckEmailExists,
  watchForgotPassword,
  watchVerifyResetToken,
  watchResetPassword,
};
export default watchForgotPassword;
