import { call, put, takeLatest } from "redux-saga/effects";
import {
  FORGOT_PASSWORD_REQUEST,
  RESET_PASSWORD_REQUEST,
  VERIFY_RESET_TOKEN_REQUEST,
  forgotPasswordSuccess,
  forgotPasswordFail,
  resetPasswordSuccess,
  resetPasswordFail,
  verifyResetTokenSuccess,
  verifyResetTokenFail,
} from "./forgotPasswordSlice";
import { toast } from "react-hot-toast";

const rawApiUrl = import.meta.env.VITE_API_URL;
const API_BASE = (
  typeof rawApiUrl === "string" && rawApiUrl.trim() !== ""
    ? rawApiUrl
    : "http://localhost:8080/api"
).replace(/\/+$/, "");

// Send forgot password email - Sử dụng fetch thay vì axios
function* forgotPasswordSaga(action) {
  try {
    console.log(
      "🔄 Sending forgot password request for:",
      action.payload.email
    );
    console.log("🔍 API URL:", `${API_BASE}/auth/email-existed`);

    // Sử dụng fetch để tránh axios interceptor
    const response = yield call(fetch, `${API_BASE}/auth/email-existed`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Không có Authorization header
      },
      body: JSON.stringify({
        email: action.payload.email,
      }),
    });

    console.log("📡 Response status:", response.status);

    if (response.ok) {
      const data = yield call([response, "json"]);
      console.log("✅ Response data:", data);

      yield put(
        forgotPasswordSuccess({
          message: data.message || "Email khôi phục mật khẩu đã được gửi!",
        })
      );

      toast.success(data.message || "Email khôi phục mật khẩu đã được gửi!");

      if (action.payload.onSuccess) {
        action.payload.onSuccess();
      }
    } else {
      // Handle HTTP error status
      const errorData = yield call([response, "text"]);
      console.error("❌ HTTP Error:", response.status, errorData);

      let errorMessage = "Có lỗi xảy ra khi gửi email khôi phục!";

      if (response.status === 404) {
        errorMessage = "Email không tồn tại trong hệ thống!";
      } else if (response.status === 400) {
        errorMessage = "Email không hợp lệ!";
      } else if (response.status === 500) {
        if (errorData.includes("Empty token")) {
          errorMessage = "Lỗi server: API đang expect token không cần thiết.";
        } else {
          errorMessage = errorData || "Lỗi server. Vui lòng thử lại sau.";
        }
      }

      yield put(forgotPasswordFail(errorMessage));
      toast.error(errorMessage);
    }
  } catch (error) {
    console.error("❌ Network error:", error);
    yield put(forgotPasswordFail("Không thể kết nối đến server."));
    toast.error("Không thể kết nối đến server.");

    if (action.payload.onError) {
      action.payload.onError(error);
    }
  }
}

// Verify reset token
function* verifyResetTokenSaga(action) {
  try {
    console.log("🔄 Verifying reset token:", action.payload.token);

    const response = yield call(fetch, `${API_BASE}/auth/verify-reset-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: action.payload.token,
      }),
    });

    if (response.ok) {
      const data = yield call([response, "json"]);
      yield put(verifyResetTokenSuccess(data));

      if (action.payload.onSuccess) {
        action.payload.onSuccess();
      }
    } else {
      const errorData = yield call([response, "text"]);
      let errorMessage = "Token không hợp lệ hoặc đã hết hạn!";

      if (errorData) {
        errorMessage = errorData;
      }

      yield put(verifyResetTokenFail(errorMessage));
      toast.error(errorMessage);

      if (action.payload.onError) {
        action.payload.onError(new Error(errorMessage));
      }
    }
  } catch (error) {
    console.error("❌ Verify reset token error:", error);
    yield put(verifyResetTokenFail("Không thể kết nối đến server."));
    toast.error("Không thể kết nối đến server.");

    if (action.payload.onError) {
      action.payload.onError(error);
    }
  }
}

// Reset password
function* resetPasswordSaga(action) {
  try {
    console.log("🔄 Resetting password with token:", action.payload.token);

    const response = yield call(fetch, `${API_BASE}/auth/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: action.payload.token,
        newPassword: action.payload.newPassword,
      }),
    });

    if (response.ok) {
      const data = yield call([response, "json"]);

      yield put(
        resetPasswordSuccess({
          message: data.message || "Mật khẩu đã được cập nhật thành công!",
        })
      );

      toast.success(data.message || "Mật khẩu đã được cập nhật thành công!");

      if (action.payload.onSuccess) {
        action.payload.onSuccess();
      }
    } else {
      const errorData = yield call([response, "text"]);
      let errorMessage = "Có lỗi xảy ra khi đặt lại mật khẩu!";

      if (response.status === 400) {
        errorMessage = "Token không hợp lệ hoặc đã hết hạn!";
      } else if (response.status === 500) {
        errorMessage = errorData || "Lỗi server. Vui lòng thử lại.";
      } else if (errorData) {
        errorMessage = errorData;
      }

      yield put(resetPasswordFail(errorMessage));
      toast.error(errorMessage);

      if (action.payload.onError) {
        action.payload.onError(new Error(errorMessage));
      }
    }
  } catch (error) {
    console.error("❌ Reset password error:", error);
    yield put(resetPasswordFail("Không thể kết nối đến server."));
    toast.error("Không thể kết nối đến server.");

    if (action.payload.onError) {
      action.payload.onError(error);
    }
  }
}

// Watchers
function* watchForgotPassword() {
  yield takeLatest(FORGOT_PASSWORD_REQUEST, forgotPasswordSaga);
}

function* watchVerifyResetToken() {
  yield takeLatest(VERIFY_RESET_TOKEN_REQUEST, verifyResetTokenSaga);
}

function* watchResetPassword() {
  yield takeLatest(RESET_PASSWORD_REQUEST, resetPasswordSaga);
}

export { watchForgotPassword, watchVerifyResetToken, watchResetPassword };
export default watchForgotPassword;
