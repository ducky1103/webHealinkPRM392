import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import toast from "react-hot-toast";
import {
  REGISTER_REQUEST,
  registerSuccess,
  registerFail,
} from "./registerSlice";

const URL_API = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

function* registerSaga(action) {
  try {
    const body = action.payload;

    // Prepare request payload theo backend yêu cầu
    const registerPayload = {
      email: body.email,
      username: body.username,
      phoneNumber: body.phoneNumber,
      fullName: body.fullName,
      passwordHash: body.password, // Backend expects passwordHash field
    };

    const response = yield call(
      axios.post,
      `${URL_API}/auth/register`,
      registerPayload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200 || response.status === 201) {
      yield put(registerSuccess(response.data));
      toast.success("Đăng ký thành công!");

      // Call success callback if provided
      if (body.onSuccess) {
        body.onSuccess(response.data);
      }
    } else {
      yield put(registerFail("Đăng ký thất bại"));
      toast.error("Đăng ký thất bại");
    }
  } catch (error) {
    let errorMessage = "Đăng ký thất bại!";

    if (error.response?.data) {
      if (typeof error.response.data === "string") {
        // Parse backend error message
        const errorData = error.response.data;

        if (errorData.includes("passwordHash")) {
          errorMessage = "Mật khẩu không được để trống!";
        } else if (errorData.includes("phoneNumber")) {
          errorMessage = "Số điện thoại không hợp lệ!";
        } else if (errorData.includes("email")) {
          errorMessage = "Email đã được sử dụng hoặc không hợp lệ!";
        } else if (errorData.includes("username")) {
          errorMessage = "Tên đăng nhập đã tồn tại!";
        } else {
          errorMessage = errorData;
        }
      } else if (error.response.data.message) {
        errorMessage = error.response.data.message;
      }
    } else if (error.message) {
      errorMessage = error.message;
    }

    yield put(registerFail(errorMessage));
    toast.error(errorMessage);

    if (action.payload.onError) {
      action.payload.onError(error);
    }
  }
}

function* watchRegister() {
  yield takeLatest(REGISTER_REQUEST, registerSaga);
}

export default watchRegister;
