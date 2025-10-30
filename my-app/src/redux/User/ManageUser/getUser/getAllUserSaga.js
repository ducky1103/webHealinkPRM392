import { call, put, select, takeLatest } from "redux-saga/effects";

import axios from "axios";
import {
  GET__ALL__USER,
  getAllUserFail,
  getAllUserSuccess,
} from "./getAllUserSlice";

function* getAllUserSaga() {
  const URL_API = import.meta.env.VITE_API_URL;
  try {
    const token = yield select((state) => state.account.token);
    const response = yield call(axios.get, `${URL_API}/users?page=1&size=100`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200 || response.status === 201) {
      yield put(getAllUserSuccess(response.data));
    }
  } catch (error) {
    let errorMessage = "Fetch categories failed!";
    if (error.response?.data?.message) {
      errorMessage = error.response.data.message;
    }
    console.error("Category fetch error:", error);
    yield put(getAllUserFail(errorMessage));
  }
}

function* watchGetAllUserSaga() {
  yield takeLatest(GET__ALL__USER, getAllUserSaga);
}

export default watchGetAllUserSaga;
