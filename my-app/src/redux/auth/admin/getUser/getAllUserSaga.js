import { call, put, select, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  GET_ALL_USER,
  getAllUserSuccess,
  getAllUserFail,
} from "./getAllUserSlice";

const URL_API = import.meta.env.VITE_API_URL;

function* getAllUserSaga(action) {
  try {
    const token = yield select((state) => state.account.token);
    const { page, size } = action.payload;

    const response = yield call(axios.get, `${URL_API}/users`, {
      params: { page, size },
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    yield put(getAllUserSuccess(response.data));
  } catch (error) {
    yield put(
      getAllUserFail(
        error?.response?.data?.message || "Lỗi tải danh sách người dùng"
      )
    );
  }
}

function* watchGetAllUserAdmin() {
  yield takeLatest(GET_ALL_USER, getAllUserSaga);
}

export default watchGetAllUserAdmin;
