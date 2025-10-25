import { call, put, select, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  FETCH_ALL_COMMENT_BY_USER_REQUEST,
  fetchAllCommentByUserSuccess,
  fetchAllCommentByUserFailure,
} from "./fetchAllCommentByUserSlice";

const URL_API = import.meta.env.VITE_API_URL;
function* fetchAllCommentByUserSaga(action) {
  try {
    const token = yield select((state) => state.account.token);
    const response = yield call(
      axios.get,
      `${URL_API}/review/user/${action.payload}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200 || response.status === 201) {
      yield put(fetchAllCommentByUserSuccess(response.data));
    } else {
      yield put(fetchAllCommentByUserFailure("Failed to fetch comments"));
    }
  } catch (error) {
    yield put(fetchAllCommentByUserFailure(error.message));
  }
}
function* watchFetchAllCommentByUserSaga() {
  yield takeLatest(
    FETCH_ALL_COMMENT_BY_USER_REQUEST,
    fetchAllCommentByUserSaga
  );
}
export default watchFetchAllCommentByUserSaga;
