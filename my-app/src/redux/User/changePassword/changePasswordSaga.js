import { call, put, select, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  CHANGE_PASSWORD,
  changePasswordSuccess,
  changePasswordFail,
} from "./changePasswordSlice";
import { toast } from "react-toastify";

const URL_API = import.meta.env.VITE_API_URL;
function* changePasswordSaga(action) {
  try {
    const token = yield select((state) => state.account.token);
    const response = yield call(
      axios.post,
      `${URL_API}/users/change-password`,
      action.payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200 || response.status === 201) {
      yield put(changePasswordSuccess(response.data));
      toast.success("Cập nhật mật khẩu thành công");
    } else {
      yield put(changePasswordFail(response.status));
      toast.error("Cập nhật mật khẩu thất bại");
    }
  } catch (error) {
    yield put(changePasswordFail(error.data.message));
    toast.error("Cập nhật mật khẩu thất bại");
  }
}
function* watchChangePassword() {
  yield takeLatest(CHANGE_PASSWORD, changePasswordSaga);
}
export default watchChangePassword;
