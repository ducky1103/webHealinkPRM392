import { call, put, select, takeLatest } from "redux-saga/effects";

import {
  UN__BAN__USER,
  unBanUserFail,
  unBanUserSuccess,
} from "./unBanUserSlice";
import axios from "axios";
import { getAllUserSuccess } from "../getUser/getAllUserSlice";

function* unBanUserSaga(action) {
  const URL_API = import.meta.env.VITE_API_URL;
  try {
    const token = yield select((state) => state.account.token);
    const id = action.payload.userId;
    const response = yield call(
      axios.put,
      `${URL_API}/users/reactivate/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200 || response.status === 201) {
      yield put(unBanUserSuccess(response.data));
    }

    const fetch = yield call(axios.get, `${URL_API}/users?page=1&size=100`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    yield put(getAllUserSuccess(fetch.data));
  } catch (error) {
    let errorMessage = "Unban user failed!";
    if (error.response?.data?.message) {
      errorMessage = error.response.data.message;
    } else if (error.message) {
      errorMessage = error.message;
    }
    yield put(unBanUserFail(errorMessage));
  }
}

function* watchUnBanUserSaga() {
  yield takeLatest(UN__BAN__USER, unBanUserSaga);
}

export default watchUnBanUserSaga;
