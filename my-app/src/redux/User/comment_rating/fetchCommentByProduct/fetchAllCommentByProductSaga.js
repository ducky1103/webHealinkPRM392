import { call, put, select, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  FETCH_ALL_COMMENT_BY_PRODUCT,
  fetchAllCommentByProductSuccess,
  fetchAllCommentByProductFailure,
} from "./fetchAllCommentByProductSlice";

const URL_API = import.meta.env.VITE_API_URL;
function* fetchAllCommentByProductSaga(action) {
  try {
    const token = yield select((state) => state.account.token);
    const response = yield call(
      axios.get,
      `${URL_API}/review/product/${action.payload}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200 || response.status === 201) {
      // API trả về { data: [...], message: "..." }, cần lấy response.data.data
      yield put(fetchAllCommentByProductSuccess(response.data.data));
    } else {
      yield put(fetchAllCommentByProductFailure("Failed to fetch comments"));
    }
  } catch (error) {
    yield put(fetchAllCommentByProductFailure(error));
  }
}
export default function* watchFetchAllCommentByProductSaga() {
  yield takeLatest(FETCH_ALL_COMMENT_BY_PRODUCT, fetchAllCommentByProductSaga);
}
