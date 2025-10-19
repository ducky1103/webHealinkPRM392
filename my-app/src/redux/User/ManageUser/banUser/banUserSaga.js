import { call, put, select, takeLatest } from "redux-saga/effects";

import axios from "axios";
import { BAN__USER, banUserFail, banUserSuccess } from "./banUserSlice";
import { getAllUserSuccess } from "../getUser/getAllUserSlice";

function* banUserSaga(action) {
  const URL_API = import.meta.env.VITE_API_URL;
  try {
    const token = yield select((state) => state.account.token);
    const id = action.payload.userId;

    // Sử dụng DELETE endpoint để ban (xóa) user
    const response = yield call(axios.delete, `${URL_API}/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200 || response.status === 201) {
      yield put(banUserSuccess(response.data));
      // console.log("BAN", response.data);
    }

    const fetch = yield call(axios.get, `${URL_API}/users?page=1&size=100`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    yield put(getAllUserSuccess(fetch.data));
  } catch (error) {
    let errorMessage = "Ban user failed!";
    if (error.response?.data?.message) {
      errorMessage = error.response.data.message;
    } else if (error.message) {
      errorMessage = error.message;
    }
    yield put(banUserFail(errorMessage));
  }
}

function* watchBanUserSaga() {
  yield takeLatest(BAN__USER, banUserSaga);
}

export default watchBanUserSaga;
