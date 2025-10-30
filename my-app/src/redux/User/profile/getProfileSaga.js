import { call, put, select, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  GET_PROFILE,
  getProfileSuccess,
  getProfileFail,
} from "./getProfileSlice";

const URL_API = import.meta.env.VITE_API_URL;
function* getProfileSaga(action) {
  try {
    const token = yield select((state) => state.account.token);
    const id = action.payload;
    const response = yield call(axios.get, `${URL_API}/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200 || response.status === 201) {
      yield put(getProfileSuccess(response.data));
    } else {
      yield put(getProfileFail(response.status));
    }
  } catch (error) {
    yield put(getProfileFail(error.data.message));
  }
}
function* watchGetProfile() {
  yield takeLatest(GET_PROFILE, getProfileSaga);
}
export default watchGetProfile;
